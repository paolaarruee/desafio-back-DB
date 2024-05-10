import knex, { Knex } from "knex";
import path from "path";

async function createDatabase() {
  const knexInstance = knex({
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "root",
    },
  });

  try {
    await knexInstance.raw("CREATE DATABASE IF NOT EXISTS gerenciadorVotacao");
    console.log("Banco de dados criado com sucesso.");
    await knexInstance.raw("USE gerenciadorVotacao");
  } catch (error) {
    console.error("Erro ao criar o banco de dados:", error);
  } finally {
    await knexInstance.destroy();
  }
}
createDatabase();

export const development: Knex.Config = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "gerenciadorVotacao",
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
};


export const test: Knex.Config = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: ':memory:',
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};