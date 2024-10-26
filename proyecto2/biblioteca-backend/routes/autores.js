const express = require('express');
const router = express.Router();
const Autor = require('../models/Autor');

// Obtener lista de autores
router.get('/', async (req, res) => {

    try {
        const autores = await Autor.find();
        //console.log(autores);
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener autores' });
    }
});


// Ruta para crear un nuevo autor
router.post('/', async (req, res) => {
    try {
        const nuevoAutor = new Autor(req.body);
        const autorGuardado = await nuevoAutor.save();
        res.status(201).json(autorGuardado); // Respuesta exitosa
    } catch (error) {
        console.error('Error al crear autor:', error);
        res.status(500).json({ error: 'Error al crear autor' });
    }
});

// Obtener un autor por ID
router.get('/:id', async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        if (autor) res.json(autor);
        else res.status(404).json({ error: 'Autor no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener autor' });
    }
});

// Editar un autor por ID
router.put('/:id', async (req, res) => {
    try {
        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (autorActualizado) res.json(autorActualizado);
        else res.status(404).json({ error: 'Autor no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar autor' });
    }
});

// Eliminar un autor por ID
router.delete('/:id', async (req, res) => {
    try {
        const autorEliminado = await Autor.findByIdAndDelete(req.params.id);
        if (autorEliminado) res.json({ mensaje: 'Autor eliminado', autor: autorEliminado });
        else res.status(404).json({ error: 'Autor no encontrado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar autor' });
    }
});

module.exports = router;