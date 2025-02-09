import User from "../Models/User.js";

export async function registerPost(req, res) {
    const { email, password, rePass} = req.body;

    if (password == rePass){
        const newUser = new User({  email: email, password: password  });
        newUser.save();
        res.redirect(`/login`);
    }else {
        return res.status(400).json({ message: "Passwords do not match" });
    }
}