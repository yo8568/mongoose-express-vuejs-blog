var mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://localhost:27017/kennyblog');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database Connected.");
});
