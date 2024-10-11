const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { students } = require('../models/student');
const fs = require('fs');
const path = require('path');

//student Registration
const register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  students.push({ id: students.length + 1, name, email, password: hashedPassword });
  res.status(201).send('Student registered successfully');
};

//studentLogin
const login = async (req, res) => {
  const { email, password } = req.body;
  const student = students.find((stu) => stu.email === email);

  if (!student || !(await bcrypt.compare(password, student.password))) {
    return res.status(400).send('Invalid credentials');
  }

  const token = jwt.sign({ id: student.id, email: student.email }, 'SECRET_KEY', { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true }).send('Login successful');
};

// Student profile
const getProfile = (req, res) => {
  const student = students.find((stu) => stu.id === req.student.id);
  if (!student) return res.status(404).send('Student not found');
  res.send(student);
};

// Update student profile
const updateProfile = (req, res) => {
  const student = students.find((stu) => stu.id === req.student.id);
  if (!student) return res.status(404).send('Student not found');
  
  const { name, email } = req.body;
  student.name = name || student.name;
  student.email = email || student.email;

  res.send('Profile updated successfully');
};

// Upload file
const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded');
  res.send('File uploaded successfully');
};

// Read file
const readFile = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
  res.sendFile(filePath);
};

// Delete file
const deleteFile = (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send('File not found');
  
  fs.unlinkSync(filePath);
  res.send('File deleted successfully');
};

module.exports = { register, login, getProfile, updateProfile, uploadFile, readFile, deleteFile };
