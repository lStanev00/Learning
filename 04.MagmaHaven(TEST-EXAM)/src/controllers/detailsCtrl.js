import { Router } from "express";
import User from "../Models/User.js";
import Volcano from "../Models/Volcano.js";

const detailsCtrl = Router();

detailsCtrl.get(`/details/:id`, onLoad);

detailsCtrl.get(`/vote/:id`, onVote);
// detailsCtrl.post(`/delete/:id`, onDelete);

async function onLoad(req, res) {
    const vol = await Volcano.findById(req.params.id).lean();
    if (!vol) return res.redirect(`/`);
    const userId = req.user?._id
    
    if (userId == vol.owner) res.locals.owner = true;
    if(vol.voteList.some(id => id.equals(userId))) res.locals.voted = true
    
    res.render(`details`, {vol});
}

async function onVote(req,res) {
    const vol = await Volcano.findById(req.params.id);
    if(!req.user) return res.redirect(`/details/${vol._id}`);
    if(vol.voteList.some(id => id.equals(req.user._id))) return res.redirect(`/details/${vol._id}`);
    vol.voteList.push(req.user._id);
    console.log(vol.voteList);
    
    await vol.save();
    return res.redirect(`/details/${vol._id}`)
}

export default detailsCtrl;