const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = mongoose.model('User');
const Group = mongoose.model('Group');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

const { loginUser, restoreUser, requireUser } = require('../../config/passport');
const { isProduction } = require('../../config/keys');
const { fetchArticlesFromNewYorkTimes } = require('../../config/api');


router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate('local', async function (err, user) {
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


//CREATE A USER
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

        const noGroup = new Group({
          user: user._id,
          figures: [],
          name: "No group"
        });

        await noGroup.save();

        // Generate the JWT
        return res.json(await loginUser(user));
      }
      catch(err) {
        next(err);
      }
    })
  });
});


// Attach restoreUser as a middleware before the route handler to gain access
// to req.user. (restoreUser will NOT return an error response if there is no
// current user.)

//READ CURRENT USER
router.get('/current', restoreUser, async (req, res) => {
  if (!isProduction) {
    // In development, allow React server to gain access to the CSRF token
    // whenever the current user information is first loaded into the
    // React application
    const csrfToken = req.csrfToken();

    res.cookie("CSRF-TOKEN", csrfToken);
  }

  if (!req.user) {
    return res.json(null);
  }

  try {
    const user = req.user;

    const groups = await Group.find({ user: user._id }).populate("figures");

    const figures = [];
    groups.forEach(group => {
      for (let i = 0; i < group.figures.length; i++) {
        figures.push(group.figures[i]);
      }
    });

    const searchTerms = figures.map(figure => `"${figure.name}"`);

    const obj = {
      _id: user._id,
      username: user.username,
      email: user.email,
      groups: groups,
      articles: searchTerms.length === 0 ? [] :
        await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "))
    };

    return res.json(obj);
  }
  catch (err) {
    return res.json(null);
  }
})


//ONLY FOR TESTING
router.get('/', async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  }
  catch (err) {
    return res.json([]);
  }
})

//ONLY FOR TESTING
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    const groups = await Group.find({ user: user._id }).populate("figures");

    const figures = [];
    groups.forEach(group => {
      for (let i = 0; i < group.figures.length; i++) {
        figures.push(group.figures[i]);
      }
    });

    const searchTerms = figures.map(figure => `"${figure.name}"`);

    const obj = {
      _id: user._id,
      username: user.username,
      email: user.email,
      groups: groups,
      articles: searchTerms.length === 0 ? [] : 
        await fetchArticlesFromNewYorkTimes(searchTerms.join(" OR "))
    };

    return res.json(obj);
  } 
  catch (err) {
    return res.json(null);
  }
})

module.exports = router;