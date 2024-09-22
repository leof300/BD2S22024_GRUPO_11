const express = require('express');
const router = express.Router();
const cuartoFrioController = require('../controllers/cuartoFrioController');

// Obtener todos los cuartos fríos de una bodega
router.get('/:codigo_bodega', cuartoFrioController.getCuartosFriosByBodega);

// Crear un nuevo cuarto frío
router.post('/', cuartoFrioController.createCuartoFrio);

module.exports = router;
