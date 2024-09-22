const express = require('express');
const router = express.Router();
const bodegaController = require('../controllers/bodegaController');

// Obtener todas las bodegas
router.get('/', bodegaController.getAllBodegas);

// Crear una nueva bodega
router.post('/', bodegaController.createBodega);

module.exports = router;
