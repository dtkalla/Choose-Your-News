const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { loginUser, restoreUser } = require('../../config/passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { isProduction } = require('../../config/keys');

// Attach restoreUser as a middleware before the route handler to gain access
// to req.user. (restoreUser will NOT return an error response if there is no
// current user.)
router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();
    res.cookie("CSRF-TOKEN", csrfToken);
  }
  if (!req.user) return res.json(null);
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email
  });
})

// Attach validateRegisterInput as a middleware before the route handler
router.post('/register', validateRegisterInput, async (req, res, next) => {
  // Check to make sure nobody has already registered with a duplicate email or
  // username
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });    
  
  if (user) {
    // Throw a 400 error if the email address or username already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        // Generate the JWT
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});

// Attach validateLoginInput as a middleware before the route handler
router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function(err, user) {
    if (err) return next(err);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" };
      return next(err);
    }
    // Generate the JWT
    return res.json(await loginUser(user));
  })(req, res, next);
});

module.exports = router;