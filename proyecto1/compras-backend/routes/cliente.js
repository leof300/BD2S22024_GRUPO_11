const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Obtener todos los clientes
router.get('/', clienteController.getAllClientes);

// Crear un nuevo cliente
router.post('/', clienteController.createCliente);

module.exports = router;
