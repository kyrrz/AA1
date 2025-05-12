const knex = require("knex");
const { config } = require("./configuration");

// Configuración de la base de datos: tipo, ubicación y otros parámetros
const db = knex({
  client: "mysql",
  connection: {
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
  },
  useNullAsDefault: true,
});

exports.db = db;
