const mongoose = require('mongoose');
const config = require('config');

const { host, port, dbName } = config.get('db');

const db = () => {
  mongoose.connect(
    `mongodb://${host}:${port}`,
    { 
      dbName,
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  })
}

module.exports = db