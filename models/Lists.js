var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String
});

mongoose.model('List', ListSchema);