const express = require('express');
const router = express.Router();
const historicoPrecioController = require('../controllers/historicoPrecioController');

// Obtener el histórico de precios de un producto
router.get('/:codigo_producto', historicoPrecioController.getHistoricoByProducto);

// Agregar un nuevo precio histórico
router.post('/', historicoPrecioController.createHistoricoPrecio);

module.exports = router;
