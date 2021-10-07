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
            const result = bcrypt.compareSync(password, user.password);
            if (password === user.password) {
                console.log('yay!')
            }

            if (result) {
                req.session.loggedIn = true;
                req.session.email = email;
                res.redirect('/student')
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