import User from "../Models/User.js";
import { encrypt } from "../Helpers/bcryptHelpers.js";

export async function registerPost(req, res) {
    const { email, password, rePass} = req.body;

    if (password == rePass){
        const newUser = new User({  email: email, password: await encrypt(password)   });
        newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }else {
        return res.status(400).json({ message: "Passwords do not match" });
    }
}