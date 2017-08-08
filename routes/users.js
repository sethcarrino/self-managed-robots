const express = require('express');
const router = express.Router();
const User = require('../models/data');
const passport = require("passport");

router.get("/form", (req, res) => {
  User.find()
  .then((data) => {
    res.render("form", { users : data });
  })
});

router.post("/newRobot", (req, res) => {
  console.log(req.body);
  new User(req.body).save()
    .then((newUser) => {
      res.redirect(`/users/${newUser._id}`);
    })
    .catch(() => {
    })
})

router.get('/:id', function(req, res){
  User.findOne({ _id : req.params.id })
  .then((data) => {
    data.mongoid = req.params.id
    res.render('profile', data);
  });
})

router.get("/:id/update", (req, res) => {
  User.find({ _id : req.params.id })
    .then((data) => {
      res.render("update", { users : data });
    })
})

router.post("/:id/update", (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate({ _id : req.params.id }, {
    company: req.body.company
  }) .then(() => {
    res.redirect(".")
  }).catch((err) => {
    res.send("Error.")
  })
})

module.exports = router;
