import { Router } from "express";
import Disaster from "../Models/Disaster.js";

const catalogController = Router();

catalogController.get(`/catalog`, onLoad);

async function onLoad(req,res) {

    try {
        const dis = await Disaster.find().lean();
    
        res.render(`catalog`, {dis})
        
    } catch (error) {
        res.locals.error = {messege: `Error: ${error}`};
        return res.render(`home`);
    }
}
export default catalogController;