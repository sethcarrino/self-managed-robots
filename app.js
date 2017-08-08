const express = require("express")
const mustacheExpress = require("mustache-express")
const path = require("path")
const data = require("./models/data")
const app = express()
const indexRoute = require("./routes/index");
const passport = require("passport");
const userRoute = require("./routes/users");
const bodyParser = require("body-parser");


// setup mustache template engine
app.engine("mustache", mustacheExpress())
app.set("views", "./views")
app.set("view engine", "mustache")

// set port to add to app.listen
app.set("port", 3000)

// middleware to parse data
app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, "public")))

// setup passport
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoute)
app.use("/users", userRoute);


// setup listning and conenction route
require("./mongooseConnect")

app.listen(app.get("port"), err => {
  if (err) {
    throw err
    exit(1)
  }
  console.log(
    `Successfully running application`
  )
})
