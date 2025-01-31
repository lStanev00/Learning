import mongoose from "mongoose";
const uri = `mongodb://127.0.0.1:27017/movieMagic`

export async function DBconnect() {
    try {
        await mongoose.connect(uri);
        console.log("MongoDB Connected Successfully!");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1); 
    }
};

