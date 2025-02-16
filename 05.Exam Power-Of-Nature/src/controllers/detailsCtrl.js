import { Router } from "express";
import Disaster from "../Models/Disaster.js";

const detailsCtrl = Router();

detailsCtrl.get(`/details/:id`, onLoad);

detailsCtrl.get(`/vote/:id`, onVote);
detailsCtrl.get(`/delete/:id`, onDelete);

async function onLoad(req, res) {
    
    try {
        const dis = await Disaster.findById(req.params.id).lean();
        if (!dis) return res.redirect(`/`);
        const userId = req.user?._id
        
        if (userId == dis.owner) res.locals.owner = true;
        if(dis.interestedList.some(id => id.equals(userId))) res.locals.voted = true;
        
        res.render(`details`, {dis});
        
    } catch (error) {
        res.locals.error = {messege: `Can't find the entry!`};
        return res.render(`404`);
    }
}

async function onVote(req,res) {

    try {
        const dis = await Disaster.findById(req.params.id);
        if(!req.user)  {
            res.locals.error = {messege: `Login to vote!`};
            const disLean = await Disaster.findById(req.params.id).lean();
            return res.render(`details`, {dis: disLean});
        }
        if (req.user._id == dis.owner){
            res.locals.owner = true;
            res.locals.error = {messege: `You can't vote for your own entry!`};
            const disLean = await Disaster.findById(req.params.id).lean();
            return res.render(`details`, {dis: disLean});
        }
        if(dis.interestedList.some(id => id.equals(req.user._id))) {
            res.locals.voted = true;
            res.locals.error = {messege: `You already voted!`};
            const disLean = await Disaster.findById(req.params.id).lean();
            return res.render(`details`, {dis: disLean});
        }
        dis.interestedList.push(req.user._id);
        
        await dis.save();
        return res.redirect(`/details/${dis._id}`)
        
    } catch (error) {
        res.locals.error = {messege: `Can't find the entry!`};
        return res.render(`404`);
    }
}

async function onDelete(req, res) {
    try {
        const userID = req.user?._id;
        const dis = await Disaster.findById(req.params.id);
        if (userID != dis.owner || !req?.user || !dis) {
            try {
                if(!req.user)  {
                    res.locals.error = {messege: `Login to delete!`};
                    const disLean = await Disaster.findById(req.params.id).lean();
                    return res.render(`details`, {dis: disLean});
                }
                if(dis.interestedList.some(id => id.equals(req.user._id))) {
                    res.locals.voted = true;
                    res.locals.error = {messege : `Your are not the original owner to perform this action!`};
                    const disLean = await Disaster.findById(req.params.id).lean();
                    return res.render(`details`, {dis: disLean})
                }
                res.locals.error = {messege : `Your are not the original owner to perform this action!`};
                const disLean = await Disaster.findById(req.params.id).lean();
                return res.render(`details`, {dis: disLean})
            } catch (error) {
                res.locals.error = error;
                return res.render(`404`);
            }
        };
        await Disaster.deleteOne(dis);
        res.redirect(`/catalog`);
    } catch (error) {
        res.locals.error = {messege: error};
        res.render(`home`);
    }
}

export default detailsCtrl;