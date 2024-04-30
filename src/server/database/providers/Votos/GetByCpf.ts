import { ETableNames } from "../../ETableNames";
import { IVoto } from "../../models";
import { Knex } from "../../knex";

export const getByCpf = async (userCpf: string): Promise<IVoto[] | Error> => {
  try {
    const votos = await Knex("votos")
      .select("*")
      .where("userCpf", "=", userCpf);

    return votos;
  } catch (error) {
    console.error("Erro ao consultar votos por CPF:", error);
    return new Error("Erro ao consultar os votos por CPF");
  }
};
