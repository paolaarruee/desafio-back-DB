import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pauta, (table) => {
      table.bigIncrements("id").primary().index();
      table.string('nome', 150).checkLength('<=', 150).index().notNullable();

      table.comment("Tabela usada para armazenar pautas no sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pauta}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pauta).then(() => {
    console.log(`# Dropped table ${ETableNames.pauta}`);
  });
}
