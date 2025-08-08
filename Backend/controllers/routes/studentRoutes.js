const express = require('express');
const router = express.Router();
const { getStudents, createStudent } = require('../controllers/studentController');

// GET /api/students
router.get('/', getStudents);

// POST /api/students
router.post('/', createStudent);

module.exports = router;

