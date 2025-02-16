import mongoose from "mongoose";

const disasterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Disaster name is required.'],
        minlength: [2, 'Disaster name is too short(be more original)']
    },
    type: {
        type: String,
        required: [true, 'Disaster type is required.'],
        enum: {
            values: ["Wildfire", "Flood", "Earthquake", "Hurricane", "Drought", "Tsunami", "Other"],
            message: 'Invalid disaster type.'
        }
    },
    year: {
        type: Number,
        required: [true, 'Event year is required.'],
        min: [0, 'Event year must be at least 0.'],
        max: [2024, 'Event year can`t be future date']
    },
    location: {
        type: String,
        required: [true, 'Location is required.'],
        minlength: [3, 'Location string is too short.']
    },
    image: {
        type: String,
        required: [true, 'Image is required.'],
        validate: {
            validator: function(v) {
                return /^(http:\/\/|https:\/\/)/.test(v);
            },
            message: 'Invalid URL format.'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required.'],
        minlength: [10, 'Description string is too short.']
    },
    interestedList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

const Disaster = mongoose.model('Disaster', disasterSchema);

export default Disaster;
