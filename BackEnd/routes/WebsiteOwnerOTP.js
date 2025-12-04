// controllers/websiteController.js
const WebsiteOwnerShipOTP = require("../models/WebsiteOwnerShipOtp");
const projectSchema = require("../models/Project");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.post("/add", async (req, res) => {
  console.log(req.body)
  try {
    const { url } = req.body;

    const token = crypto.randomBytes(20).toString("hex");
   const CheckURLExitAsWhole = await projectSchema.findOne({ siteUrl: url })

    if (CheckURLExitAsWhole) {
      res.json({
        success: false,
        message: "Website Exit Already",
        verificationTag: "",
        CheckURLExitAsWhole,
      });
    } else {
      const site = await WebsiteOwnerShipOTP.create({
        websiteURI: url,
        OTPCode: token,
        verified: false,
      });

      return res.json({
        success: true,
        message: "Website added. Please verify ownership.",
        verificationTag: `<meta name="DevTrace-Varify-HMK-CodeWeb" content="${token}" />`,
        site,
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post("/verify", async (req, res) => {
  try {
    const { siteId } = req.body;

    const site = await WebsiteOwnerShipOTP.findById(siteId);
    if (!site) {
      return res.json({ success: false, verified: false, message: "Site not found" });
    }

    console.log("Fetching:", site.websiteURI);

    const response = await axios.get(site.websiteURI, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = response.data;



    const $ = cheerio.load(html);

    const meta = $('meta[name="DevTrace-Varify-HMK-CodeWeb"]').attr("content");


    if (meta && meta.trim() === site.OTPCode.trim()) {
      site.verified = true;
      await site.save();
      return res.json({ success: true, verified: true });
    }

    return res.json({ success: false, verified: false, message: "Meta tag not matched" });

  } catch (err) {
    console.error(err);
    return res.json({ success: false, verified: false, error: err.message });
  }
});

module.exports = router;
