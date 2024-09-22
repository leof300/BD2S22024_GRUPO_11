const cassandraClient = require('../config/cassandra');

class CuartoFrio {
    constructor(codigo_bodega, codigo_cuarto_frio, capacidad, temperatura) {
        this.codigo_bodega = codigo_bodega;
        this.codigo_cuarto_frio = codigo_cuarto_frio;
        this.capacidad = capacidad;
        this.temperatura = temperatura;
    }

    static async findAllByBodega(codigo_bodega) {
        const query = 'SELECT * FROM CuartoFrio WHERE codigo_bodega = ?';
        try {
            const result = await cassandraClient.execute(query, [codigo_bodega], { prepare: true });
            return result.rows.map(row => new CuartoFrio(row.codigo_bodega, row.codigo_cuarto_frio, row.capacidad, row.temperatura));
        } catch (err) {
            throw new Error('Error al obtener los cuartos fríos:', err);
        }
    }

    static async create(codigo_bodega, codigo_cuarto_frio, capacidad, temperatura) {
        const query = 'INSERT INTO CuartoFrio (codigo_bodega, codigo_cuarto_frio, capacidad, temperatura) VALUES (?, ?, ?, ?)';
        try {
            await cassandraClient.execute(query, [codigo_bodega, codigo_cuarto_frio, capacidad, temperatura], { prepare: true });
            return new CuartoFrio(codigo_bodega, codigo_cuarto_frio, capacidad, temperatura);
        } catch (err) {
            throw new Error('Error al crear el cuarto frío:', err);
        }
    }
}

module.exports = CuartoFrio;
