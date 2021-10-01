

//dependencies

const express = require('express');
const morgan = require('morgan');
const methodOverride = require("method-override");
const indexRouter = require('./controllers/index')
const studentsRouter = require('./controllers/students')
const userRouter = require('./controllers/user');
const appRouter = require('./controllers/app');
const port = 3000;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();




// // NEW TEST CODE //
// const session = require('express-session');
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const studentRouter = require('./routes/students');

// app.use('/users', usersRouter);
// app.use('/index', indexRouter);
// app.use('/student', studentRouter);

// app.use(session({
//     secret: 'shh',
//     resave: false,
//     saveUninitialized: false
// }))
// // END TEST CODE

//wire up the models


app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URI }),
    saveUninitialized: true,
    resave: false
}))

app.use('/', indexRouter);
app.use('/student', appRouter);
app.use('/user', userRouter);


// ////////////////
// //MAIN VIEWS
// ////////////////

// //main
// app.get('/', (req, res) => {
//     res.render('all/main.ejs');
// })

// // index log in
// app.get('/login', (req, res) => {
//     res.render('all/main_login.ejs');
// })

// //post log in
// app.post('/login', async (req, res) => {
//     try {
//         const user = await User.findOne({
//             username: req.body.username
//         })
//         if (user) {
//             const result = "";
//         }
//     }
//     catch {

//     }
// })

// //new account
// app.get('/create', (req, res) => {
//     res.render('all/main_create.ejs');
// })

// //create account
// app.post('/', async (req, res) => {
//     console.log(req.body)
//     try {
//         const salt = await bcrypt.genSalt(10);
//         req.body.password = await bcrypt.hash(req.body.password, salt);

//         await User.create(req.body);
//         res.redirect('/')
//     }
//     catch (error) {
//         res.status(400).json(error)
//     }
// })

////////////////
//STUDENT VIEWS
////////////////

//main
app.get('/', (req, res) => {
    res.render('main.ejs');
})




//student new
// app.get('/student/add_application', (req, res) => {
//     res.render('student/student_new_application.ejs')
// })

//student index
// app.get('/student/my_applications', (req, res) => {
//     res.render('student/student_index_applications.ejs')
// })

//student edit
// app.get('/student/:appID/edit', (req, res) => {
//     res.render('student/student_edit_application.ejs')
// })

//student show
// app.get('/student/:appID', (req, res) => {
//     res.render('student/student_show_application.ejs');
// })

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