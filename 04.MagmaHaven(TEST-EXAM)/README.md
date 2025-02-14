# Magma Haven TODO Checklist

## Project Setup
- [x] Delete `node_modules` folder before submission
- [x] Ensure all dependencies are listed in `package.json`
- [x] Use Express.js as the backend framework
- [x] Use MongoDB with Mongoose
- [x] Use bcrypt for password hashing
- [x] Ensure the application starts from `index.js` on port 3000
- [x] Do not use React, Vue, or Angular

## Authentication & Authorization
### Guest Users (Not Logged In)
- [x] Can access the Home page
- [x] Can access the Login page & functionality
- [x] Can access the Register page & functionality
- [x] Can access the All Volcanoes page
- [ ] Can access the Details page (without functionality)
- [ ] Can access the Search page & functionality

### Logged-In Users
- [x] Can access the Home page
- [ ] Can access the Details page & functionality
- [ ] Can vote for volcanoes (if not the owner)
- [x] Can create new volcano posts
- [ ] Can edit & delete own volcano posts
- [x] Can access the Logout functionality
- [ ] Can access the Search page & functionality

## Pages & Features
### Home Page
- [x] Display static home page
- [x] Ensure Catalog button redirects to All Volcanoes page

### Register Page
- [x] Register user with username, email, and password
- [x] Ensure passwords are hashed
- [x] Validate input fields (passwords must match)
- [x] Redirect to Home page upon successful registration
- [x] Prevent logged-in users from accessing this page

### Login Page
- [x] Authenticate user using email & password
- [x] Redirect to Home page on success
- [x] Show errors for invalid credentials
- [x] Prevent logged-in users from accessing this page

### Logout
- [x] Clear session and redirect to Home page
- [x] Prevent non-logged-in users from accessing this functionality

### Create Volcano Wiki
- [x] Allow logged-in users to create a volcano post
- [x] Redirect to All Volcanoes page on success
- [x] Show error messages for invalid data
- [x] Prevent guests from accessing this page

### All Volcanoes Page
- [x] Display all volcano posts with name, location, type, and image
- [x] Ensure each post has a Details button
- [x] Display 'There are no volcanoes found yet!' if the database is empty

### Details Page
- [ ] Show full details of the volcano post
- [ ] Display Edit & Delete buttons if the user is the owner
- [ ] Display Vote button if user is not the owner and hasn't voted
- [ ] Display 'You've already voted for this volcano!' if the user has voted

### Edit Volcano Post
- [ ] Allow owners to edit their volcano posts
- [ ] Pre-fill form with current volcano data
- [ ] Redirect to details page on success
- [ ] Prevent non-owners from editing posts

### Delete Volcano Post
- [ ] Allow owners to delete their volcano posts
- [ ] Redirect to All Volcanoes page on success
- [ ] Prevent non-owners from deleting posts

### Search Functionality (Bonus)
- [ ] Implement search by name and type (case insensitive)
- [ ] Show matching volcanoes on search
- [ ] Display 'No results found' if no matches

## Validation & Error Handling
### User Validation
- [x] Username must be at least 2 characters long
- [x] Email must be at least 10 characters long
- [x] Password must be at least 4 characters long
- [x] Repeat password must match password

### Volcano Validation
- [x] Name must be at least 2 characters long
- [x] Location must be at least 3 characters long
- [x] Elevation must be at least 0
- [x] Last eruption year must be between 0 and 2024
- [x] Image URL must start with `http://` or `https://`
- [x] Type must be one of [Supervolcanoes, Submarine, Subglacial, Mud, Stratovolcanoes, Shield]
- [x] Description must be at least 10 characters long

## Final Checks
- [ ] Ensure `npm install` installs all dependencies
- [ ] Ensure `npm run start` starts the application
- [ ] Test all required functionalities
- [ ] Submit the last and final version
