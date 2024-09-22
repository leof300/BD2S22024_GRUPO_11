const express = require('express');
const router = express.Router();
const pedidoDetalleController = require('../controllers/pedidoDetalleController');

// Obtener los detalles de un pedido
router.get('/', pedidoDetalleController.getAllPedido);

// Obtener los detalles de un pedido
router.get('/:codigo_pedido', pedidoDetalleController.getDetallesByPedido);

// Crear un nuevo detalle de pedido
router.post('/', pedidoDetalleController.createPedidoDetalle);

module.exports = router;
