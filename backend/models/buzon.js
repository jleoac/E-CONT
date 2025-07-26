'use strict'

var mongoose = require('mongoose');

/*const db2 = mongoose.createConnection('mongodb://localhost:27017/base_de_datos_2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

var BuzonSchema = new mongoose.Schema({
    name: String,
    mail: String,
    fone: String,
    mensaje: String,
    fecha_mensaje: { type: Date }
});

var Buzon = mongoose.model('Buzon', BuzonSchema);

module.exports = Buzon;