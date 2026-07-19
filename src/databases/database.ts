

const fs = require('fs');
const db = require('knex')({
  client: 'pg', // Define o PostgreSQL como banco
  connection: {
    host: process.env.DB_SERVER,       // Endereço do servidor
    port: process.env.DB_PORT,              // Porta padrão do Postgres
    user: process.env.DB_USER,     // Usuário do banco
    password: process.env.DB_PASSWORD,   // Senha do usuário
    database: process.env.DB_DATABASE
    ,ssl: { 
        rejectUnauthorized: true,
        ca: fs.readFileSync('./src/databases/global-bundle.pem').toString()
    }

    
  },
  pool: { min: 2, max: 10 } // Gerenciamento do pool de conexões
});

export default db;
