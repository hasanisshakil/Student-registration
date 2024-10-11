const express = require('express');
const { register, login, getProfile, updateProfile, uploadFile, readFile, deleteFile } = require('./controllers/studentController');
const authenticateToken = require('./middleware/auth');
const upload = require('./middleware/upload');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/upload', authenticateToken, upload.single('file'), uploadFile);
router.get('/files/:filename', authenticateToken, readFile);
router.delete('/files/:filename', authenticateToken, deleteFile);

module.exports = router;