import { Router } from "express";
import User from '../Models/User.js';
import { generateToken } from '../Helpers/jwtHelpers.js';
import { validatePassword } from "../Helpers/bcryptHelpers.js";

const loginControleer = Router();

loginControleer.get(`/login`, loadPage);

loginControleer.post(`/login`, loginAttempt);

function loadPage(req,res) {
    if (req.user) return res.redirect(`/`);
    res.render(`login`);
}

async function loginAttempt(req, res) {
    const { email, password } = req.body;
   
    try {
        const attemptedUser = await User.findOne({ email: email });
        const actualPassword = attemptedUser.password;

        const validate = await validatePassword(password, actualPassword);

        if (validate) {
            const token = generateToken(attemptedUser);
            res.cookie(`auth`, token, { httpOnly: true });
            return res.redirect(`/`);
        } else {
            res.locals.error = true;
            res.render(`login`);
        }
        
    } catch (error) {
        res.locals.error = true;
        res.render(`login`);
    }
    
}

export default loginControleer;