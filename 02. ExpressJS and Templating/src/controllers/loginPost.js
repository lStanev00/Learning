import User from "../Models/User.js";
// import Session from "../Models/Session.js";
import { validatePassword } from "../Helpers/bcryptHelpers.js";
import { generateToken } from "../Helpers/jwtHelpers.js";

async function loginPost(req, res) {
    const { email, password } = req.body;
    
    const attemptedUser = await User.findOne({ email: email });
    if (!attemptedUser) return res.status(404).json({ message: `Invalid credentials`});
    
    const passwoardMatch = await validatePassword(password, attemptedUser.password);
    if (!passwoardMatch) return res.status(404).json({ message: `Invalid credentials`});

    // const sessionCheck = await Session.findById(attemptedUser.sessionId); TODO

    const token = generateToken(attemptedUser);

    res.cookie("auth", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000,
    });
    res.redirect(`/`);
}

export default loginPost