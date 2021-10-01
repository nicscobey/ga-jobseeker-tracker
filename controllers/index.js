// module.exports = {
//     index
// }

// function index(req, res) {
//     res.render('all/main.ejs');
// }

const express = require('express');
const User = require('../models/user');

const router = express.Router();


////////////////
//MAIN VIEWS
////////////////



// // index log in
// router.get('/login', (req, res) => {
//     res.render('all/main_login.ejs');
// })

// //post log in
// router.post('/login', async (req, res) => {
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
// router.get('/create', (req, res) => {
//     res.render('all/main_create.ejs');
// })

// //create account
// router.post('/', async (req, res) => {
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

module.exports = router;