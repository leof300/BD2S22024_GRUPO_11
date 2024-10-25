const TipoCliente = require('../models/TipoCliente');

// Obtener todos los tipos de clientes
exports.getAllTiposClientes = async (req, res) => {
    try {
        const tiposClientes = await TipoCliente.findAll();
        res.json(tiposClientes);
    } catch (err) {
        console.error('Error al obtener los tipos de clientes:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo tipo de cliente
exports.createTipoCliente = async (req, res) => {
    const { tipo, descuento, volumen_producto } = req.body;
    try {
        const nuevoTipoCliente = await TipoCliente.create(tipo, descuento, volumen_producto);
        res.status(201).json(nuevoTipoCliente);
    } catch (err) {
        console.error('Error al crear el tipo de cliente:', err);
        res.status(500).send('Error en el servidor');
    }
};
