# App Buddy

Job searching is hard. When a person is putting countless hours toward applying and networking, it can become nearly impossible to remember all the applications they've submitted and contacts they've made.

App Buddy is a full-stack application built to help job seekers track their job applications and networking contacts. With the ability to log in, data is securely stored to ensure that information is accessible at any time. And, with a built-in dashboard, App Buddy helps job seekers gain self-awareness about their job search metrics to make data-driven decisions about what is and is not working in their search.

The default user type is "Student", which allows users to track their applications and contacts. A second type of user, "Coach", also exists, though. A coach can access information about the classes they teach, and when viewing their classes they also see data about their students' applications and contacts. 

Altogether, this application leverages several types of users, with authorization, and several models create an application that is both practical and complex.

## Screenshots

## Technologies Used

- JavaScript
    - Express
    - EJS
    - Mongoose
    - Bcrypt
    - jQuery
- MongoDB
- HTML
- Bulma & CSS

## Getting Started

Access the application [here](https://career-engineer-job-tracker.herokuapp.com/)

To get started, created an account, and then log in. Upon logging in, you'll be directed to the dashboard, which provides links to several basic actions and gives an overview of some basic metrics. Upon navigating into the contacts or applications, users have full CRUD functionality, where they can create, read, update, or delete information about their contacts and applications.

The applications page also provides a way for users to filter their results by one of several properties: date applied, job title, employer, or status. Additionally, users can search for a specific application by entering a search word or phrase that then filters down the index's results. 

## Next Steps

Further work is needed to add some additional touches to the Coach views, giving more data about their students and the status of the job search. 

On the Student side, additional work is needed to ensure that the application is tracking data that is relevant and useful for students. To research this, I am currently in conversation with several career coaches to break data points into the categories of optional and required. 