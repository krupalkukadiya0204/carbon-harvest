const Report = require("../models/Report");
const { query, param, validationResult } = require("express-validator");

const getReports = [
    query("startDate").optional().isDate().withMessage("startDate must be a valid date"),
    query("endDate").optional().isDate().withMessage("endDate must be a valid date"),
    query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
    query("limit").optional().isInt({ min: 1 }).withMessage("limit must be a positive integer"),


    query("type")
        .optional()
        .isIn(["Carbon Emission", "Water Usage", "Biodiversity"])
        .withMessage("type must be one of: Carbon Emission, Water Usage, Biodiversity"),
    query("status").optional().isIn(["Pending", "Approved", "Rejected"]).withMessage("status must be one of: Pending, Approved, Rejected"),
    async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { startDate, endDate, type, status } = req.query;
         const query = {};

        // Add date range filter if provided
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt.$gte = new Date(startDate);
            }
            if (endDate) {
                query.createdAt.$lte = new Date(endDate);
            }
        }

        // Add type filter if provided
        if (type) {
            query.type = type;
        }

        // Add status filter if provided
        if (status) {
            query.status = status;
        }

        // Add user role-based filtering
        switch (req.user.role) {
            case "farmer":
                query.farmerId = req.user._id;
                break;
            case "industry":
                query.industryId = req.user._id;
                break;
            case "regulator":
                // Regulators can see all reports
                break;
            default:
                return res.status(403).json({ message: "Unauthorized access" });
        }

        const totalReports = await Report.countDocuments(query);

        const reports = await Report.find(query).skip(skip).limit(limit)
            .sort({ createdAt: -1 })
            .populate("farmerId", "name")
            .populate("industryId", "name");

        const totalPages = Math.ceil(totalReports / limit);

        res.json({
            reports,
            currentPage: page,
            totalPages,
            totalReports
        });

    } catch (error) {
        console.error("Error fetching reports:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}];

const downloadReport = [
    param("reportId").isMongoId().withMessage("reportId must be a valid MongoDB ID"),
    async (req, res) => {
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    try {
        const { reportId } = req.params;

        const report = await Report.findById(reportId)
            .populate("farmerId", "name")
            .populate("industryId", "name");

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
        }

        // Check user authorization
        switch (req.user.role) {
            case "farmer":
                if (report.farmerId._id.toString() !== req.user._id.toString()) {
                    return res.status(403).json({ message: "Unauthorized access" });
                }
                break;
            case "industry":
                if (report.industryId._id.toString() !== req.user._id.toString()) {
                    return res.status(403).json({ message: "Unauthorized access" });
                }
                break;
            case "regulator":
                // Regulators can download any report
                break;
            default:
                return res.status(403).json({ message: "Unauthorized access" });
        }

        // Generate report content
        const reportContent = {
            id: report._id,
            type: report.type,
            status: report.status,
            createdAt: report.createdAt,
            farmer: report.farmerId.name,
            industry: report.industryId.name,
            data: report.data
        };

        // Send report as JSON
        res.json({ report: reportContent });
    } catch (error) {
        console.error("Error downloading report:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}];

module.exports = {
    getReports,
    downloadReport
};
