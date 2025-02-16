# TODO List - Power of Nature (Express.js Exam)

## Project Setup
- [x] Delete `node_modules` before submission.
- [x] Ensure all dependencies are listed in `package.json`.
- [x] Use provided HTML & CSS resources (without modifying existing attributes).
- [x] Ensure application starts from `index.js` on **port 3000**.
- [x] Use **Express.js** as the back-end framework.
- [x] Use **MongoDB** with **Mongoose**.
- [x] Use **bcrypt** for password hashing.
- [x] Ensure the application runs with:
  - `npm install`
  - `npm run start`

---

## Database Models
### User Model
- [x] `username` (string, required, **min 2 characters**)
- [x] `email` (string, required, **min 10 characters**)
- [x] `password` (string, required, **hashed**, min 4 characters)

### Disaster Model
- [x] `name` (string, required, **min 2 characters**)
- [x] `type` (string, required, **one of**: `Wildfire, Flood, Earthquake, Hurricane, Drought, Tsunami, Other`)
- [x] `year` (number, required, **between 0-2024**)
- [x] `location` (string, required, **min 3 characters**)
- [x] `image` (string, required, **must start with http:// or https://**)
- [x] `description` (string, required, **min 10 characters**)
- [x] `interestedList` (array of Users)
- [x] `owner` (Object ID, reference to User model)

---

## Application Pages & Routes

### Home Page
- [x] Available for **all users (logged-in & guests)**.
- [x] Display a **static** homepage.
- [x] Ensure the **Catalog button** redirects to the **Power of Nature** page.

### Authentication
#### Register Page
- [x] Available **only for guests**.
- [x] Validate inputs (username, email, password, repeat password).
- [x] Hash password before storing.
- [x] Redirect to **Home Page** after successful registration.
- [x] Display errors if invalid input.
- [x] Prevent logged-in users from accessing `/register`.

#### Login Page
- [x] Available **only for guests**.
- [x] Validate user credentials.
- [x] Redirect to **Home Page** after login.
- [x] Display errors if invalid login attempt.
- [x] Prevent logged-in users from accessing `/login`.

#### Logout
- [x] Available **only for logged-in users**.
- [x] Clear session/token upon logout.
- [x] Redirect to **Home Page**.
- [x] Prevent guests from accessing `/logout`.

### Disaster Management
#### Create Disaster Post
- [x] Available **only for logged-in users**.
- [x] Display a form to create new disaster posts.
- [x] Validate input before storing.
- [x] Redirect to **Power of Nature (Catalog) page** upon success.
- [x] Prevent guests from accessing `/disasters/create`.

#### Catalog Page (Power of Nature)
- [x] Available **for all users**.
- [x] List all disasters.
- [x] Display **name, location, type, image, and Details button**.
- [ ] If no posts exist, display "There are no events found yet!".

#### Details Page
- [x] Available **for all users**.
- [x] Display full disaster details (name, location, type, year, interested count, description).
- [x] Show:
  - **[Edit] & [Delete]** buttons if user **is the owner**.
  - **[Interested]** button if user **is NOT the owner** and **has not interacted** yet.
  - **[Already Interested]** message if user **has already interacted**.
  - **No buttons** if the user is a guest.

#### Edit Disaster Post
- [x] Available **only for owners**.
- [x] Pre-fill form with existing post data.
- [x] Validate inputs before updating.
- [x] Redirect back to **Details page** upon success.
- [x] Prevent non-owners from accessing `/disasters/edit/:id`.

#### Delete Disaster Post
- [x] Available **only for owners**.
- [x] Delete disaster post from the database.
- [x] Redirect to **Power of Nature (Catalog) page** after deletion.
- [x] Prevent non-owners from accessing `/disasters/delete/:id`.

#### Interested in a Post
- [x] Available **only for logged-in users who are NOT the post owner**.
- [x] Add user ID to `interestedList`.
- [x] Prevent users from clicking if they are already interested.

---

## Security & Route Guards
- [x] Guests can only access:
  - [x] **Home Page**
  - [x] **Login & Register pages**
  - [x] **Power of Nature (Catalog) page**
  - [x] **Details page (without interactive buttons)**
- [x] Logged-in users can:
  - [x] Access **Create Event**
  - [x] Edit/Delete **only their own posts**
  - [x] Show **Interest** in other users' posts
  - [x] Logout properly
- [x] Redirect users from restricted routes they are not allowed to access.

---

## Error Handling & Validation
- [x] Display error messages in a `div.errorContainer`.
- [x] Preserve form data (except passwords) when errors occur.

---

## Bonus: Search Feature
- [x] Implement search functionality.
- [x] Filter disasters by **name** and **type** (case-insensitive).
- [x] Initially display **all disasters**.
- [x] If no matches found, display "No events found!".

---

## Final Submission Checklist
- [x] Ensure all functionality works as expected.
- [x] Test application for security & validation issues.
- [x] Remove `node_modules` before submission.
- [x] Verify dependencies are listed in `package.json`.
- [x] Archive project and submit before time runs out!

---

**Good luck! 🚀**
