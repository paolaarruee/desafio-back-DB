import { IPauta, ISessaoDeVotacao} from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    pauta: IPauta;
    sessao: ISessaoDeVotacao;
    // usuario: IUsuario
  }
}
