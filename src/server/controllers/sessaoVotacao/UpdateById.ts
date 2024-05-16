import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { ISessaoDeVotacao } from "../../database/models";

import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";

interface IParamProps {
  pautaId?: number;
}
interface IBodyProps
  extends Omit<ISessaoDeVotacao, "dataTermino" | "id" | "votos"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      pautaId: yup.number().required(),
      dataInicio: yup.date().required(),
      nomeSessao: yup.string().required(),
      duracaoMinutos: yup.number(),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      pautaId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.pautaId) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }

  try {
    const existingSessao = await SessaoVotacaoProvider.getById(req.params.pautaId);

    if (existingSessao === null) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: { default: "Sessão não encontrada" },
      });
    }

    if (existingSessao instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: { default: "Erro ao obter sessão de votação" },
      });
    }

    if (req.body.pautaId && req.body.pautaId !== existingSessao.pautaId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "O pautaId na URL não corresponde ao pautaId no corpo da solicitação",
      });
    }

    const duracaoMinutos =
      req.body.duracaoMinutos !== undefined
        ? req.body.duracaoMinutos
        : existingSessao.duracaoMinutos || 1;

    let dataTermino;
    if (req.body.dataInicio) {
      const dataInicio = new Date(req.body.dataInicio);
      dataTermino = new Date(dataInicio.getTime() + duracaoMinutos * 60000);
    }

    const updatedSessao = await SessaoVotacaoProvider.updateById(
      req.params.pautaId,
      {
        ...req.body,
        duracaoMinutos: duracaoMinutos,
        dataTermino: dataTermino || existingSessao.dataTermino,
      }
    );

    return res.status(StatusCodes.NO_CONTENT).json(updatedSessao);
  } catch (error) {
    console.error("Erro ao atualizar sessão de votação:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro ao atualizar sessão de votação",
    });
  }
};
