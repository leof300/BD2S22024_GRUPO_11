const Bodega = require('../models/Bodega');

// Obtener todas las bodegas
exports.getAllBodegas = async (req, res) => {
    try {
        const bodegas = await Bodega.findAll();
        res.json(bodegas);
    } catch (err) {
        console.error('Error al obtener las bodegas:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear una nueva bodega
exports.createBodega = async (req, res) => {
    const { codigo_bodega, capacidad, cuartos_frios } = req.body;
    try {
        const nuevaBodega = await Bodega.create(codigo_bodega, capacidad, cuartos_frios);
        res.status(201).json(nuevaBodega);
    } catch (err) {
        console.error('Error al crear la bodega:', err);
        res.status(500).send('Error en el servidor');
    }
};
