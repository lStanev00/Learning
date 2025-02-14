import { Router } from "express";
import Volcano from "../Models/Volcano.js";

const createCtrl = Router();

createCtrl.get(`/create` , (req,res) => req.user ? res.render(`create`) : res.redirect(`/`));

createCtrl.post(`/create`, handler);


async function handler(req, res) {
    req.body.owner = req.user._id;
    const { name, location, elevation, lastEruption, image, typeVolcano, description, owner } = req.body;

    try {
        const exist = await Volcano.findOne({ name: name });
        if (exist) {
            res.locals.error = {1: {message: `Volcano with name: ${name} already exist!`}};
            return res.render(`create`)
        }
        const vol = new Volcano(req.body);
        await vol.save();
        return res.redirect(`/catalog`)
        
    } catch (error) {
        res.locals.error = error.errors;
        res.render(`create`);
    }
    
}


export default createCtrl