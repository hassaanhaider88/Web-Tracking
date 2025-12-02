const mongoose = require("mongoose");

const visitSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
    index: true,
  },
  uniqueUserId: {
    type: String,
    index: true,
  },

  country: String,
  ua: String,
  browser: String,
  os: String,
  device: String,
  path: {
    type: String,
    default: "/",
  },
  referrer: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

visitSchema.index({ project: 1, createdAt: -1 });

visitSchema.methods.toJSON = function () {
  const visit = this.toObject();
  delete visit.__v;
  return visit;
};

module.exports = mongoose.model("Visit", visitSchema);
