import { Router } from "express";
import Disaster from "../Models/Disaster.js";

const searchCtrl = Router();

searchCtrl.get(`/search`, onLoad);

searchCtrl.get(`/dis/search`, onSearch);


async function onLoad(req, res) {
    try {
        const list = await Disaster.find().lean();

        return res.render(`search`, {list});
    } catch (error) {
        res.locals.error = {message: error}
        return res.render(`search`);        
    }
}

async function onSearch(req, res) {
    const { name, type } = req.query;
    try {
        const search = {};
        if (name) {search.name = new RegExp(name, "i"); res.locals.SName = name}
        if (type) {search.type = type; res.locals.SType = type}
        const list = await Disaster.find(search).lean();
        res.render(`search`, {list})
        
    } catch (error) {
        res.locals.error = {message: error}
        if (name) {res.locals.SName = name}
        if (type) {res.locals.SType = type}
        return res.render(`search`);        
    }
}


export default searchCtrl;