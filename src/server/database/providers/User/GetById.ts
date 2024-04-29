import { ETableNames } from "../../ETableNames";
import { Iuser } from "../../models";
import { Knex } from "../../knex";

export const getById = async (id: number): Promise<Iuser | null | Error> => {
  try {
    const result = await Knex(ETableNames.usuarios)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    console.log("Registro não encontrado");
    return null;
  } catch (error) {
    console.error("Erro ao consultar o registro:", error);
    return new Error("Erro ao consultar o registro");
  }
};
