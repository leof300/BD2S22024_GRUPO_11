const cassandraClient = require('../config/cassandra');

class PedidoDetalle {
    constructor(codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra) {
        this.codigo_pedido = codigo_pedido;
        this.codigo_producto = codigo_producto;
        this.codigo_bodega = codigo_bodega;
        this.total_pedido = total_pedido;
        this.descuento = descuento;
        this.total_sin_descuento = total_sin_descuento;
        this.codigo_cliente = codigo_cliente;
        this.nombre_empresa = nombre_empresa;
        this.tipo_cliente = tipo_cliente;
        this.nombre_producto = nombre_producto;
        this.precio_unitario = precio_unitario;
        this.subtotal = subtotal;
        this.fecha_compra = fecha_compra;
    }

    static async findAllByPedido(codigo_pedido) {
        const query = 'SELECT * FROM PedidoDetalle WHERE codigo_pedido = ?';
        try {
            const result = await cassandraClient.execute(query, [codigo_pedido], { prepare: true });
            return result.rows.map(row => new PedidoDetalle(row.codigo_pedido, row.codigo_producto, row.codigo_bodega, row.total_pedido, row.descuento, row.total_sin_descuento, row.codigo_cliente, row.nombre_empresa, row.tipo_cliente, row.nombre_producto, row.precio_unitario, row.subtotal, row.fecha_compra));
        } catch (err) {
            throw new Error('Error al obtener los detalles del pedido:', err);
        }
    }

    static async findAll(codigo_pedido) {
        const query = 'SELECT * FROM PedidoDetalle ';
        try {
            const result = await cassandraClient.execute(query);
            return result.rows.map(row => new PedidoDetalle(row.codigo_pedido, row.codigo_producto, row.codigo_bodega, row.total_pedido, row.descuento, row.total_sin_descuento, row.codigo_cliente, row.nombre_empresa, row.tipo_cliente, row.nombre_producto, row.precio_unitario, row.subtotal, row.fecha_compra));
        } catch (err) {
            throw new Error('Error al obtener los detalles del pedido:', err);
        }
    }

    static async create(codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra) {
        const query = 'INSERT INTO PedidoDetalle (codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra], { prepare: true });
            return new PedidoDetalle(codigo_pedido, codigo_producto, codigo_bodega, total_pedido, descuento, total_sin_descuento, codigo_cliente, nombre_empresa, tipo_cliente, nombre_producto, precio_unitario, subtotal, fecha_compra);
        } catch (err) {
            throw new Error('Error al crear el detalle del pedido:', err);
        }
    }
}

module.exports = PedidoDetalle;
