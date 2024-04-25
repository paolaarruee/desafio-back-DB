import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.sessaoVotacao, (table) => {
      table.bigIncrements("id").primary().comment("Chave primária da sessão");
      table
        .bigInteger("pautaId")
        .unsigned()
        .notNullable()
        .comment("Chave estrangeira para a pauta");
      table
        .timestamp("dataInicio")
        .notNullable()
        .comment("Data de início da sessão");
      table
        .integer("votos")
        .notNullable()
        .defaultTo(0)
        .comment("Número de votos");
      table
        .integer("duracaoMinutos")
        .notNullable()
        .comment("Duração da sessão em minutos");

      table
        .foreign("pautaId")
        .references("id")
        .inTable(ETableNames.pauta)
        .onDelete("CASCADE");

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
