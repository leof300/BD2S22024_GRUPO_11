const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    fecha_registro: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Usuario', usuarioSchema);
