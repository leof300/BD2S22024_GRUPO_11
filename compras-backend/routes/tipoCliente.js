const express = require('express');
const router = express.Router();
const tipoClienteController = require('../controllers/tipoClienteController');

// Obtener todos los tipos de clientes
router.get('/', tipoClienteController.getAllTiposClientes);

// Crear un nuevo tipo de cliente
router.post('/', tipoClienteController.createTipoCliente);

module.exports = router;
