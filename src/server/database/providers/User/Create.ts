import { ETableNames } from '../../ETableNames';
import { Iuser } from '../../models';
import { Knex } from '../../knex';
import { PasswordCrypto } from '../../../shared/services';


export const create = async (usuario: Omit<Iuser, 'id'>): Promise<number | Error> => {
  try {
    
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

    const [result] = await Knex(ETableNames.usuarios).insert({ ...usuario, senha: hashedPassword }).returning('id');
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