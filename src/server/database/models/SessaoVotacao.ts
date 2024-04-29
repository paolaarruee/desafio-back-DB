import { IVoto } from "./Voto";

export interface ISessaoDeVotacao {
  id: number;
  pautaId: number;
  nomeSessao: string;
  dataInicio: Date;
  duracaoMinutos?: number;
  votos?: number;
}
