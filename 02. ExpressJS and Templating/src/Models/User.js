import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : { type: String, require: [true, "Email is required"] },
    password : { type: String, require: [true, "Password is required"] },
})

userSchema.pre("save", async function (next) {
    try {
        const exist = await mongoose.model(`User`).findOne({ email: this.email });

        if (exist) {
            return next(new Error(`The email : ${exist.email} already exist!`))
        }

        next();
    } catch (error) {
        next(error);
    }
});
const User = mongoose.model("User", userSchema);

export default User