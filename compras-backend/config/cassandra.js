const cassandra = require('cassandra-driver');

// Configurar el cliente de Cassandra
const client = new cassandra.Client({
    contactPoints: ['127.0.0.1'], // IP de clúster de Cassandra
    localDataCenter: 'datacenter1', // Centro de datos
    keyspace: 'comprasbd',// Nombre del keyspace de Cassandra
    protocolOptions: { port: 9042 } // Puerto clúster
});

// Conectar a Cassandra
client.connect()
    .then(() => console.log('Conectado a Cassandra'))
    .catch(err => console.error('Error al conectar a Cassandra', err));

module.exports = client;
