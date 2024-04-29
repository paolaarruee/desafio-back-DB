import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.votos, (table) => {
      table.bigIncrements("id").primary().comment("Chave primária do voto");
      table
        .bigInteger("sessaoId")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable(ETableNames.sessaoVotacao)
        .comment("Chave estrangeira para a Sessão ID");
      table.string("opcao").notNullable().comment("opcao voto");
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
