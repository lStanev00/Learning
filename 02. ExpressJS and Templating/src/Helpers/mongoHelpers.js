import mongoose from "mongoose";
const uri = `mongodb://127.0.0.1:27017/`

export async function DBconnect() {
    mongoose.connect(uri)
}