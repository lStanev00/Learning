import { verifyToken } from "../Helpers/jwtHelpers.js";

async function auth(req, res, next) {
    const token = req.cookies.auth;

    if (!token) return next();

    try {
        const validate = verifyToken(token);    
        req.user = validate;
        res.locals.user = validate;
        
    } catch (error) {res.clearCookie(`auth`)}

    next();
}

export default auth