import { Router } from "express";
import User from '../Models/User.js';

const registerController = Router();

registerController.get(`/register`, onLoad);

registerController.post(`register`, registerAttempt);

async function onLoad(req, res) {
    res.render(`register`);
}

async function registerAttempt(req, res) {
    const { email, password, rePass} = req.body;

    if (password == rePass){
        const newUser = new User({  email: email, password: password  });// Username?
        newUser.save();
        res.redirect(`/login`);
    }else {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    
}

export default registerController;