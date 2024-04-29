import { ETableNames } from "../../ETableNames";
import { IVoto } from "../../models";
import { Knex } from "../../knex";

export const create = async (
  votos: Omit<IVoto, "id">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.votos)
      .insert(votos)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao cadastrar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
