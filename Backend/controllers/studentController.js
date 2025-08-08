const Student = require('../models/studentModel');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 }); // sorted by latest
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error.message);
    res.status(500).json({ error: "Server error while retrieving students" });
  }
};

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    const { name, course, email } = req.body;

    // Validate required fields
    if (!name || !course) {
      return res.status(400).json({ error: "Name and course are required." });
    }

    const student = new Student({
      name,
      course,
      email: email || "", // Default to empty if not provided
    });

    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Error creating student:", error.message);
    res.status(500).json({ error: "Server error while creating student" });
  }
};

module.exports = {
  getStudents,
  createStudent,
};
