import * as deleteById from "./DeleteById";
import * as updateById from "./UpdateById";
import * as getByCpf from "./GetByCpf";
import * as create from "./Create";
import * as getAll from "./GetAll";
import * as signIn from "./SignIn";

export const UsuariosController = {
  ...deleteById,
  ...updateById,
  ...getByCpf,
  ...create,
  ...getAll,
  ...signIn,
};
