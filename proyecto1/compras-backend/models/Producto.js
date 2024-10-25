const cassandraClient = require('../config/cassandra');

class Producto {
    constructor(codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega) {
        this.codigo_producto = codigo_producto;
        this.nombre_producto = nombre_producto;
        this.marca = marca;
        this.fabricante = fabricante;
        this.precio = precio;
        this.codigo_bodega = codigo_bodega;
    }

    static async findAll() {
        const query = 'SELECT * FROM Producto';
        try {
            const result = await cassandraClient.execute(query);
            return result.rows.map(row => new Producto(row.codigo_producto, row.nombre_producto, row.marca, row.fabricante, row.precio, row.codigo_bodega));
        } catch (err) {
            throw new Error('Error al obtener los productos:', err);
        }
    }

    static async create(codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega) {
        const query = 'INSERT INTO Producto (codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega) VALUES (?, ?, ?, ?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega], { prepare: true });
            return new Producto(codigo_producto, nombre_producto, marca, fabricante, precio, codigo_bodega);
        } catch (err) {
            throw new Error('Error al crear el producto:', err);
        }
    }
}

module.exports = Producto;
