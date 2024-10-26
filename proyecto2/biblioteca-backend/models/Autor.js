const mongoose = require('mongoose');

const autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    nacionalidad: {
        type: String,
        required: true,
    },
}, { collection: 'autores' });

module.exports = mongoose.model('Autor', autorSchema);
