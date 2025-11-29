const express = require("express");
const authMiddleware = require("../middleware/auth");
const Project = require("../models/Project");
const Visit = require("../models/Visit");
const { generateApiKey, validateUrl } = require("../utils/helpers");

const router = express.Router();

router.get("/mywebsites", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.userId }).lean();

    const projectsWithStats = await Promise.all(
      projects.map(async (project) => {
        const totalVisits = await Visit.countDocuments({
          project: project._id,
        });

        return {
          ...project,
          stats: {
            totalVisits,
          },
        };
      })
    );

    res.json({
      success: true,
      projects: projectsWithStats,
    });
  } catch (error) {
    console.error("Get websites error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch websites",
    });
  }
});

router.post("/projects", authMiddleware, async (req, res) => {
  try {
    const { name, siteUrl } = req.body;

    if (!name || !siteUrl) {
      return res.status(400).json({
        success: false,
        message: "Name and siteUrl are required",
      });
    }

    if (!validateUrl(siteUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL. Must start with http:// or https://",
      });
    }

    const apiKey = generateApiKey();

    const project = new Project({
      owner: req.userId,
      name,
      siteUrl,
      apiKey,
    });

    await project.save();

    res.status(201).json({
      success: true,
      project: project.toJSON(),
    });
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
    });
  }
});

router.get("/projects/:id/visits", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 50;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const skip = (page - 1) * pageSize;

    const visits = await Visit.find({ project: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const totalVisits = await Visit.countDocuments({ project: id });

    const uniqueIPs = await Visit.distinct("ip", { project: id });

    res.json({
      success: true,
      visits,
      summary: {
        totalVisits,
        uniqueIPs: uniqueIPs.length,
      },
      project: project.toJSON(),
    });
  } catch (error) {
    console.error("Get visits error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch visits",
    });
  }
});

router.get("/projects/:id/stats", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    if (project.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const totalVisits = await Visit.countDocuments({ project: id });
    const uniqueIPs = await Visit.distinct("ip", { project: id });

    const browserStats = await Visit.aggregate([
      { $match: { project: project._id } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const osStats = await Visit.aggregate([
      { $match: { project: project._id } },
      { $group: { _id: "$os", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const countryStats = await Visit.aggregate([
      { $match: { project: project._id } },
      { $group: { _id: "$geo.country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    res.json({
      success: true,
      stats: {
        totalVisits,
        uniqueVisitors: uniqueIPs.length,
        browsers: browserStats.map((b) => ({ name: b._id, count: b.count })),
        operatingSystems: osStats.map((os) => ({
          name: os._id,
          count: os.count,
        })),
        topCountries: countryStats.map((c) => ({
          name: c._id,
          count: c.count,
        })),
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
});

// delete request
router.get("/projects/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    console.log(projectId)
    const Delproject = await Project.findByIdAndDelete(projectId);
    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
});

module.exports = router;
