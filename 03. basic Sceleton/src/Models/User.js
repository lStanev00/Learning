import mongoose from "mongoose";
import { encrypt } from "../Helpers/bcryptHelpers.js";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true}, // Remove if missing!
    email: {
        type: String,
        requred: [true, `Email's required!`],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please provide a valid emain'
        }
    },
    password: {
        type: String,
        required: [true, `Password is required`]
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