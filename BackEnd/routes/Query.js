// routes/queryRoutes.js
const express = require("express");
const router = express.Router();
const Query = require("../models/Query");

// Add new query
router.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newQuery = await Query.create({ name, email, message });
    return res.json({ success: true, message: "Query submitted successfully", query: newQuery });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Get all queries (optional)
router.get("/", async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 });
    return res.json({ success: true, queries });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
