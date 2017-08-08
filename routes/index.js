const express = require('express');
const router = express.Router();
const User = require('../models/data');
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

router.get('/', (req, res) => {
  User.find()
    .then((data) => {
      res.render('index', { users: data });
    })
});

router.get('/employed', function(req, res){
  User.find({ job: {$ne:null} })
    .then((data) => {
      res.render('index', { users: data });
    });
})

router.get('/unemployed', function(req, res){
  User.find({ job: null })
    .then((data) => {
      res.render('index', { users: data });
    });
})

router.get("/login", (req, res) => {
  res.render("login");
})


// authenticate with passport
router.post("/login", passport.authenticate("local", {
    successRedirect : "/",
    failureRedirect : "/login",
    failureFlash : true
}))

module.exports = router;
