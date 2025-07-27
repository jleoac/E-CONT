'use strict'

var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var app = express();


//rutas
var project_routes = require('./routes/project');
var project_routes2 = require('./routes/register');
var project_routes3 = require('./routes/news');
var project_routes4 = require('./routes/buzon');
var project_routes5 = require('./routes/admin')


//middlewares

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//rutas
app.use('/api', project_routes);
app.use('/api', project_routes2);
app.use('/api', project_routes3);
app.use('/api', project_routes4);
app.use('/api', project_routes5);

// Sirve los archivos estáticos del frontend Angular
app.use(express.static(path.join(__dirname, '../proyecto-econt/dist/proyecto-angular')));

// Para cualquier ruta que no sea API, enviar index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../proyecto-econt/dist/proyecto-angular/index.html'));
});

/*app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>Página de inicio</h1>"
    );
});

app.post('/test/:id', (req, res) => {
    console.log(req.body.nombre);
    console.log(req.query.web);
    console.log(req.params.id);

    res.status(200).send({
        
        message: "Hola mundo desde mi API de NodeJS"
        
    });
       
});*/

//exportar
module.exports = app;
