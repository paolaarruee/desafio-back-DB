import { IPauta } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    pauta: IPauta;
    // sessao: Isessao
    // usuario: IUsuario
  }
}
