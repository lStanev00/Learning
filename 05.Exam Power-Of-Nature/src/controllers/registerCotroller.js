import { Router } from "express";
import User from '../Models/User.js';
import { generateToken } from '../Helpers/jwtHelpers.js';
import { validatePassword } from "../Helpers/bcryptHelpers.js";

const registerController = Router();

registerController.get(`/register`, onLoad);

registerController.post(`/register`, registerAttempt);

async function onLoad(req, res) {
    if (req.user) return res.status(401).redirect(`/`);
    res.render(`register`);
}

async function registerAttempt(req, res) {
    try {
        if (req.user) return res.status(401).send('Unauthorized: Already logged in');
    } catch (error) {
        return res.status(401).send(`${error}`);
    }
    const { username, email, password, rePass } = req.body;
    try {
        if (!rePass && password) {
            res.locals.error = {1: {message: `Please confirm the password`}};
            if (username) res.locals.username = username
            if (email) res.locals.email = email
            return res.render(`register`);
        }
        if (password == rePass){
            const newUser = new User({ username: username,  email: email, password: password  });
            await newUser.save();
            try {
                const user = await User.findOne(newUser);
                const token = generateToken(user);
                res.cookie(`auth`, token, { httpOnly: true });
                
                res.redirect(`/`);
            } catch (error) {
                res.locals.error = {messege: `${error}`};
                res.render(`404`)
            }

        }else {
            res.locals.error = {1: {message: `Passwords do not match`}};
            if (username) res.locals.username = username
            if (email) res.locals.email = email
            res.render(`register`);

        }
        
    } catch (error) {
        res.locals.error = error.errors ? error.errors : error;
        if (username) res.locals.username = username
        if (email) res.locals.email = email
        
        res.render(`register`);

    }
}

export default registerController;