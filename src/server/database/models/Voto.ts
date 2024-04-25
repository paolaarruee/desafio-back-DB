export interface IVoto {
  id: number;
  sessaoId: string;
  userId: string;
  opcao: "Sim" | "Não";
}
