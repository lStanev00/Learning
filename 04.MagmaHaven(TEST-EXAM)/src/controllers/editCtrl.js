import { Router } from "express";
import Volcano from "../Models/Volcano.js";

const editCtrl = Router();

editCtrl.get(`/edit/:id`, onLoad);

editCtrl.post(`/edit/:id`, onEdit);

async function onLoad(req, res) {
    const userId = req.user?._id;
    const volId = req.params.id;    

    let vol = await Volcano.findById(volId).lean();

    if (userId != vol.owner || !userId || !req.user?._id || !vol) return res.redirect(`/details/${volId}`);

    res.render(`edit`, {vol});
}

async function onEdit(req, res) {
    const userId = req.user?._id;
    const volId = req.params.id
    const editVol = await Volcano.findById(volId);

    if (userId != editVol.owner || !userId || !req.user?._id || !editVol) return res.redirect(`/details/${volId}`);
    try {
        Object.assign(editVol, req.body);
        await editVol.save();
        return res.redirect(`/details/${volId}`);
    } catch (error) {
        res.locals.error = error.errors;
        const vol  = req.body;
        return res.render(`edit`, {vol})
    }
}


export default editCtrl
