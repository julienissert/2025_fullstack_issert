import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  introDescription: {
    type: String,
    required: true,
    maxlength: 80
  },
  fullDescription: {
    type: String,
    required: true,
    maxlength: 250 * 5
  },
  keywords: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
  thumbnail: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    validate: [imgLimit, '{PATH} exceeds the limit of 5']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function arrayLimit(val) {
  return val.length <= 10;
}

function imgLimit(val) {
  return val.length <= 5;
}

const Project = mongoose.model('Project', projectSchema);

export default Project;