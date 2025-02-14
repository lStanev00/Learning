import { Router } from "express";
import User from '../Models/User.js';

const registerController = Router();

registerController.get(`/register`, onLoad);

registerController.post(`/register`, registerAttempt);

async function onLoad(req, res) {
    if (req.user) return res.redirect(`/`);
    res.render(`register`);
}

async function registerAttempt(req, res) {
    const { username, email, password, rePass } = req.body;
    try {
        if (password == rePass){
            const newUser = new User({ username: username,  email: email, password: password  });
            await newUser.save();
            
            res.redirect(`/login`);
        }else {
            res.locals.error = {1: {message: `Passwords do not match`}};
            res.render(`register`);

        }
        
    } catch (error) {
        res.locals.error = error.errors;
        if (username) res.locals.username = username
        if (email) res.locals.email = email
        
        res.render(`register`);

    }
}

export default registerController;