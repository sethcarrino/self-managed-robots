const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

let userSchema = mongoose.Schema({
  address: {
    city: String,
    country: String
  },
  avatar: String,
  company: String,
  email: String,
  id: Number,
  job: String,
  name: String,
  phone: String,
  skills: [String],
  university: String,
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
}
});

userSchema.virtual("password")
  .get(function() {
      return null
      console.log("This is the get.");
  })
  .set(function(value) {
      const hash = bcrypt.hashSync(value, 8);
      this.passwordHash = hash;
      console.log("This is the set.");
  })

  userSchema.methods.authenticate = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.statics.authenticate = function(username, password, done) {
    this.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            done(err, false)
        } else if (user && user.authenticate(password)) {
            done(null, user)
        } else {
            done(null, false)
        }
    })
};

module.exports = mongoose.model("User", userSchema, "profiles");
