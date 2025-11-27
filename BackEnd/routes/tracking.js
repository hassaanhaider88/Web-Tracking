const express = require('express');
const rateLimit = require('express-rate-limit');
const Project = require('../models/Project');
const Visit = require('../models/Visit');
const { sanitizeIP, getGeoData, parseUserAgent } = require('../utils/helpers');

const router = express.Router();

const trackingLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return sanitizeIP(req);
  }
});

router.post('/track', trackingLimiter, async (req, res) => {
  try {
    const apiKey = req.body.apiKey || req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(400).json({
        success: false,
        message: 'API key required'
      });
    }

    const project = await Project.findOne({ apiKey });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Invalid API key'
      });
    }

    const ip = sanitizeIP(req);

    const geo = getGeoData(ip);

    const userAgent = req.body.client?.ua || req.headers['user-agent'] || '';
    const { browser, os, device } = parseUserAgent(userAgent);

    const visitData = {
      project: project._id,
      ip,
      geo,
      ua: userAgent,
      browser,
      os,
      device,
      path: req.body.path || '/',
      referrer: req.body.referrer || '',
      createdAt: req.body.timestamp ? new Date(req.body.timestamp) : new Date()
    };

    const visit = new Visit(visitData);
    await visit.save();

    const io = req.app.get('io');
    if (io) {
      io.to(`project:${project._id}`).emit('visit', {
        projectId: project._id.toString(),
        visit: visit.toJSON()
      });
    }

    res.status(201).json({
      success: true,
      message: 'Visit tracked successfully'
    });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track visit'
    });
  }
});

module.exports = router;
