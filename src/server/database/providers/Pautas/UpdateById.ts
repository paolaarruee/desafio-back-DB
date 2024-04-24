import { ETableNames } from '../../ETableNames';
import { IPauta } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, pauta: Omit<IPauta, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pauta)
      .update(pauta)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};