//dependencies

const express = require('express');
const morgan = require('morgan');
const methodOverride = require("method-override");
const indexRouter = require('./controllers/index')
const userRouter = require('./controllers/user');
const studentRouter = require('./controllers/student');
const coachRouter = require('./controllers/coach')
const port = 3000;
const session = require('express-session');
const MongoStore = require('connect-mongo');


const app = express();


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
app.use('/student', studentRouter);
app.use('/user', userRouter);
app.use('/coach', coachRouter);

//main
app.get('/', (req, res) => {
    res.render('main.ejs');
})

app.listen(process.env.PORT, (req, res) => {
    console.log('job tracker at ', port)
})