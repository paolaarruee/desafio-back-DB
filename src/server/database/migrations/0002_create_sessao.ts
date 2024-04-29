import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema

    .createTable(ETableNames.sessaoVotacao, (table) => {
      table.bigIncrements("id").primary();
      table
        .bigInteger("pautaId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable(ETableNames.pauta);

      table.timestamp("dataInicio").notNullable();

      table.timestamp("dataTermino").notNullable();

      table.integer("votos").notNullable();
      table.integer("duracaoMinutos").notNullable();

      table.string("nomeSessao").notNullable();

      table.comment(
        "Tabela usada para armazenar as sessões das pautas no sistema."
      );
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.sessaoVotacao}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.sessaoVotacao).then(() => {
    console.log(`# Dropped table ${ETableNames.sessaoVotacao}`);
  });
}
