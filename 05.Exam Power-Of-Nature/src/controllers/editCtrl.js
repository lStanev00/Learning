import { Router } from "express";
import Disaster from "../Models/Disaster.js";
import { disconnect } from "mongoose";

const editCtrl = Router();

editCtrl.get(`/edit/:id`, onLoad);

editCtrl.post(`/edit/:id`, onEdit);

async function onLoad(req, res) {
    const userId = req.user?._id;
    const disId = req.params?.id;    

    try {
        let dis = await Disaster.findById(disId).lean();

        if(!userId) {
            res.locals.error = {messege: `Please login to edit!`};
            return res.render(`details`, {dis});
        }

        if (userId != dis.owner) {
            res.locals.voted = true;
            res.locals.error = {messege: `You are not authorized for this action!`};
            return res.render(`details`, {dis});
        }
    
    
        if(!req.user?._id) {
            res.locals.error = {messege: `Please login to edit!`};
            return res.render(`details`, {dis});
        }
        
        res.render(`edit`, {dis});   
    } catch (error) {
        res.locals.error = {messege: `Can't find the entry!`};
        return res.render(`404`);
    }
}

async function onEdit(req, res) {
    const userId = req.user?._id;
    const disId = req.params.id
    const editDis = await Disaster.findById(disId);

    if (userId != editDis.owner || !userId || !req.user?._id || !editDis) return res.redirect(`/details/${disId}`);
    try {
        Object.assign(editDis, req.body);
        await editDis.save();
        return res.redirect(`/details/${disId}`);
    } catch (error) {
        res.locals.error = error.errors;
        const dis  = req.body;
        return res.render(`edit`, {dis})
    }
}


export default editCtrl
