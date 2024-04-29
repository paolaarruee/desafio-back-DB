import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuarios, (table) => {
      table.bigIncrements("id").primary();
      table.string("cpf").notNullable().unique().checkLength(">", 11);
      table.string("nome").notNullable().checkLength(">", 3);
      table.string("senha").notNullable().checkLength(">", 6);
      table.string("email").index().notNullable().unique().checkLength(">", 5);
      table.boolean("admin").notNullable();
      table.comment("Tabela usada para armazenar os usuários no sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuarios}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.usuarios).then(() => {
    console.log(`# Dropped table ${ETableNames.usuarios}`);
  });
}
