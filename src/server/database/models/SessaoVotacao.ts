import { Voto } from "./Voto";

export interface ISessaoDeVotacao {
  id: number;
  pautaId: number;
  dataInicio: Date;
  duracaoMinutos?: number;
  votos?: Voto[];
}
