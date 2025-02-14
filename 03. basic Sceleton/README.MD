This is gonna be a basic sceleton to reuse further in the express course. I make it to save time because most of the project tasks are based on same technologies so i dont have to rewrite from the base everithink. That will save me time on the exam aswell.

Tasks brakedown list:

1. Initialize a project.
- [x] "npm init" initialization
- [x] Setup nodemon (or --watch)
- [x] Implement a start script
- [x] type : "module" use the ES6 module system
2. Express setup.
- [x] npm install express
- [x] Setup the index.js start file (main server)
- [x] Add public resourse folder and link it
- [x] Parsing the form requests with a body parser
- [x] Parsing JSON requests
- [x] Modular router linked
- [x] Test home page
3. Handlebars setup
- [x] npm install ...
- [x] Config the engine (express now uses Handlebars as view engine)
- [x] Set views folder
- [x] Partials and layout dir 
- [x] Basic view with layout
4. Database setup
- [x] npm install mongoose
- [x] Connect the database
- [x] Add user model
- [x] Add User input validations
5. Register
- [x] install bcrypt
- [x] Helpers for bcrypt
- [x] Check confirm password
- [x] Encrypt (hash) the passwoard on Model level (User model)
- [x] Register controller with post request
6. Login
- [x] Login controller
- [x] Validates the password
- [x] Sending JWToken on success
- [x] Error handled