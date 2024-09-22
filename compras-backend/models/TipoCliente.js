const cassandraClient = require('../config/cassandra');

class TipoCliente {
    constructor(tipo, descuento, volumen_producto) {
        this.tipo = tipo;
        this.descuento = descuento;
        this.volumen_producto = volumen_producto;
    }

    static async findAll() {
        const query = 'SELECT * FROM TipoCliente';
        try {
            const result = await cassandraClient.execute(query);
            return result.rows.map(row => new TipoCliente(row.tipo, row.descuento, row.volumen_producto));
        } catch (err) {
            throw new Error('Error al obtener los tipos de clientes:', err);
        }
    }

    static async create(tipo, descuento, volumen_producto) {
        const query = 'INSERT INTO TipoCliente (tipo, descuento, volumen_producto) VALUES (?, ?, ?)';
        try {
            await cassandraClient.execute(query, [tipo, descuento, volumen_producto], { prepare: true });
            return new TipoCliente(tipo, descuento, volumen_producto);
        } catch (err) {
            throw new Error('Error al crear el tipo de cliente:', err);
        }
    }
}

module.exports = TipoCliente;
