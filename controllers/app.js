const express = require('express');
// const User = require('../models/app');
// const { application } = require('express');
const App = require('../models/app');

const router = express.Router();


// router middleware
router.use((req, res, next) => {
    console.log("A", req.session.loggedIn)
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
})

//seed apps
router.get('/seed', (req, res) => {
    const seedApps = [
        {
            title: "Job 1",
            employer: "Employer 1",
            jobDescription: "Job Description1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            dateApplied: 12 / 1 / 2019,
            status: "Applied",
            notes: "Notes 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Job 2",
            employer: "Employer 2",
            jobDescription: "Job Description 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            dateApplied: 11 / 3 / 2012,
            status: "Rejected",
            notes: "Notes 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Job 3",
            employer: "Employer 3",
            jobDescription: "Job Description 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            dateApplied: 4 / 3 / 2021,
            status: "Interviewing",
            notes: "Notes 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]

    App.deleteMany({}, (err, data) => {
        App.create(seedApps, (err, data) => {
            res.json(data);
        })
    })
})


//student home
router.get('/', async (req, res) => {
    const apps = await App.find({})
    res.render('student/student_home.ejs', { apps });
})


//index apps
router.get('/my_applications', async (req, res) => {
    const apps = await App.find({})
    res.render('student/index_apps.ejs', { apps })
})

//new app
router.get('/add_application', (req, res) => {
    res.render('student/new_app.ejs')
})

//delete app

//update app
router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);

    App.findByIdAndUpdate(id, req.body, { new: true }, (err, app) => {
        res.redirect(`/student/${id}`)
    })
})

//create app
router.post('/add_application', (req, res) => {
    req.body.username = req.session.username;
    App.create(req.body, (err, app) => {
        res.redirect('student/student_home.ejs')
    })
})

//edit app
router.get('/:appID/edit', (req, res) => {
    const id = req.params.appID;
    App.findById(id, (err, app) => {
        res.render('student/edit_app.ejs', { app })
    })
})

//show app
router.get('/:appID', (req, res) => {
    const id = req.params.appID;
    App.findById(id, (err, app) => {
        res.render('student/show_app.ejs', { app });
    })

})

module.exports = router;