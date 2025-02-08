import jwt from 'jsonwebtoken';
import 'dotenv/config';
// import { verify } from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET

export function generateToken(user) { 
    return jwt.sign({
        _id : user._id,
        email: user.email,
        // deviceInfo: user.deviceInfo,
    }, SECRET, { expiresIn: "10d" })
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, SECRET)
    } catch (error) {
        return undefined
    }
}