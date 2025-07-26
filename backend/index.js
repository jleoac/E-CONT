'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://0.0.0.0:27017')
        .then(() =>{
            console.log("Conexión exitosa a la base de datos de Econt...");

            //creación del servidor
            app.listen(port, () => {
                console.log("Servidor corriendo correctamente en la url: localhost:3700");
            });

        })
        .catch(err => console.log(err));