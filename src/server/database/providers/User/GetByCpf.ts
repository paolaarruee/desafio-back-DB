import { ETableNames } from '../../ETableNames';
import {  Iuser } from '../../models';
import { Knex } from '../../knex';


export const getByCpf = async (cpf: string): Promise<Iuser | Error> => {
  try {
    const result = await Knex(ETableNames.usuarios)
      .select('*')
      .where('cpf', '=', cpf)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};