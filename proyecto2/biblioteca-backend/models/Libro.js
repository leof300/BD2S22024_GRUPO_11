const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor', // Referencia Autor
        required: true,
    },
    anio_publicacion: {
        type: Number,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    disponibilidad: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Libro', libroSchema);
