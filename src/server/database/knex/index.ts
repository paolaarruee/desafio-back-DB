import { knex } from "knex";

import { development } from "./Environment";

const getEnvironment = () => {
  switch (process.env.NODE_ENV) {
    default:
      return development;
  }
};

export const Knex = knex(getEnvironment());
