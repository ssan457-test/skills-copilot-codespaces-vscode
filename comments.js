// Create a web server

// import the express module
const express = require("express");

// Create an instance of the express module
const app = express();

// import the body-parser module
const bodyParser = require("body-parser");

// import the uuid module
const uuid = require("uuid/v4");

// import the express-session module
const session = require("express-session");

// import the passport module
const passport = require("passport");

// import the passport-local module
const LocalStrategy = require("passport-local").Strategy;

// import the express-flash module
const flash = require("express-flash");

// import the mongoose module
const mongoose = require("mongoose");

// import the bcrypt module
const bcrypt = require("bcrypt");

// import the connect-mongo module
const MongoStore = require("connect-mongo")(session);

// import the method-override module
const methodOverride = require("method-override");

// import the User model
const User = require("./models/user");

// import the Comment model
const Comment = require("./models/comment");

// import the comments router
const commentsRouter = require("./routes/comments");

// import the index router
const indexRouter = require("./routes/index");

// import the users router
const usersRouter = require("./routes/users");

// import the database configuration
const dbConfig = require("./db");

// set the port
const port = 3000;

// connect to the database
mongoose.connect(dbConfig.url);

// configure passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      // if there is an error
      if (err) {
        return done(err);
      }

      // if user is not found
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // if password is incorrect
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password." });
      }

      // return the user
      return done(null, user);
    });
  })
);

// serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the user
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// configure the session
app