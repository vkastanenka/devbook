# Application name

Devbook

# Application description

Devbook is a MERN stack application meant to act as a social media platform for developers. It is based off the DevConnector project built by Brad Traversy for his Udemy course: MERN Stack Front To Back: Full Stack React, Redux & Node.js. While features were inspired by Brad's build, Devbook was built from the ground up to solidify and expand upon concepts learned in the course. As well as having a completely different design, new features were added such as a follow system that allows developers to view each other's content and easily find their favorite developers, and an expansion upon the original project's timeline concept. Timelines were changed from global timelines to personal timelines that would allow you to chronologically view only your own personal posts, and posts from developers that you followed.

# Application features

1. JSON Web Token based authentication

- Users can register accounts and log in to use the site's functionality
- Inputs require authentication of criteria such as handles and emails being unique
- Users can request an email to reset their password if they've forgotten
- Users can update their account and their passwords
- Users can update their profile photo (feature not available in production as uploaded photos are only generated on the development machine, and not stored in any database)
- Passwords undergo encryption when stored in the database by utilizing bcryptjs

2. Customizable profile

- Users can create a developer profile to include a bio, links to any social media, their Github username to display their 5 most recent repositories, and more
- After creating the profile, users can then add education or experience qualifications, or update their profile accordingly
- Users can delete any education or experience they've added on their profile card

3. Developer browser

- Users can browse for other developers by name or by handle through a paginated form

4. Timeline

- Every user page has a personal timeline where the page's user can create Twitter style posts
- Every post can have comments added to it by anyone
- Both posts and comments have a like and dislike feature
- Users can delete posts and comments that they have made

5. Follows

- Users can follow other developers
- Followed developers appear in a list on the user's profile card
- Followed developer posts are added to the user's timeline who followed them

# Built with

- Sass - Style sheet language used for responsive layout
- React - Client side framework used
- Redux - Client side state management
- Node.js - Back end runtime environment used
- Express - Back end framework used to build RESTful API
- MongoDB - Database used
- Mongoose - Object data modeling library for MongoDB

# Authors

Victoria Kastanenka

# Acknowledgments

Brad Traversy

- Project concept and features
