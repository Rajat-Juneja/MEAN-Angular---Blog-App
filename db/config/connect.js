const mongoose = require('mongoose');
const config = require('./config');
mongoose.connect(config.url);
console.log("CONNECTED");
module.exports = mongoose;
