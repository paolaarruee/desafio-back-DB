import { IPauta, ISessaoDeVotacao, IVoto } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    pauta: IPauta;
    sessao: ISessaoDeVotacao;
    votos: IVoto;
    usuario: IUsuario;
  }
}
