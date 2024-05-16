import { ETableNames } from "../../ETableNames";
import { ISessaoDeVotacao } from "../../models";
import { Knex } from "../../knex";

export const updateById = async (
  pautaId: number,
  sessao: Omit<ISessaoDeVotacao, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.sessaoVotacao)
      .update(sessao)
      .where("pautaId", "=", pautaId);

    if (result > 0) return;
    

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
