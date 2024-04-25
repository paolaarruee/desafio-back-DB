import { ETableNames } from '../../ETableNames';
import { ISessaoDeVotacao } from '../../models';
import { Knex } from '../../knex';

export const create = async (sessao: Omit<ISessaoDeVotacao, 'id'>): Promise<number | Error> => {
  try {
    const result = await Knex(ETableNames.sessaoVotacao).insert(sessao);

    if (Array.isArray(result) && result.length > 0 && typeof result[0] === 'number') {
      return result[0]; 
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};
