const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

var uri = ProcessingInstruction.env.MONGODB_URI || 'mongodb://localhost/my-blog';
mongoose.connect(uri)
mongoose.Promise = Promise;

// set db to the default connection
var db = mongoose.connection;

// bind the connection to error event to get notification
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.use(bodyParser.json());
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

app.get('/', (req, res) => {
    res.status(200).send();

});

module.exports = app;
