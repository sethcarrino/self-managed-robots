const mongoose = require("mongoose")
mongoose.Promise = require('bluebird');

// connect mongoose to mongo

const MONGO_DB = "robots"
const MONGO_URL = `mongodb://localhost:27017/${MONGO_DB}`

mongoose.connect(MONGO_URL, { useMongoClient: true });

mongoose.connection.on("error", function handleDBErrors(err) {
  console.error("DB Error", err)
  process.exit(128)
})
