const express = require("express");
const { ObjectId } = require("mongodb");

const AdminController = express.Router();

const { CourseModel } = require("../models/course.model");
const { LectureModel } = require("../models/lecture.model");
const { UserModel } = require("../models/user.model");

AdminController.get("/showInstructor",async (req,res)=>{
    try {
        const allInstructor = await UserModel.find({category:"Instructor"});
        res.status(200).json(allInstructor)
    } catch (error) {
        res.status(404).json(error)
    }
})

AdminController.get("/showCourse",async(req,res)=>{
    try {
        const allCourse = await CourseModel.find();
        res.status(200).json(allCourse)
    } catch (error) {
        res.status(404).json(error)
    }
})

AdminController.post("/addcourse", async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    const course = new CourseModel({
      name,
      level,
      description,
      image,
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error adding course" });
  }
});

AdminController.post("/addlecture/:courseId", async (req, res) => {
  try {
    const { courseId } = req.params;
    const { instructorId, date } = req.body;

    const instructorH = await UserModel.findById(instructorId);
    if (!instructorH) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const checkLecture = await LectureModel.find({ date });
    console.log(checkLecture);
    if (checkLecture.length>0) {
      const objectIdInstance = new ObjectId(checkLecture[0].instructor);
      const instructorString = objectIdInstance.toString();
    
      const courseInstance = new ObjectId(checkLecture[0].course);
      const courseString = courseInstance.toString();

      console.log(instructorString, instructorId);
      if (instructorString === instructorId || courseString === courseId) {
        return res.status(404).json({
          message: "Lecture already scheduled for the instructor on this date",
        });
      }
    }

    const lecture = new LectureModel({
      course: courseId,
      instructor: instructorId,
      date,
    });
    await lecture.save();
    course.lectures.push(lecture._id);
    await course.save();
    res.status(201).json(lecture);
  } catch (error) {
    res.status(500).json({ message: "Error adding lecture" });
    console.log(error);
  }
});


module.exports = { AdminController };
