const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/studentdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// Schema & Model
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  course: { type: String, required: true },
});

const Student = mongoose.model('Student', studentSchema);


// Routes
app.get('/', (req, res) => {
    res.send('🎯 Student API is running');
});



// POST: Add student
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add student' });
  }
});

// GET: List students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// DELETE: Delete student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Server error while deleting student' });
  }
});

app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// PUT: Update student by ID
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on ${PORT}`);
});
