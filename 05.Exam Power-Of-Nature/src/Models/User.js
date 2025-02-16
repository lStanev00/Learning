import mongoose from "mongoose";
import { encrypt } from "../Helpers/bcryptHelpers.js";

const UserSchema = new mongoose.Schema({
    username: {
        type: String, unique: true, required: [true, `Username is required`],
        minlength: [2, `Username msut be at last 2 chars`]
        }, // Remove if missing!
    email: {
        type: String,
        required: [true, `Email's required!`],
        minlength: [10, `Email must be at least 10 characters long`],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please provide a valid email',
        }
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: [4, `Password must be at least 4 characters long`],
    }
});

UserSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) { // Hash the password only if modified
            this.password = await encrypt(this.password);
        }
        next();
    } catch (error) {
        next(error);
    }
});

const User = mongoose.model(`User`, UserSchema);

export default User