import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  data: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);

export default Image;