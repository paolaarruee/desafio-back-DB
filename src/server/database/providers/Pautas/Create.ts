import { ETableNames } from '../../ETableNames';
import { IPauta } from '../../models';
import { Knex } from '../../knex';


export const create = async (pauta: Omit<IPauta, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.pauta).insert(pauta).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};