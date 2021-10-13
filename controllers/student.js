const express = require('express');
const App = require('../models/app');
const Contact = require('../models/contact');


const router = express.Router();


// router middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next();
    } else {
        res.redirect('/');
    }
})

//seed apps
router.get('/seedApps', (req, res) => {
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


//seed contacts
router.get('/seedContacts', (req, res) => {
    const seedContacts = [
        {
            firstName: "Musical",
            lastName: "Chairs",
            email: "singsong@dingdong",
            linkedIn: "LinkedIn.com/laaaaa",
            phone: "123-456-7890",
            employer: "Sonic Music",
            firstContact: 12/12/2020,
            latestContact: 9/10/2021,
            notes: "Very talented singer",
            myEmail: req.session.email
        },
        {
            firstName: "John",
            lastName: "Ball Zoo",
            email: "jbz@zoo.co",
            linkedIn: "LinkedIn.com/jbz",
            phone: "123-456-7890",
            employer: "Johnie B",
            firstContact: 12/12/2020,
            latestContact: 9/10/2021,
            notes: "Oh, look at the little bunnies!",
            myEmail: req.session.email
        },
        {
            firstName: "Alphabet",
            lastName: "Soup",
            email: "alphabet@PushSubscriptionOptions.com",
            linkedIn: "LinkedIn.com/alphie",
            phone: "123-456-7890",
            employer: "Dr. Seuss",
            firstContact: 12/12/2020,
            latestContact: 9/10/2021,
            notes: "Great personality",
            myEmail: req.session.email
        }
    ]

    Contact.deleteMany({}, (err, data) => {
        Contact.create(seedContacts, (err, data) => {
            res.json(data);
        })
    })
})

//student home
router.get('/', (req, res) => {
    App.find({ email: req.session.email }, (err, apps) => {
        Contact.find({myEmail: req.session.email}, (err, contacts) => {
            res.render('student/student_home.ejs', { apps, contacts });
        })
    })
})

//index apps
// router.get('/apps/my_applications', async (req, res) => {
//     // const apps = await App.find({ email: req.session.email })
//     // res.render('student/index_apps.ejs', { apps })

//     App.find({ email: req.session.email }, (err, apps) => {
        
//         //Default: sorts apps by application date
//         apps.sort(function (a, b) {
//             return a.dateApplied - b.dateApplied;
//         })
        
//         apps.reverse();
//         console.log(apps);
//         // res.render('student/index_apps.ejs', { apps, includeRejected, sortBy, searchTerm })
//         res.render('student/apps/index_apps.ejs', { apps, includeRejected: false, sortBy: "dateApplied", searchTerm: "" })
//     })


// })


//filter index apps
router.get('/apps/my_applications/:includeRejected/:sortBy/:searchTerm', async (req, res) => {
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
        
        res.render('student/apps/index_apps.ejs', { apps, includeRejected, sortBy, searchTerm })
    })
})

//new app
router.get('/apps/add_application', (req, res) => {
    res.render('student/apps/new_app.ejs')
})

//delete app
router.delete('/apps/:appID', (req, res) => {
    const appID = req.params.appID;

    App.findByIdAndRemove(appID, (err, app) => {
        res.redirect('/student/apps/my_applications/false/dateApplied/null')
    })
})

//update app
router.put('/apps/:id', (req, res) => {
    const id = req.params.id;

    App.findByIdAndUpdate(id, req.body, { new: true }, (err, app) => {

        res.redirect(`/student/apps/${id}`)
    })
})

//update app - mark as rejected
router.put('/apps/:id/rejected', (req, res) => {
    const id = req.params.id;

    App.findByIdAndUpdate(id, { status: "Rejected" }, { new: true }, (err, app) => {
        res.redirect('/student/apps/my_applications/false/dateApplied/null');
    })
})

//create app
router.post('/apps/add_application', (req, res) => {
    req.body.email = req.session.email;
    let appDate = new Date(req.body.appDate);
    let appMS = appDate.getTime();

    let myDate = new Date();
    let offsetMS = myDate.getTimezoneOffset() * 60 * 1000;
    let dateApplied = new Date(appMS + offsetMS);

    req.body.dateApplied = new Date(dateApplied);

    App.create(req.body, (err, app) => {
        res.redirect('/student/apps/my_applications/false/dateApplied/null')
    })
})

//edit app
router.get('/apps/:appID/edit', (req, res) => {
    const id = req.params.appID;
    App.findById(id, (err, app) => {
        res.render('student/apps/edit_app.ejs', { app })
    })
})

// show app
router.get('/apps/:appID', (req, res) => {
    const id = req.params.appID;
    App.findById(id, (err, app) => {
        res.render('student/apps/show_app.ejs', { app });
    })

})





//************************************************
//*********CONTACTS****************
//************************************************


//index contacts
router.get('/contacts/my_contacts', async (req, res) => {
    // const apps = await App.find({ email: req.session.email })
    // res.render('student/index_apps.ejs', { apps })

    Contact.find({ myEmail: req.session.email }, (err, contacts) => {        
        //Default: sorts apps by application date
        contacts.sort(function (a, b) {
            if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
            if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
            return 0;
        })
        
        //MAKE THIS ROUTE
        res.render('student/contacts/index_contacts.ejs', { contacts, sortBy: "dateApplied", searchTerm: "" })
    })
})

//filter index contacts
// router.get('/my_contacts/:includeRejected/:sortBy/:searchTerm', async (req, res) => {
//     const includeRejected = req.params.includeRejected === "false" ? false : true;

//     const sortBy = req.params.sortBy;
//     const searchTerm = req.params.searchTerm.toLowerCase();

//     console.log(includeRejected, sortBy, searchTerm);

//     App.find({email: req.session.email}, (err, apps) => {
//         const allApps=apps;

//         //filter out rejected apps
//         if (!includeRejected) {
//             for (let i = 0; i < apps.length; i++) {
//                 if (apps[i].status === "Rejected") {
//                     apps.splice(i, 1);
//                     i--;
//                 }
//             }
//         }

//         //filter by search term
//         if (searchTerm !== "null") {
//             for (let i = 0; i < apps.length; i++) {
//                 //checks if the search term matches job title, job description, employer, and anything from notes or status
//                 if (!(apps[i].title.toLowerCase().includes(searchTerm) || apps[i].employer.toLowerCase().includes(searchTerm) || apps[i].jobDescription.toLowerCase().includes(searchTerm) || apps[i].notes.toLowerCase().includes(searchTerm) || apps[i].status.toLowerCase().includes(searchTerm))) {
//                     apps.splice(i, 1);
//                     i--;
//                 }
//             }
//         }

//         //sort by Date Applied
//         if (sortBy === "Job Title") {
//             apps.sort(function (a, b) {
//                 let lowercaseA = a.title.toLowerCase();
//                 let lowercaseB = b.title.toLowerCase();

//                 if (lowercaseA < lowercaseB) return -1;
//                 if (lowercaseA > lowercaseB) return 1;
//                 return 0;
//             })
//         }
//         else if (sortBy === "Company") {
//             apps.sort(function (a, b) {
//                 let lowercaseA = a.employer.toLowerCase();
//                 let lowercaseB = b.employer.toLowerCase();

//                 if (lowercaseA < lowercaseB) return -1;
//                 if (lowercaseA > lowercaseB) return 1;
//                 return 0;
//             })
//         }
//         else if (sortBy === "Status") {
//             apps.sort(function (a, b) {
//                 let lowercaseA = a.status.toLowerCase();
//                 let lowercaseB = b.status.toLowerCase();

//                 if (lowercaseA < lowercaseB) return -1;
//                 if (lowercaseA > lowercaseB) return 1;
//                 return 0;
//             })
//         }
//         //default: sort by dateApplied
//         else {
//         // if (sortBy === "Date Applied") {
//             apps.sort(function (a, b) {
//                 return a.dateApplied - b.dateApplied;
//             })
//             apps.reverse();
//         }

//         //ADD BUTTON FOR SHOW ALL APPS
        
//         res.render('student/index_apps.ejs', { apps, includeRejected, sortBy, searchTerm })
//     })
// })

//new contact
router.get('/contacts/add_contact', (req, res) => {
    res.render('student/contacts/new_contact.ejs')
})

//delete contact
router.delete('/contacts/:contactID', (req, res) => {
    const contactID = req.params.contactID;

    Contact.findByIdAndRemove(contactID, (err, contact) => {
        res.redirect('/student/contacts/my_contacts')
    })
})

//update contact
router.put('/contacts/:id', (req, res) => {
    const id = req.params.id;

    Contact.findByIdAndUpdate(id, req.body, { new: true }, (err, contact) => {
        res.redirect(`/student/contacts/${id}`)
    })
})

//create contact
router.post('/contacts/add_contact', (req, res) => {
    req.body.myEmail = req.session.email;

    if (req.body.latestContact) {
        let contactDate = new Date(req.body.latestContact);
        let contactMS = contactDate.getTime();
        let myDate = new Date();
        let offsetMS = myDate.getTimezoneOffset() * 60 * 1000;
        let latestContact = new Date(contactMS + offsetMS);

        req.body.latestContact = new Date(latestContact);
        console.log(req.body.latestContact);
        console.log(req.body.latestContact.getMonth());
        console.log(req.body);

    }

    Contact.create(req.body, (err, app) => {
        res.redirect('/student/contacts/my_contacts')
    })
})

//edit contact
router.get('/contacts/:contactID/edit', (req, res) => {
    const id = req.params.contactID;

    if (req.body.latestContact) {
        let contactDate = new Date(req.body.latestContact);
        let contactMS = contactDate.getTime();
        let myDate = new Date();
        let offsetMS = myDate.getTimezoneOffset() * 60 * 1000;
        let latestContact = new Date(contactMS + offsetMS);

        req.body.latestContact = new Date(latestContact);
    }

    Contact.findById(id, (err, contact) => {
        res.render('student/contacts/edit_contact.ejs', { contact })
    })
})

//show app
router.get('/contacts/:contactID', (req, res) => {
    const id = req.params.contactID;
    Contact.findById(id, (err, contact) => {
        res.render('student/contacts/show_contact.ejs', { contact });
    })
})

//resources route
router.get('/resources', (req, res)=> {
    res.render('student/resources.ejs')
})

module.exports = router;