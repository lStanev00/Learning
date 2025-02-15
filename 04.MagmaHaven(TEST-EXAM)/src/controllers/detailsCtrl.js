import { Router } from "express";
import Volcano from "../Models/Volcano.js";

const detailsCtrl = Router();

detailsCtrl.get(`/details/:id`, onLoad);

detailsCtrl.get(`/vote/:id`, onVote);
detailsCtrl.get(`/delete/:id`, onDelete);

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

async function onDelete(req, res) {
    try {
        const userID = req.user._id;
        const vol = await Volcano.findById(req.params.id);
        if (userID != vol.owner || !req?.user || !vol) res.redirect(`/details/${req.params.id}`);
        await Volcano.deleteOne(vol);
        res.redirect(`/catalog`);
    } catch (error) {
        res.status(404).json({messege: `Entry not found!`});
    }
}

export default detailsCtrl;