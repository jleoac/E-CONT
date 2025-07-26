'use strict'

var mongoose = require('mongoose');

/*const db2 = mongoose.createConnection('mongodb://localhost:27017/base_de_datos_2', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});*/

var RegisterSchema = new mongoose.Schema({
    topic: String,
    start_date: { type: Date },
    end_date: { type: Date },
    description: String,
    coach: String,
    name: String,
    cedula: String,
    birthdate: { type: Date },
    mail: String,
    fone: String,
    image: String,
    fecha_inscripcion: { type: Date }
});

var Register = mongoose.model('Register', RegisterSchema);

module.exports = Register;

//module.exports = db2.model('Project', ProjectSchema);

//projects --> guarda los documentos en la colección