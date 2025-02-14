import { verifyToken } from "../Helpers/jwtHelpers.js";

async function auth(req, res, next) {
    const token = req.cookies.auth;

    if (!token) return next();

    
    try {
        const validate = verifyToken(token);    
        
        if (!validate) {
            res.clearCookie(`auth`)
            if (req.url.startsWith(`/login`) || req.url.startsWith(`/register`) || req.url.startsWith(`/create`)) return res.redirect(`/`);
        };

        req.user = validate;
        res.locals.user = validate;
        
    } catch (error) {res.clearCookie(`auth`)}

    next();
}

export default auth