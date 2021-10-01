const express = require('express');
const router = express.Router();
// const studentsCtrl = require('../controllers/students')

router.get('/home', (req, res) => {
    res.render('student/student_home.ejs');
})