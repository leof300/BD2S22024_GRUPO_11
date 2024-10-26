const express = require('express');
const router = express.Router();
const Libro = require('../models/Libro');
const Autor = require('../models/Libro');


// Obtener lista de libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libros' });
    }
});

// Ruta para crear un nuevo libro
router.post('/', async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        const libroGuardado = await nuevoLibro.save();
        res.status(201).json(libroGuardado); // Respuesta exitosa
    } catch (error) {
        console.error('Error al crear libro:', error);
        res.status(500).json({ error: 'Error al crear libro' });
    }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (libro) {
            res.json(libro);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libro' });
    }
});

// Editar un libro por ID
router.put('/:id', async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (libroActualizado) {
            res.json(libroActualizado);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar libro' });
    }
});

// Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        if (libroEliminado) {
            res.json({ mensaje: 'Libro eliminado con éxito', libro: libroEliminado });
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar libro' });
    }
});

// Ruta para obtener la cantidad de libros por autor (sin agregación)
router.get('/filtro/xautor', async (req, res) => {
    try {
        const cantidadPorAutor = await Libro.aggregate([
            {
                $group: {
                    _id: "$autor_id", // Agrupa por autor_id
                    cantidad: { $sum: 1 } // Cuenta cada libro
                }
            },
            {
                $lookup: {
                    from: "autores", // Nombre de la colección de autores
                    localField: "_id", // Campo en el grupo
                    foreignField: "_id", // Campo en autores que coincide con el autor_id
                    as: "autor_info"
                }
            },
            {
                $unwind: "$autor_info" // Desenreda el array de autor_info para un solo objeto
            },
            {
                $project: {
                    _id: 0,
                    autor: {
                        nombre: "$autor_info.nombre",
                        apellido: "$autor_info.apellido"
                    },
                    cantidad: 1
                }
            }
        ]);

        res.json(cantidadPorAutor);
    } catch (error) {
        console.error('Error al obtener la cantidad de libros por autor:', error);
        res.status(500).json({ error: 'Error al obtener la cantidad de libros por autor' });
    }
});

module.exports = router;