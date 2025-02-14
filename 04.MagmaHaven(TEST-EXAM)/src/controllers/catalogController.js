import { Router } from "express";
import Volcano from "../Models/Volcano.js";

const catalogController = Router();

catalogController.get(`/catalog`, onLoad);

async function onLoad(req,res) {
    const volcano = await Volcano.find().lean();

    res.render(`catalog`, {volcano})
}
export default catalogController;