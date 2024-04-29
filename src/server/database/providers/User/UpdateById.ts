import { ETableNames } from '../../ETableNames';
import {  Iuser } from '../../models';
import { Knex } from '../../knex';


export const updateById= async (id: number, usuarios: Omit<Iuser, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.usuarios)
      .update(usuarios)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};