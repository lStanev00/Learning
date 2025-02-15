import { Router } from "express";
import User from "../Models/User.js";
import Volcano from "../Models/Volcano.js";

const detailsCtrl = Router();

detailsCtrl.get(`/details/:id`, onLoad);

// detailsCtrl.post(`/vote/:id`, onVote);
// detailsCtrl.post(`/delete/:id`, onDelete);

async function onLoad(req, res) {
    const vol = await Volcano.findById(req.params.id).lean();
    
    if (!vol) return res.redirect(`/`);
    if (req.user._id == vol.owner) res.locals.owner = true;

    res.render(`details`, {vol});
}



export default detailsCtrl;