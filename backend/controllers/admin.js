'use strict'

const { urlencoded } = require('body-parser')
var Admin = require('../models/admin');
const bcrypt = require('bcrypt');
var fs = require('fs');
var path = require('path');

var controller = {
    home: function(req, res){
        return res.status(200).send({
            message: 'Soy el login'
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message: 'Soy el método de acción portafolio del controlador del login'
        });
    },

    saveAdmin: async function(req, res){
    const params = req.body;

    try {
        // Verifica que lleguen datos
        if (!params.email || !params.password) {
            return res.status(400).send({ message: 'Faltan campos obligatorios' });
        }

        // Verifica si ya existe el email
        const existingUser = await Admin.findOne({ email: params.email });
        if (existingUser) {
            return res.status(409).send({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(params.password, 10);

        const newAdmin = new Admin({
            email: params.email,
            password: hashedPassword,
            image: params.image,
            fecha_usuario: new Date()
        });

        const usuarioStored = await newAdmin.save();
        return res.status(200).send({ newAdmin: usuarioStored });

        } catch (err) {
            return res.status(500).send({ message: 'Error al guardar usuario', error: err });
        }
    },

    getAdmin: function(req, res){
        var usuarioId = req.params.id;

        if(usuarioId == null) return res.status(404).send({message: 'El usuario no existe.'});

        Admin.findById(usuarioId, (err, newAdmin) => {
            
            if(err) return res.status(500).send({message: 'Error al devolver los datos.'});
            
            if(!newAdmin) return res.status(404).send({message: 'El usuario no existe.'});

            return res.status(200).send({newAdmin})
        });
    },
    
    //Ojo aquí puse mensajes:
    getAdmins: function(req, res){
        Admin.find({}).sort({fecha_usuario: -1}).exec((err, admin) =>{
            if(err) return res.status(500).send({message: 'Error al devolver los datos'});
            if(!admin) return res.status(404).send({message: 'No existen usuarios.'});
            return res.status(200).send({admin});
        });
    },

    updateAdmin: function(req, res){
        var adminId = req.params.id;
        var update = req.body;

        Admin.findByIdAndUpdate(adminId, update, {new: true}, (err, adminUpdated) =>{
            if(err) return res.status(500).send({message: 'Error al actualizar los datos'});

            if(!adminUpdated) return res.status(404).send({message: 'El usuario a actualizar no existe.'});

            return res.status(200).send({newAdmin: adminUpdated});
        });

    },

    deleteAdmin: function(req, res){
        var adminId = req.params.id;

        Admin.findByIdAndRemove(adminId, (err, adminRemoved) =>{
            if(err) return res.status(500).send({message: 'Error al borrar los datos'});

            if(!adminRemoved) return res.status(404).send({message: 'El usuario a eliminar no existe.'});

            return res.status(200).send({newAdmin: adminRemoved, message: 'El usuario ha sido borrado'});
        });
    },

    uploadImage: function(req, res){
        var adminId = req.params.id;
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
                Admin.findByIdAndUpdate(adminId, {image: fileName}, {new: true}, (err, adminUpdated) => {
                    if(err) return res.status(500).send({message: 'La imagen no se ha subido...'});
    
                    if(!adminUpdated) return res.status(404).send({message: 'El usuario no existe y no se ha asignado la imágen...'});
    
                    return res.status(200).send({
                        newAdmin: adminUpdated
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
        
        
    },

    //Método de login
    login: async function(req, res){
        const { email, password } = req.body;

        try {
            const user = await Admin.findOne({ email });

            if (!user) {
                return res.status(401).send({ message: 'Usuario no encontrado' });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                return res.status(401).send({ message: 'Contraseña incorrecta' });
            }

            return res.status(200).send({ message: 'Login exitoso', user});

        } catch (err) {
            return res.status(500).send({ message: 'Error en el servidor', error: err });
        }
    },

    //Método para tomar la imagen del usuario por su correo
    getAdminByEmail: async function(req, res) {
    try {
        const email = req.params.email;

        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).send({ message: 'Administrador no encontrado' });
        }

        return res.status(200).send({ admin });

    } catch (error) {
        return res.status(500).send({ message: 'Error del servidor', error });
    }
}

};

module.exports = controller;
