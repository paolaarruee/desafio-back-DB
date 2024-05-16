import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.votos, (table) => {
      table.bigIncrements("id").primary();
      table
        .bigInteger("pautaId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable(ETableNames.sessaoVotacao);

        table
        .string("userCpf")
        .notNullable()
        .references("cpf")
        .inTable("usuarios")
        .onDelete("CASCADE") 
        .onUpdate("CASCADE");

      table.string("opcao").notNullable();
      table.comment("Tabela usada para armazenar os votos no sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.votos}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.votos).then(() => {
    console.log(`# Dropped table ${ETableNames.votos}`);
  });
}
