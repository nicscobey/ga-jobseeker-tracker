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
router.post('/login', (req, res) => {
    //get email and password
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    //check if user exists
    User.findOne({ email }, (err, user) => {
        if (!user) {
            res.send("User does not exist");
        }
        else {
            // check if password matches
            console.log(user);
            const result = bcrypt.compareSync(password, user.password);
            console.log('password', password);
            console.log('user.password', user.password);
            console.log('result', result);

            if (password === user.password) {
                console.log('yay!')
            }

            if (result) {
                req.session.loggedIn = true;
                req.session.email = email;
                res.redirect('/student')
            }
            else {
                res.send("Wrong password!");
            }
        }
    })
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
        console.log('*************************USER****************')
        console.log(user);
        console.log(err);
        res.redirect('/user/login');
    })
})

module.exports = router;