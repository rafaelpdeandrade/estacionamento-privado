const { Pool } = require('pg');
const { senhaServidor } = require('./senhaServidor');

const servidor = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: senhaServidor,
    database: 'estacionamento'
});

module.exports = { servidor };