const HistoricoPrecio = require('../models/HistoricoPrecio');

// Obtener el histórico de precios de un producto
exports.getHistoricoByProducto = async (req, res) => {
    const codigo_producto = req.params.codigo_producto;
    try {
        const historicoPrecios = await HistoricoPrecio.findAllByProducto(codigo_producto);
        res.json(historicoPrecios);
    } catch (err) {
        console.error('Error al obtener el histórico de precios:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Agregar un nuevo precio histórico
exports.createHistoricoPrecio = async (req, res) => {
    const { codigo_producto, precio_historico, fecha } = req.body;
    try {
        const nuevoHistoricoPrecio = await HistoricoPrecio.create(codigo_producto, precio_historico, fecha);
        res.status(201).json(nuevoHistoricoPrecio);
    } catch (err) {
        console.error('Error al crear el histórico de precios:', err);
        res.status(500).send('Error en el servidor');
    }
};
