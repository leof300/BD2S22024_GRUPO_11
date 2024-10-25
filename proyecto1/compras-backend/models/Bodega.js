const cassandraClient = require('../config/cassandra');

class Bodega {
    constructor(codigo_bodega, capacidad, cuartos_frios) {
        this.codigo_bodega = codigo_bodega;
        this.capacidad = capacidad;
        this.cuartos_frios = cuartos_frios;
    }

    static async findAll() {
        const query = 'SELECT * FROM Bodega';
        try {
            const result = await cassandraClient.execute(query);
            return result.rows.map(row => new Bodega(row.codigo_bodega, row.capacidad, row.cuartos_frios));
        } catch (err) {
            throw new Error('Error al obtener las bodegas:', err);
        }
    }

    static async create(codigo_bodega, capacidad, cuartos_frios) {
        const query = 'INSERT INTO Bodega (codigo_bodega, capacidad, cuartos_frios) VALUES (?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_bodega, capacidad, cuartos_frios], { prepare: true });
            return new Bodega(codigo_bodega, capacidad, cuartos_frios);
        } catch (err) {
            throw new Error('Error al crear la bodega:', err);
        }
    }
}

module.exports = Bodega;
