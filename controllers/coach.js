const express = require('express');
// const User = require('../models/app');
// const { application } = require('express');
const App = require('../models/app');
const Course = require('../models/course')
const User = require('../models/user');

const router = express.Router();


// router middleware
router.use((req, res, next) => {
    // console.log("A", req.session.loggedIn)
    if (req.session.loggedIn) {
        if (req.session.accountType !== "Coach") {
            res.redirect('/student');
        }
        next();
    } else {
        res.redirect('/');
    }
})

//seed apps
router.get('/seed', (req, res) => {
    const seedCourses = [
        {
            courseName: "SEIR-Ringo",
            Students: [],
            email: req.session.email
        },
        {
            courseName: "SEIR-Jedi",
            Students: [],
            email: req.session.email
        },
        {
            courseName: "UXDI-Starfish",
            Students: [],
            email: req.session.email
        },
        {
            courseName: "SEI-921",
            Students: [],
            email: req.session.email
        }
    ]

    Course.deleteMany({}, (err, data) => {
        Course.create(seedCourses, (err, data) => {
            res.json(data);
        })
    })
})


//coach home
router.get('/', (req, res) => {

    Course.find({ email: req.session.email}, (err, courses) => {
        res.render('coach/coach_home.ejs', {courses});
    })
})

//coach new
router.get('/add_application', (req, res) => {
    // res.render('student/student_new_application.ejs')
})

//coach class index
router.get('/my_classes', (req, res) => {

    Course.find({email: req.session.email}, (err, courses) => {
        res.render('coach/index_courses.ejs', {courses})
    })
})

//student edit
// router.get('/student/:appID/edit', (req, res) => {
//     res.render('student/student_edit_application.ejs')
// })

//coach show class
router.get('/my_classes/:courseID', (req, res) => {
    const courseID = req.params.courseID;

    // Course.findById(courseID, (err, course) => {
    //     console.log(course);
    //     console.log(err);
    //     res.render('coach/show_course.ejs', {course});
    // })

    User.find({course: req.params.courseID}, (err, course) => {
        console.log(students);
        console.log(courseID);
        console.log(err);
        res.render('coach/show_course.ejs', {course, courseID});
    })
})

module.exports = router;