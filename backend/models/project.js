'use strict'

var mongoose = require('mongoose');


var ProjectSchema = new mongoose.Schema({
    topic: String,
    description: String,
    start_date: String,
    end_date: String,
    coach: String,
    image: String
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;

//projects --> guarda los documentos en la colección