const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      default: '', // optional
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

