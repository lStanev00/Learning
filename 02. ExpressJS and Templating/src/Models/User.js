import mongoose from "mongoose";
import { encrypt } from "../Helpers/bcryptHelpers.js";

const userSchema = new mongoose.Schema({
    email : { type: String, require: [true, "Email is required"], unique: true },
    password : { type: String, require: [true, "Password is required"] },
    sessionID: { type: String, default: ""},
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