// controllers/websiteController.js
const WebsiteOwnerShipOTP = require("../models/WebsiteOwnerShipOtp");
const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.post("/add", async (req, res) => {
  try {
    const { url } = req.body;

    const token = crypto.randomBytes(20).toString("hex");
    const CheckURLExit = await WebsiteOwnerShipOTP.findOne({ websiteURI: url });
    if (CheckURLExit) {
      res.json({
        success: false,
        message: "Website Exit Already",
        verificationTag: "",
        CheckURLExit,
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
    // console.log(siteId);
    const site = await WebsiteOwnerShipOTP.findById(siteId);
    // console.log(site)
    // if (!site) {
    //   return res.json({ success: false, verified: false });
    // }
    console.log("URL I am fetching:", site.websiteURI);

    const response = await axios.get(site.websiteURI, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = response.data;
    console.log("Axios Response Status:", response.status);
    console.log("HTML sample:", response.data.substring(0, 300));

    console.log("HTML sample:", html.substring(0, 200));
    const $ = cheerio.load(html);
    console.log(html.data.substring(0, 500));

    const meta = $('meta[name="DevTrace-Varify-HMK-CodeWeb"]').attr("content");

    if (meta === site.OTPCode) {
      site.verified = true;
      await site.save();

      return res.json({ success: true, verified: true });
    }

    return res.json({ success: false, verified: false });
  } catch (err) {
    return res.json({ success: false, verified: false });
  }
});

module.exports = router;
