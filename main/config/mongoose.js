const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0/code_dev');

const db = mongoose.connection;

db.on('error', console.error.bind("erro connecting to mongo db"));

db.once('open', function () {
    console.log('******************', "connected to mongodb database");
});

module.exports = db;
