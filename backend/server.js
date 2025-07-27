//Servidor para usuario y clave de econt:
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Sirve los archivos estáticos del frontend Angular
app.use(express.static(path.join(__dirname, '../proyecto-econt/dist/proyecto-angular')));

// Ruta fallback para Angular (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../proyecto-econt/dist/proyecto-angular/index.html'));
});

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
