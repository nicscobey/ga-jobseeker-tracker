const express = require('express');
// const User = require('../models/app');
// const { application } = require('express');
const App = require('../models/app');

const router = express.Router();


// router middleware
router.use((req, res, next) => {
    // console.log("A", req.session.loggedIn)
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
            notes: "Notes 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: req.session.email
        },
        {
            title: "Job 2",
            employer: "Employer 2",
            jobDescription: "Job Description 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            dateApplied: 11 / 3 / 2012,
            status: "Rejected",
            notes: "Notes 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: req.session.email
        },
        {
            title: "Job 3",
            employer: "Employer 3",
            jobDescription: "Job Description 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            dateApplied: 4 / 3 / 2021,
            status: "Interviewing",
            notes: "Notes 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            email: req.session.email
        }
    ]

    App.deleteMany({}, (err, data) => {
        App.create(seedApps, (err, data) => {
            res.json(data);
        })
    })
})


//student home
router.get('/', (req, res) => {
    App.find({ email: req.session.email }, (err, apps) => {
        res.render('student/student_home.ejs', { apps });
    })
})

//index apps
router.get('/my_applications', async (req, res) => {
    // const apps = await App.find({ email: req.session.email })
    // res.render('student/index_apps.ejs', { apps })

    App.find({ email: req.session.email }, (err, apps) => {
        
        //Default: sorts apps by application date
        apps.sort(function (a, b) {
            return a.dateApplied - b.dateApplied;
        })
        
        apps.reverse();
        // res.render('student/index_apps.ejs', { apps, includeRejected, sortBy, searchTerm })
        res.render('student/index_apps.ejs', { apps, includeRejected: false, sortBy: "dateApplied", searchTerm: "" })
    })


})

//filter index apps
router.get('/my_applications/:includeRejected/:sortBy/:searchTerm', async (req, res) => {
    const includeRejected = req.params.includeRejected === "false" ? false : true;

    const sortBy = req.params.sortBy;
    const searchTerm = req.params.searchTerm.toLowerCase();

    console.log(includeRejected, sortBy, searchTerm);

    App.find({email: req.session.email}, (err, apps) => {
        const allApps=apps;

        //filter out rejected apps
        if (!includeRejected) {
            for (let i = 0; i < apps.length; i++) {
                if (apps[i].status === "Rejected") {
                    apps.splice(i, 1);
                    i--;
                }
            }
        }

        //filter by search term
        if (searchTerm !== "null") {
            for (let i = 0; i < apps.length; i++) {
                //checks if the search term matches job title, job description, employer, and anything from notes or status
                if (!(apps[i].title.toLowerCase().includes(searchTerm) || apps[i].employer.toLowerCase().includes(searchTerm) || apps[i].jobDescription.toLowerCase().includes(searchTerm) || apps[i].notes.toLowerCase().includes(searchTerm) || apps[i].status.toLowerCase().includes(searchTerm))) {
                    apps.splice(i, 1);
                    i--;
                }
            }
        }

        //sort by Date Applied
        if (sortBy === "Job Title") {
            apps.sort(function (a, b) {
                let lowercaseA = a.title.toLowerCase();
                let lowercaseB = b.title.toLowerCase();

                if (lowercaseA < lowercaseB) return -1;
                if (lowercaseA > lowercaseB) return 1;
                return 0;
            })
        }
        else if (sortBy === "Company") {
            apps.sort(function (a, b) {
                let lowercaseA = a.employer.toLowerCase();
                let lowercaseB = b.employer.toLowerCase();

                if (lowercaseA < lowercaseB) return -1;
                if (lowercaseA > lowercaseB) return 1;
                return 0;
            })
        }
        else if (sortBy === "Status") {
            apps.sort(function (a, b) {
                let lowercaseA = a.status.toLowerCase();
                let lowercaseB = b.status.toLowerCase();

                if (lowercaseA < lowercaseB) return -1;
                if (lowercaseA > lowercaseB) return 1;
                return 0;
            })
        }
        //default: sort by dateApplied
        else {
        // if (sortBy === "Date Applied") {
            apps.sort(function (a, b) {
                return a.dateApplied - b.dateApplied;
            })
            apps.reverse();
        }

        //ADD BUTTON FOR SHOW ALL APPS
        
        res.render('student/index_apps.ejs', { apps, includeRejected, sortBy, searchTerm })
    })
})

//new app
router.get('/add_application', (req, res) => {
    res.render('student/new_app.ejs')
})

//delete app

//update app
router.put('/:id', (req, res) => {
    const id = req.params.id;

    App.findByIdAndUpdate(id, req.body, { new: true }, (err, app) => {
        res.redirect(`/student/${id}`)
    })
})

//update app - mark as rejected
router.put('/:id/rejected', (req, res) => {
    const id = req.params.id;

    App.findByIdAndUpdate(id, { status: "Rejected" }, { new: true }, (err, app) => {
        res.redirect('/student/my_applications');
    })
})

//create app
router.post('/add_application', (req, res) => {
    req.body.email = req.session.email;
    let appDate = new Date(req.body.appDate);
    let appMS = appDate.getTime();

    let myDate = new Date();
    let offsetMS = myDate.getTimezoneOffset() * 60 * 1000;
    let dateApplied = new Date(appMS + offsetMS);

    req.body.dateApplied = new Date(dateApplied);

    App.create(req.body, (err, app) => {
        res.redirect('/student')
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