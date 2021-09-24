const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//main
app.get('/', (req, res) => {
    res.render('all/main.ejs');
})

//log in
app.get('/login', (req, res) => {
    res.render('all/main_login.ejs');
})

//create account
app.get('/create', (req, res) => {
    res.render('all/main_create.ejs');
})

//student home
app.get('/student/home', (req, res) => {
    res.render('student/student_home.ejs');
})

//student new
app.get('/student/add_application', (req, res) => {
    res.render('student/student_new_application.ejs')
})

//student index
app.get('/student/my_applications', (req, res) => {
    res.render('student/student_index_applications.ejs')
})

//student edit
app.get('/student/:appID/edit', (req, res) => {
    res.render('student/student_edit_application.ejs')
})

//student show
app.get('/student/:appID', (req, res) => {
    res.render('student/student_show_application.ejs');
})

////////////////
//COACH VIEWS
////////////////

//coach home
app.get('/coach/home', (req, res) => {
    res.render('coach/coach_home.ejs');
})

//coach new
app.get('/coach/add_application', (req, res) => {
    // res.render('student/student_new_application.ejs')
})

//coach class index
app.get('/coach/my_classes', (req, res) => {
    res.render('coach/coach_index_classes.ejs')
})

//student edit
app.get('/student/:appID/edit', (req, res) => {
    res.render('student/student_edit_application.ejs')
})

//coach show class
app.get('/coach/my_classes/:classID', (req, res) => {
    res.render('coach/coach_show_class.ejs');
})

app.listen(port, (req, res) => {
    console.log('job tracker at ', port)
})