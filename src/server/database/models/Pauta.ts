import { IVoto } from "./Voto";

export interface IPauta {
  id: number;
  titulo: string;
  descricao: string;
  votos?: IVoto[];
  categoria: string;
}
