import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";

interface IParamProps {
  pautaId?: number;
}
export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      pautaId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.pautaId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  const sessao = await SessaoVotacaoProvider.deleteById(req.params.pautaId);
  if (sessao instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: { default: "Sessao não encontrada" },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
