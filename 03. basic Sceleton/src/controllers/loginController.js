import { Router } from "express";
import User from '../Models/User.js';
import { generateToken } from '../Helpers/jwtHelpers.js';
import { validatePassword } from "../Helpers/bcryptHelpers.js";

const loginControleer = Router();

loginControleer.get(`/login`, loadPage);

loginControleer.post(`/login`, loginAttempt);

function loadPage(req,res) {
    res.render(`/login`);
}

async function loginAttempt(req, res) {
    const { email, passwoard } = req.body; // Username?

    console.log( email );

    
    try {
        const attemptedUser = User.findOne({ email: email });
        const actualPassword = attemptedUser.passwoard;

        const validate = validatePassword(passwoard, actualPassword);

        if (validate) {
            const token = generateToken(attemptedUser);
            res.cookie(`auth`, token, { httpOnly: true });
            return res.redirect(`/`);
        } else {
            throw new Error(`Invalid input`);
        }
        
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
    
}

export default loginControleer;