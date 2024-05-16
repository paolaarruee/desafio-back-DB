import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const deleteById = async (pautaId: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.sessaoVotacao)
      .where('pautaId', '=', pautaId)
      .del();

    if (result > 0) return;

    return new Error('Erro ao apagar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao apagar o registro');
  }
};