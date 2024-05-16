import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { SessaoVotacaoProvider } from '../../database/providers/SessaoVotacao';


interface IParamProps {
  pautaId?: number;
}
export const getByIdValidation = validation(getSchema => ({
  params: getSchema<IParamProps>(yup.object().shape({
    pautaId: yup.number().integer().required().moreThan(0),
  })),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.pautaId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }
  const sessao = await SessaoVotacaoProvider.getById(req.params.pautaId);
  if (!sessao) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Sessão não encontrada",
    });
  }

  return res.status(StatusCodes.OK).json(sessao);
};