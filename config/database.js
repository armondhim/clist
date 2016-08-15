var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.mongo.url, function(err) {
    if(!err) {
        console.log("successfully connected to database")
    } else {
        console.dir(err);
    }
});