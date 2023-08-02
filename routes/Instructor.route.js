const express = require("express");
const { LectureModel } = require("../models/lecture.model");
const {CourseModel} = require('../models/course.model')

const InstructorController = express.Router();

InstructorController.get("/", async (req, res) => {
  try {
    const userId = req.body.userId;
    const allLecture = await LectureModel.find({ instructor: userId });
    console.log(allLecture);
    res.send({ allLecture });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

InstructorController.get("/:courseId", async (req, res) => {
  try {
    const {courseId} = req.params;
    const course = await CourseModel.findById({ _id : courseId });
    console.log(course);
    res.status(200).json(course)
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = { InstructorController };
