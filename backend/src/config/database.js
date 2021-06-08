const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: 'config.env' });
const url = process.env.URL;
mongoose.connect(url, { useNewUrlParser: true , useUnifiedTopology: true });

module.exports = mongoose;