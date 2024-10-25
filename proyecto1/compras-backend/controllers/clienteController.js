const Cliente = require('../models/Cliente');

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (err) {
        console.error('Error al obtener los clientes:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    const { codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento } = req.body;
    try {
        const nuevoCliente = await Cliente.create(codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento);
        res.status(201).json(nuevoCliente);
    } catch (err) {
        console.error('Error al crear el cliente:', err);
        res.status(500).send('Error en el servidor');
    }
};
