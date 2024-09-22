const PedidoDetalle = require('../models/PedidoDetalle');

// Obtener detalles de un pedido
exports.getDetallesByPedido = async (req, res) => {
    const codigo_pedido = req.params.codigo_pedido;
    try {
        const detallesPedido = await PedidoDetalle.findAllByPedido(codigo_pedido);
        res.json(detallesPedido);
    } catch (err) {
        console.error('Error al obtener los detalles del pedido:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo detalle de pedido
exports.createPedidoDetalle = async (req, res) => {
    const { codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra } = req.body;
    try {
        const nuevoDetalle = await PedidoDetalle.create(codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra);
        res.status(201).json(nuevoDetalle);
    } catch (err) {
        console.error('Error al crear el detalle del pedido:', err);
        res.status(500).send('Error en el servidor');
    }
};

exports.getAllPedido = async (req, res) => {
    const codigo_pedido = req.params.codigo_pedido;
    try {
        const detallesPedido = await PedidoDetalle.findAll();
        res.json(detallesPedido);
    } catch (err) {
        console.error('Error al obtener los detalles del pedido:', err);
        res.status(500).send('Error en el servidor');
    }
};