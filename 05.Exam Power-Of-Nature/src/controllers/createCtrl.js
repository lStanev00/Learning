import { Router } from "express";
import Disaster from "../Models/Disaster.js";

const createCtrl = Router();

createCtrl.get(`/create` , (req,res) => req?.user ? res.render(`create`) : res.redirect(`/`));

createCtrl.post(`/create`, handler);


async function handler(req, res) {
    req.body.owner = req.user._id;
    const { name, type, year, location, image, description,  owner } = req.body;
    const data = {
        name: name,
        type: type,
        year: year,
        location: location,
        image: image,
        description: description,
        owner: owner
    };

    try {
        const exist = await Disaster.findOne({ name: name });
        if (exist) {
            res.locals.error = {1: {message: `Disaster with name: ${name} already exist!`}};
            return res.render(`create`)
        }
        const vol = new Disaster(data);
        await vol.save();
        return res.redirect(`/catalog`)
        
    } catch (error) {
        res.locals.data = data;
        res.locals.error = error.errors;
        res.render(`create`);
    }
    
}


export default createCtrl