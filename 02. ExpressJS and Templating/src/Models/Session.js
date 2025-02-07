import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    email: { type: String, required : true },
    expiresAt: { type: Date, required: true, expires: 0 } // Deletes the document automatically
});

SessionSchema.pre("validate", function (next) {
    if (!this.expiresAt) {
        const expiresInSeconds = 10 * 24 * 60 * 60; // 10 days
        this.expiresAt = new Date(Date.now() + expiresInSeconds * 1000);
    }
    next();
});

const Session = mongoose.model("Session", SessionSchema);
export default Session;
