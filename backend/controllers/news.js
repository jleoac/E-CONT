'use strict'

const { urlencoded } = require('body-parser')
var News = require('../models/news');
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
            message: 'Soy el método de acción portafolio del controlador de noticias carrusel'
        });
    },

    saveNews: function(req, res){
        var newNews = new News();
        var params = req.body;

            newNews.date = params.date;
            newNews.topic = params.topic;
            newNews.description = params.description;
            newNews.source = params.source;
            newNews.author = params.author;
            newNews.link = params.link;
            newNews.image = params.image;
            
        newNews.save((err, newsStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar documento'});

            if(!newsStored) return res.status(404).send({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({newNews: newsStored});   
        });
    },

    getNews: function(req, res){
        var newsId = req.params.id;

        if(newsId == null) return res.status(404).send({message: 'El proyecto no existe.'});

        News.findById(newsId, (err, newNews) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!newNews) return res.status(404).send({message: 'El proyecto no existe.'});

            return res.status(200).send({newNews})
        });
    },
//Ojo aquí puse News en ves de newss:
    getNewss: function(req, res){
        News.find({}).sort('-date').exec((err, news) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!news) return res.status(404).send({message: 'No existen proyectos.'});
            return res.status(200).send({news});
        });
    },

    updateNews: function(req, res){
        var newsId = req.params.id;
        var update = req.body;

        News.findByIdAndUpdate(newsId, update, {new: true}, (err, newsUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

            if(!newsUpdated) return res.status(404).send({message: 'El proyecto para actualizar no existe.'});

            return res.status(200).send({newNews: newsUpdated});
        });

    },

    deleteNews: function(req, res){
        var newsId = req.params.id;

        News.findByIdAndRemove(newsId, (err, newsRemoved) =>{
            if(err) return res.status(500).send({message: 'Error al borrar los datos'});

            if(!newsRemoved) return res.status(404).send({message: 'La noticia a eliminar no existe.'});

            return res.status(200).send({newNews: newsRemoved, message: 'La noticia ha sido borrado'});
        });
    },

    uploadImage_1: function(req, res){
        var newsId = req.params.id;
        console.log("ID recibido:", req.params.id);
        console.log("Archivos recibidos:", req.files);
        var fileName = 'Imágen no subida...';

        if(req.files){
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[fileSplit.length - 1]; 
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[extSplit.length - 1].toLowerCase();

            if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                News.findByIdAndUpdate(newsId, {image: fileName}, {new: true}, (err, newsUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido...'});
    
                    if(!newsUpdated) return res.status(404).send({message: 'El proyecto no existe y no se ha asignado la imágen...'});
    
                    return res.status(200).send({
                        newNews: newsUpdated
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