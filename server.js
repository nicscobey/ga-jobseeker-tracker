const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('GA')
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

app.listen(port, (req, res) => {
    console.log('job tracker at ', port)
})