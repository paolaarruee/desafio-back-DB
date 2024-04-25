import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { PautasProvider } from "../../database/providers/Pautas";
import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";
import { ISessaoDeVotacao } from "../../database/models";
import { validation } from "../../shared/middlewares";

interface IBodyProps
  extends Omit<ISessaoDeVotacao, "id" | "votos" | "duracaoMinutos"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      pautaId: yup.number().required(),
      dataInicio: yup.date().required(),
    })
  ),
}));

export const create = async (
  req: Request<{ pautaId: string }, {}, ISessaoDeVotacao>,
  res: Response
) => {
  const { pautaId } = req.params;
  const { body } = req;

  try {
    const pauta = await PautasProvider.getById(parseInt(pautaId));
    if (!pauta) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Pauta não encontrada",
      });
    }

    if (parseInt(pautaId) !== body.pautaId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "O pautaId na URL não corresponde ao pautaId no corpo da solicitação",
      });
    }

    const newBody = {
      ...body,
      duracaoMinutos: body.duracaoMinutos || 1,
    };

    const sessaoData = { ...newBody, pautaId: parseInt(pautaId) };

    const result = await SessaoVotacaoProvider.create(sessaoData);

    return res.status(StatusCodes.CREATED).json(result);
  } catch (error) {
    console.error("Erro ao criar sessão de votação:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro ao criar sessão de votação",
    });
  }
};
