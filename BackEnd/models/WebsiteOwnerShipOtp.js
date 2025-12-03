const mongoose = require("mongoose");

const WebsiteOwnerShipOTP = mongoose.Schema({
  websiteURI: {
    type: String,
    require: true,
  },
  OTPCode: {
    type: String,
    require: true,
  },
  verified: Boolean,
});

module.exports = mongoose.model("WebsiteOwnerShipOTP", WebsiteOwnerShipOTP);
