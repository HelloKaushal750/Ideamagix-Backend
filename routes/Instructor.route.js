const express = require("express");
const {LectureModel} = require('../models/lecture.model')

const InstructorController = express.Router();

InstructorController.get("/",async (req,res)=>{
    try {
        const userId = req.body.userId;
        const allLecture = await LectureModel.find({instructor:userId})
        console.log(allLecture);
        res.send({allLecture})
    } catch (error) {
        res.status(404).json({message:error});
    }
})

module.exports = {InstructorController}