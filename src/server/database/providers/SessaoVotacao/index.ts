import * as create from "./Create";
// import * as deleteById from "./DeleteById";
// import * as updateById from "./UpdateById";
// import * as getById from "./GetById";
// import * as getAll from "./GetAll";
import * as count from "./Count";

export const SessaoVotacaoProvider = {
  // ...deleteById,
  // ...updateById,
  // ...getById,
  ...create,
  // ...getAll,
  ...count,
};
