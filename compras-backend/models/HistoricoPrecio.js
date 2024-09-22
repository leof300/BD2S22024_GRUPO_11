const cassandraClient = require('../config/cassandra');

class HistoricoPrecio {
    constructor(codigo_producto, precio_historico, fecha) {
        this.codigo_producto = codigo_producto;
        this.precio_historico = precio_historico;
        this.fecha = fecha;
    }

    static async findAllByProducto(codigo_producto) {
        const query = 'SELECT * FROM HistoricoPrecio WHERE codigo_producto = ?';
        try {
            const result = await cassandraClient.execute(query, [codigo_producto], { prepare: true });
            return result.rows.map(row => new HistoricoPrecio(row.codigo_producto, row.precio_historico, row.fecha));
        } catch (err) {
            throw new Error('Error al obtener el histórico de precios:', err);
        }
    }

    static async create(codigo_producto, precio_historico, fecha) {
        const query = 'INSERT INTO HistoricoPrecio (codigo_producto, precio_historico, fecha) VALUES (?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_producto, precio_historico, fecha], { prepare: true });
            return new HistoricoPrecio(codigo_producto, precio_historico, fecha);
        } catch (err) {
            throw new Error('Error al crear el histórico de precios:', err);
        }
    }
}

module.exports = HistoricoPrecio;
