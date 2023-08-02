const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  lectures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lecture' }],
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = {CourseModel};