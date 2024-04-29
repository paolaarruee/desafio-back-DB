import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { PautasProvider } from "../../database/providers/Pautas";
import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";
import { ISessaoDeVotacao, IVoto } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { VotosProvider } from "../../database/providers/Votos";

interface IBodyProps extends Omit<IVoto, "id" | "sessaoId"> {}

//userId: string;

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      sessaoId: yup.number().required(),
      opcao: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{ sessaoId: string }, {}, IVoto>,
  res: Response
) => {
  const { sessaoId } = req.params;
  const { body } = req;

  try {
    const sessao = await SessaoVotacaoProvider.getById(parseInt(sessaoId));
    if (!sessao) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Sessão não encontrada",
      });
    }

    if (parseInt(sessaoId) !== body.sessaoId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error:
          "O SessãoId na URL não corresponde ao SessãoId no corpo da solicitação",
      });
    }

    const newBody = {
      ...body,
      sessaoId: parseInt(sessaoId),
    };

    const result = await VotosProvider.create(newBody);

    if (true) {
      console.log("aaa");
      const updatedSessao = await SessaoVotacaoProvider.updateById(
        parseInt(sessaoId),
        {
          votos: 1,
        } as Omit<ISessaoDeVotacao, "id" | "duracaoMinutos">
      );
      console.log("aaa222");
      return res.status(StatusCodes.CREATED).json(result) && updatedSessao;
    }
  } catch (error) {
    console.error("Erro ao cadastrar o voto:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro ao cadastrar o voto",
    });
  }
};
