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
    min: [2, `Name must be at least 2 characters long`]

  },
  location: {
    type: String,
    required: [true, 'Location is required.'],
    trim: true,
    min: [3, `Please provide the full name(at last 3 chars long).`]
  },
  elevation: {
    type: Number,
    required: [true, 'Elevation is required.'],
    min: [0, 'Elevation cannot be negative.']
  },
  lastEruption: {
    type: Number,
    required: [true, 'Last eruption year is required.'],
    min: [0, 'Last eruption year cannot be negative.'],
    max: [2024, `Last erruption can't be in future date.`]
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
    trim: true,
    min : [10, `Description need to be at last 10 chars`]
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