const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });
const url = process.env.URL;
console.log(url)

mongoose.connect(url, { useNewUrlParser: true });

module.exports = mongoose;