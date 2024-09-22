const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');  // Importar el middleware cors

// Middleware para permitir solicitudes CORS
app.use(cors());  // Habilitar CORS para todas las rutas y dominios

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json()); // Esto es esencial para procesar JSON

// Importar las rutas
const indexRouter = require('./routes/index');
const bodegaRouter = require('./routes/bodega');
const cuartoFrioRouter = require('./routes/cuartoFrio');
const productoRouter = require('./routes/producto');
const historicoPrecioRouter = require('./routes/historicoPrecio');
const tipoClienteRouter = require('./routes/tipoCliente');
const pedidoDetalleRouter = require('./routes/pedidoDetalle');
const clienteRouter = require('./routes/cliente');

// Usar las rutas
app.use('/', indexRouter);
app.use('/bodega', bodegaRouter);
app.use('/cuartofrio', cuartoFrioRouter);
app.use('/producto', productoRouter);
app.use('/historicoprecio', historicoPrecioRouter);
app.use('/tipocliente', tipoClienteRouter);
app.use('/pedidodetalle', pedidoDetalleRouter);
app.use('/cliente', clienteRouter);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
