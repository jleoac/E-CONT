'use strict'

const { urlencoded } = require('body-parser')
var Buzon = require('../models/buzon');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy el buzon'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el método de acción portafolio del controlador de buzon'
        });
    },

    saveBuzon: function(req, res){
        var newBuzon = new Buzon();
        var params = req.body;

            newBuzon.name = params.name;
            newBuzon.mail = params.mail;
            newBuzon.fone = params.fone;
            newBuzon.mensaje = params.mensaje;
            newBuzon.fecha_mensaje = new Date();
            
            newBuzon.save((err, mensajeStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar mensaje'});

            if(!mensajeStored) return res.status(404).send({message: 'No se ha podido guardar el mensaje'});

            return res.status(200).send({newBuzon: mensajeStored});   
        });
    },

    getBuzon: function(req, res){
        var mensajeId = req.params.id;

        if(mensajeId == null) return res.status(404).send({message: 'El proyecto no existe.'});

        Buzon.findById(mensajeId, (err, newBuzon) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!newBuzon) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({newBuzon})
        });
    },
//Ojo aquí puse mensajes:
    getBuzons: function(req, res){
        Buzon.find({}).sort({fecha_mensaje: -1}).exec((err, buzon) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!buzon) return res.status(404).send({message: 'No existen proyectos.'});
            return res.status(200).send({buzon});
        });
    },

    updateBuzon: function(req, res){
        var buzonId = req.params.id;
        var update = req.body;

        Buzon.findByIdAndUpdate(buzonId, update, {new: true}, (err, buzonUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

            if(!buzonUpdated) return res.status(404).send({message: 'El proyecto para actualizar no existe.'});

            return res.status(200).send({newBuzon: buzonUpdated});
        });

    },

    deleteBuzon: function(req, res){
        var buzonId = req.params.id;

        Buzon.findByIdAndRemove(buzonId, (err, buzonRemoved) =>{
            if(err) return res.status(500).send({message: 'Error al borrar los datos'});

            if(!buzonRemoved) return res.status(404).send({message: 'El mensaje a eliminar no existe.'});

            return res.status(200).send({newBuzon: buzonRemoved, message: 'El mensaje ha sido borrado'});
        });
    },

};

module.exports = controller;