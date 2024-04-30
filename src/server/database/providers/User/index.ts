import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as GetByCpf from "./GetByCpf";
import * as getAll from "./GetAll";
import * as count from "./Count";

export const UsuariosProvider = {
  ...deleteById,
  ...updateById,
  ...GetByCpf,
  ...create,
  ...getAll,
  ...count,
};
