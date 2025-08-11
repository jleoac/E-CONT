/*Todo el backend sirve para crear una conexión a una base de datos en el servidor, en este caso servidor local (mi propia computadora),
utilizando para ello la herramienta MongoDBCompass, corre escribiendo la siguiente instrucción en el símbolo del sistema:
D:
cd "Leonardo A"
cd "PROYECTO_WEB_ECONT"
cd "backend"
npm start

Nota: puede funcionar sin internet*/

'use strict'

const cloudinary = require('../cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'temp/' }); // carpeta temporal

const { urlencoded } = require('body-parser');
var Project = require('../models/project');
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
            message: 'Soy el método de acción test del controlador de project'
        });
    },

    saveProject: function(req, res){
        var newProject = new Project();
        var params = req.body;

            newProject.topic = params.topic;
            newProject.description = params.description;
            newProject.start_date = params.start_date;
            newProject.end_date = params.end_date;
            newProject.coach = params.coach;
            newProject.image = params.image;

    
       newProject.save((err, projectStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar documento'});

            if(!projectStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});
    
            return res.status(200).send({newProject: projectStored});   
        })
        
    },

    getProject: function(req, res){
        var projectId = req.params.id;

        if(projectId == null) return res.status(404).send({message: 'El proyecto no existe.'});

        Project.findById(projectId, (err, newProject) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!newProject) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({newProject})
        });
    },

    getProjects: function(req, res){
        Project.find({}).sort('-date').exec((err, projects) =>{

            if(err) return res.status(500).send({message: 'Error al devolver los datos'});

            if(!projects) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({projects});

        });
    },

    updateProject: function(req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

            if(!projectUpdated) return res.status(404).send({message: 'El proyecto para actualizar no existe.'});

            return res.status(200).send({newProject: projectUpdated});
        });

    },

    deleteProject: function(req, res){
        var projectId = req.params.id;

        Project.findByIdAndRemove(projectId, (err, projectRemoved) =>{
            if(err) return res.status(500).send({message: 'Error al borrar los datos'});

            if(!projectRemoved) return res.status(404).send({message: 'El proyecto a eliminar no existe.'});

            return res.status(200).send({newProject: projectRemoved, message: 'El proyecto ha sido borrado'});
        });
    },

    uploadImage: async function (req, res) {
        var projectId = req.params.id;

        if (!req.file) {
            return res.status(400).send({ message: 'No se envió ninguna imagen' });
        }

        try {
            // Subir imagen a Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'capacitaciones'
            });

            // Guardar URL de Cloudinary en MongoDB
            const projectUpdated = await Project.findByIdAndUpdate(
                projectId,
                { image: result.secure_url },
                { new: true }
            );

            if (!projectUpdated) {
                return res.status(404).send({ message: 'El proyecto no existe' });
            }

            return res.status(200).send({ newProject: projectUpdated });
        } catch (err) {
            return res.status(500).send({ message: 'Error al subir imagen', error: err });
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