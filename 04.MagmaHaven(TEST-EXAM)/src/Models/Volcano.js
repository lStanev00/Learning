import mongoose from 'mongoose';

const isValidUrl = (url) => {
const regex = /^(http:\/\/|https:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  return regex.test(url);
};

const VolcanoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Volcano name is required.'],
    trim: true,
    unique: true,
    index: true
  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
    trim: true
  },
  elevation: {
    type: Number,
    required: [true, 'Elevation is required.'],
    min: [0, 'Elevation cannot be negative.']
  },
  lastEruption: {
    type: Number,
    required: [true, 'Last eruption year is required.'],
    min: [0, 'Last eruption year cannot be negative.']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required.'],
    trim: true,
    validate: {
      validator: isValidUrl,
      message: 'Invalid URL format for image.'
    }
  },
  typeVolcano: {
    type: String,
    required: [true, 'Volcano type is required.'],
    enum: {
      values: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
      message: 'Invalid volcano type.'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required.'],
    trim: true
  },
  voteList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Owner is required.']
  }
}, { timestamps: true });

const Volcano = mongoose.model('Volcano', VolcanoSchema);
export default Volcano;
