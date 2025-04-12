/**
 * @file Controller for managing reports
 */
const Report = require("../models/Report");
const { query, param, validationResult } = require("express-validator");
const BlockchainService = require("../blockchain/blockchainService");
const xss = require('xss-clean');
const ActivityLog = require("../models/ActivityLog");
const mongoose = require('mongoose'); 
const { getAsync, setAsync, client } = require('../server');
const sanitize = xss();

/**
 * @description Retrieve reports based on query parameters, with validation and caching.
 * @returns {Promise<void>}
 */
const getReports = [
    query("startDate").optional().isDate().withMessage("startDate must be a valid date"),
    query("endDate").optional().isDate().withMessage("endDate must be a valid date"),
    query("userId").optional().isMongoId().withMessage("userId must be a valid MongoDB ID"),
    query("page").optional().isInt({ min: 1 }).withMessage("page must be a positive integer"),
    query("limit").optional().isInt({ min: 1 }).withMessage("limit must be a positive integer"),


    query("type")
        .optional()
        .isIn(["Carbon Emission", "Water Usage", "Biodiversity"])
        .withMessage("type must be one of: Carbon Emission, Water Usage, Biodiversity"),
    query("status").optional().isIn(["Pending", "Approved", "Rejected"]).withMessage("status must be one of: Pending, Approved, Rejected"),
    async (req, res) => {
        // Sanitize query parameters
        req.query = sanitize(req.query);
        try {
            // Validate query parameters
            const errors = validationResult(req);

            // Check if there are validation errors
            
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
    
            const cachedReports = await getAsync('reports');
            if (cachedReports) {
                return res.json(JSON.parse(cachedReports));
                // Cache hit
            }
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { startDate, endDate, type, status, userId } = req.query;
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

        //Add userId filter if provided
        if (userId) {
            query.$or = [{ farmerId: new mongoose.Types.ObjectId(userId) }, { industryId: new mongoose.Types.ObjectId(userId) }];
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

        // Cache the reports
        await setAsync('reports', JSON.stringify({reports, currentPage: page, totalPages, totalReports}));

    } catch (error) {
        console.error("Error fetching reports:", error.message);
        // Log the error
        res.status(500).json({ message: "Server error" });
        // Send a server error response
    }
}
];
/**
 * @description Download a specific report by reportId, with validation and user authorization checks.
 */

const downloadReport = [
    param("reportId").isMongoId().withMessage("reportId must be a valid MongoDB ID"),
    async (req, res) => {
        req.params = sanitize(req.params);
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

/**
 * @description Add a new report, with database and blockchain updates.
 */
const addReport = [async (req, res, next) => {
        try{
                await client.del('reports');
                next()
        } catch (error) {
                console.error("Error deleting cache:", error.message);
                res.status(500).json({ message: "Server error" });
        }
}, async(req, res) => {
    try {
        const { type, data, farmerId, industryId } = req.body;
        req.body = sanitize(req.body);
        const reportData = {
            // Report data
            type,
            data,
            farmerId,
            industryId
        };

        // Create report in the blockchain
        // Create a new instance of the BlockchainService
        const blockchainService = new BlockchainService();
        // Create report in the blockchain
        const blockchainReport = await blockchainService.createReport(reportData);

        // Add report to database
        const newReport = new Report({
            // Assign blockchain report ID
           ...reportData, blockchainReportId: blockchainReport.reportId
        });
        // Save report to database
        await newReport.save();
        // Add activity log
         await ActivityLog.create({
            // Log report creation activity
            userId: req.user._id,
            // User ID from request

            action: "report added",
            details: `Report added by user ${req.user._id}`,
        });
        res.status(201).json({ message: "report added", report : newReport});
    } catch (error) {
        console.error("Error creating activity log:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}];

/**
 * @description Update an existing report, with database and blockchain updates.
 */
const updateReport = [param("reportId").isMongoId().withMessage("reportId must be a valid MongoDB ID"),async (req, res, next) => {
    try {
        await client.del('reports');
        next()
    } catch (error) {
        console.error("Error deleting cache:", error.message);
        res.status(500).json({ message: "Server error" });
    }
}, async (req, res) => {
    try {
        const reportId = req.params.reportId;

        const { type, data, status } = req.body;
        req.body = sanitize(req.body);
        const updatedData = { type, data, status };


        // Update report in the blockchain
        // Create a new instance of the BlockchainService
        const blockchainService = new BlockchainService();
        // Update report in the blockchain
        const blockchainReport = await blockchainService.updateReport({reportId:reportId,updatedData: updatedData});
        
        // Update report in database
        const report = await Report.findByIdAndUpdate(reportId, updatedData, { new: true });

        if (!report) {
            return res.status(404).json({ message: "Report not found" });
            // Report not found
        }
        await ActivityLog.create({
            // Log report update activity
            userId: req.user._id,
            action: "report updated",
            details: `report updated by user ${req.user._id}`,
        });
        res.status(200).json({ message: "Report updated", report });
        // Successful update
    } catch (error) {
        console.error("Error updating report:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}, async (req, res) => {
    await ActivityLog.create({
        userId: req.user._id,
        // Log report update activity
        action: "report updated",
        details: `report updated by user ${req.user._id}`,
    });
}];



module.exports = {
    getReports,
    downloadReport,
    addReport,
    updateReport
};
