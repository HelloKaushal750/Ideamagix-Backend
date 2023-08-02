const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  date: { type: Date, required: true },
});

const LectureModel = mongoose.model('Lecture', lectureSchema);

module.exports = {LectureModel};
