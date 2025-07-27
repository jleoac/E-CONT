'use strict';

require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT;

if (!port) {
  console.error("❌ No se ha definido el puerto desde process.env.PORT");
  process.exit(1);
}


mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    console.error("❌ Error: La variable MONGODB_URI no está definida. Revisa tu archivo .env o configuración de Railway.");
    process.exit(1); // detiene la app
}

mongoose.connect(mongoUri)
    .then(() => {
        console.log("✅ Conexión exitosa a la base de datos de Econt...");

        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo correctamente en el puerto: ${port}`);
        });
    })
    .catch(err => {
        console.error("❌ Error al conectar a MongoDB:", err);
    });

app.get('/favicon.ico', (req, res) => res.status(204));
