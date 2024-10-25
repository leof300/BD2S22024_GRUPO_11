const cassandraClient = require('../config/cassandra');

class Cliente {
    constructor(codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento) {
        this.codigo_cliente = codigo_cliente;
        this.nombre_empresa = nombre_empresa;
        this.nombre_representante = nombre_representante;
        this.telefono = telefono;
        this.direccion = direccion;
        this.tipo_cliente = tipo_cliente;
        this.descuento = descuento;
    }

    static async findAll() {
        const query = 'SELECT * FROM Cliente';
        try {
            const result = await cassandraClient.execute(query);
            return result.rows.map(row => new Cliente(row.codigo_cliente, row.nombre_empresa, row.nombre_representante, row.telefono, row.direccion, row.tipo_cliente, row.descuento));
        } catch (err) {
            throw new Error('Error al obtener los clientes:', err);
        }
    }

    static async create(codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento) {
        const query = 'INSERT INTO Cliente (codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento) VALUES (?, ?, ?, ?, ?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento], { prepare: true });
            return new Cliente(codigo_cliente, nombre_empresa, nombre_representante, telefono, direccion, tipo_cliente, descuento);
        } catch (err) {
            throw new Error('Error al crear el cliente:', err);
        }
    }
}

module.exports = Cliente;
