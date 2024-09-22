const Producto = require('../models/Producto');

// Obtener todos los productos
exports.getAllProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.json(productos);
    } catch (err) {
        console.error('Error al obtener los productos:', err);
        res.status(500).send('Error en el servidor');
    }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
    const { codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega } = req.body;
    try {
        const nuevoProducto = await Producto.create(codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega);
        res.status(201).json(nuevoProducto);
    } catch (err) {
        console.error('Error al crear el producto:', err);
        res.status(500).send('Error en el servidor');
    }
};
