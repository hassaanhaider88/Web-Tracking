const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  siteUrl: {
    type: String,
    required: true,
    trim: true
  },
  apiKey: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

projectSchema.methods.toJSON = function() {
  const project = this.toObject();
  delete project.__v;
  return project;
};

module.exports = mongoose.model('Project', projectSchema);
