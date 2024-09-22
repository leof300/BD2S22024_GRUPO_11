const express = require('express');
const router = express.Router();

// Definir la ruta para '/'
router.get('/', (req, res) => {
    res.send('Hola Mundo desde Express');
});

module.exports = router;
