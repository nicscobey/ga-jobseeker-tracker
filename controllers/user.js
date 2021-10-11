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
    res.render('user/login.ejs', {error: false});
})

//post log in
router.post('/login', (req, res) => {
    //get email and password
    const { email, password } = req.body;

    //check if user exists
    User.findOne({ email }, (err, user) => {
        if (!user) {
            // res.send("User does not exist");
            res.render('user/login.ejs', {error: true});
        }
        else {
            // check if password matches
            console.log('user is USER')
            console.log(user)
            const result = bcrypt.compareSync(password, user.password);
            if (password === user.password) {
                console.log('yay!')
            }

            if (result && user.accountType === "Student") {
                req.session.loggedIn = true;
                req.session.email = email;
                req.session.accountType = user.accountType;
                res.redirect('/student')
            }
            else if (result && user.accountType === "Coach") {
                req.session.loggedIn = true;
                req.session.email = email;
                req.session.accountType = user.accountType;
                // res.redirect('/student')
                res.redirect('/coach');
            }
            else {
                // res.send("Wrong password!");
                res.render('user/login.ejs', {error: true});
            }
        }
    })
})

//logout route
router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/')
    })
})

//new account
router.get('/signup', (req, res) => {
    let userExists = false;
    res.render('user/signup.ejs', {error: false});
})

//create account
router.post('/signup', async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    let email = req.body.email;
    console.log(email);

    let userExists = false;

    User.findOne({email}, (err, user) => {
        console.log('hi hi');
        console.log(user);
        console.log(err);
        
        
        // res.send('user already exists');
    })

    if (userExists) {
        res.render('user/signup.ejs', {error: true})
    }
    else {
        User.create(req.body, (err, user) => {
            res.redirect('/user/login');
        })
    }
})

module.exports = router;