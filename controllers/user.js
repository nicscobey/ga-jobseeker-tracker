const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { application } = require('express');

const router = express.Router();

// //router middleware
// router.use((req, res, next) => {
//     if (req.session.loggedIn) {
//         next();
//     } else {
//         res.redirect('/');
//     }
// })

// index log in
router.get('/login', (req, res) => {
    res.render('user/login.ejs');
})

//post log in
router.post('/login', async (req, res) => {
    //get username and password
    const { username, password } = req.body;

    //check if user exists
    User.findOne({ username }, async (err, user) => {
        if (err) res.send("User does not exist");
    })

    const result = await bcrypt.compare(password, user.password);

    if (!result) res.send("Wrong password!");

    req.session.logginIn = true;
    req.session.username = username;

    res.redirect('/student/home')
})

//NEED TO ADD LOGOUT BUTTON
//logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

//new account
router.get('/signup', (req, res) => {
    res.render('user/signup.ejs');
})

//create account
router.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

    User.create(req.body, (err, user) => {
        res.redirect('/user/login');
    })
})

module.exports = router;