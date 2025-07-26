'use strict'

const { urlencoded } = require('body-parser')
var Register = require('../models/register');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy la home'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el método de acción portafolio del controlador de project'
        });
    },

    saveRegister: function(req, res){
        var newRegister = new Register();
        var params = req.body;

            newRegister.topic = params.topic;
            newRegister.start_date = params.start_date;
            newRegister.end_date = params.end_date;
            newRegister.description = params.description;
            newRegister.coach = params.coach;
            newRegister.name = params.name;
            newRegister.cedula = params.cedula;
            newRegister.birthdate = params.birthdate;
            newRegister.mail = params.mail;
            newRegister.fone = params.fone;
            newRegister.image = params.image;
            newRegister.fecha_inscripcion = new Date();
            
            newRegister.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar documento'});

            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({newRegister: projectStored});   
        });
    },

    getRegister: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});

        Register.findById(projectId, (err, newRegister) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!newRegister) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({newRegister})
        });
    },
//Ojo aquí puse register en ves de projects:
    getRegisters: function(req, res){
        Register.find({}).sort({fecha_inscripcion: -1}).exec((err, register) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!register) return res.status(404).send({message: 'No existen proyectos.'});
            return res.status(200).send({register});
        });
    },

    updateRegister: function(req, res){
        var registerId = req.params.id;
        var update = req.body;

        Register.findByIdAndUpdate(registerId, update, {new: true}, (err, registerUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

            if(!registerUpdated) return res.status(404).send({message: 'El proyecto para actualizar no existe.'});

            return res.status(200).send({newRegister: registerUpdated});
        });

    },

    deleteRegister: function(req, res){
        var registerId = req.params.id;

        Register.findByIdAndRemove(registerId, (err, registerRemoved) =>{
            if(err) return res.status(500).send({message: 'Error al borrar los datos'});

            if(!registerRemoved) return res.status(404).send({message: 'El mensaje a eliminar no existe.'});

            return res.status(200).send({newRegister: registerRemoved, message: 'El mensaje ha sido borrado'});
        });
    },

    uploadImage: function(req, res){
        var projectId = req.params.id;

        var fileName = 'Imágen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1]; 
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                Project.findByIdAndUpdate(projectId, {image: fileName}, {new: true}, (err, projectUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido...'});
    
                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imágen...'});
    
                    return res.status(200).send({
                        newProject: projectUpdated
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({message: 'La extensión no es válida'});
                });
            }
            
        } else{
            return res.status(200).send({
                message: fileName
            });
        }
    },

    getImageFile: function (req, res) {
            var file = req.params.image;
            var path_file = "./uploads/" + file;
    
            if (fs.existsSync(path_file)) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({ message: "No existe la imagen..." });
            }
    
    
    }

};

module.exports = controller;