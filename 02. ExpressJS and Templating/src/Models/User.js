import mongoose from "mongoose";
import { encrypt } from "../Helpers/bcryptHelpers.js";

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        require: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: 'Please provide a valid emain'
        }
    },
    password : { type: String, require: [true, "Password is required"] },
    // sessionId: { type: String, require: false, default: undefined },
})

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) { // Hash the passw only if moded
            this.password = await encrypt(this.password);
        }
        next();
    } catch (error) {
        next(error);
    }
});
const User = mongoose.model("User", userSchema);

export default User