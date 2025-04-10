const Report = require("../models/Report");

// Controller functions
const getReports = async (req, res) => {
    try {
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

        const reports = await Report.find(query)
            .sort({ createdAt: -1 })
            .populate("farmerId", "name")
            .populate("industryId", "name");

        res.json({ reports });
    } catch (error) {
        console.error("Error fetching reports:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const downloadReport = async (req, res) => {
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
        console.error("Error downloading report:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getReports,
    downloadReport
};
