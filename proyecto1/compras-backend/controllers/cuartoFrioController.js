const CuartoFrio = require('../models/CuartoFrio');

// Obtener todos los cuartos fríos de una bodega
exports.getCuartosFriosByBodega = async (req, res) => {
    const codigo_bodega = req.params.codigo_bodega;
    try {
        const cuartosFrios = await CuartoFrio.findAllByBodega(codigo_bodega);
        res.json(cuartosFrios);
    } catch (err) {
        console.error('Error al obtener los cuartos fríos:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo cuarto frío
exports.createCuartoFrio = async (req, res) => {
    const { codigo_bodega, codigo_cuarto_frio, capacidad, temperatura } = req.body;
    try {
        const nuevoCuartoFrio = await CuartoFrio.create(codigo_bodega, codigo_cuarto_frio, capacidad, temperatura);
        res.status(201).json(nuevoCuartoFrio);
    } catch (err) {
        console.error('Error al crear el cuarto frío:', err);
        res.status(500).send('Error en el servidor');
    }
};
