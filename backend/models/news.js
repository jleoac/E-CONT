'use strict'

var mongoose = require('mongoose');

/*const db2 = mongoose.createConnection('mongodb://localhost:27017/base_de_datos_2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

var NewsSchema = new mongoose.Schema({
    date: String,
    topic: String,
    description: String,
    source: String,
    author: String,
    link: String,
    image: String
});

var News = mongoose.model('News', NewsSchema);

module.exports = News;

//module.exports = db2.model('Project', ProjectSchema);

//projects --> guarda los documentos en la colección