import * as create from "./Create";
import * as getAll from "./GetAll";
import * as count from "./Count";

export const VotosProvider = {
  ...create,
  ...getAll,
  ...count,
};
