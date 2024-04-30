import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getByCpf from "./GetByCpf";
import * as count from "./Count";

export const VotosProvider = {
  ...create,
  ...getAll,
  ...count,
  ...getByCpf,
};
