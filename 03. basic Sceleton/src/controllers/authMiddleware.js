import { verifyToken } from "../Helpers/jwtHelpers.js";

async function auth(req, res, next) {
    const token = req.cookies.auth;

    if (!token) return next();

    if (req.url.startsWith(`/login`) || req.url.startsWith(`/register`)) return res.redirect(`/`);

    try {
        const validate = verifyToken(token);    

        if (!validate) res.clearCookie(`auth`);

        req.user = validate;
        res.locals.user = validate;
        
    } catch (error) {res.clearCookie(`auth`)}

    next();
}

export default auth