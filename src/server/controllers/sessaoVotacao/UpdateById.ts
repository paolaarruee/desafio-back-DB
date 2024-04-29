import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { ISessaoDeVotacao } from "../../database/models";

import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";

interface IParamProps {
  id?: number;
}
interface IBodyProps
  extends Omit<ISessaoDeVotacao, "id" | "duracaoMinutos"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      pautaId: yup.number().required(),
      dataInicio: yup.date().required(),
      nomeSessao: yup.string().required(),
      votos: yup.number().required(),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  const sessao = await SessaoVotacaoProvider.updateById(req.params.id, req.body);
  if (sessao instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: { default: "Sessao não encontrada" },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(sessao);
};
