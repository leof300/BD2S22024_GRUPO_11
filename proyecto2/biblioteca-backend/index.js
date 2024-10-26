const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error de conexión:', err));

// Importa y usa las rutas
const routes = require('./routes');

// Importa las rutas separadas
const autoresRoutes = require('./routes/autores');
const librosRoutes = require('./routes/libros');
const usuariosRoutes = require('./routes/usuarios');


app.use('/api', routes);

// Usa las rutas con prefijos
app.use('/api/autores', autoresRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

// Ruta básica de ejemplo
app.get('/', (req, res) => {
    res.send('¡Servidor en funcionamiento!');
});