import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { SessaoVotacaoProvider } from "../../database/providers/SessaoVotacao";
import { ISessaoDeVotacao, IVoto } from "../../database/models";
import { validation } from "../../shared/middlewares";
import { VotosProvider } from "../../database/providers/Votos";
import { UsuariosProvider } from "../../database/providers/User";
import { JWTService } from "../../shared/services";

interface IBodyProps extends Omit<IVoto, "id" | "sessaoId" | "userCpf"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      opcao: yup.string().required(),
    })
  ),
}));

const hasUserVotedInSession = async (
  sessaoId: number,
  userCpf: string
): Promise<boolean | Error> => {
  try {
    const votos = await VotosProvider.getByCpf(userCpf);

    if (!Array.isArray(votos)) {
      throw new Error("Erro ao recuperar os votos do usuário");
    }

    return votos.some((voto) => voto.sessaoId === sessaoId);
  } catch (error) {
    console.error("Erro ao verificar se o usuário já votou na sessão:", error);
    return new Error("Erro ao verificar se o usuário já votou na sessão");
  }
};

export const create = async (
  req: Request<{ sessaoId: string }, {}, IVoto>,
  res: Response
) => {
  const { sessaoId } = req.params;
  const { body } = req;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token de autenticação não fornecido.",
      });
    }

    const jwtData = JWTService.verify(token);
    if (jwtData === "JWT_SECRET_NOT_FOUND" || jwtData === "INVALID_TOKEN") {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Token inválido.",
      });
    }

    const userCpf = jwtData.cpf;
    const hasVoted = await hasUserVotedInSession(parseInt(sessaoId), userCpf);
    if (hasVoted) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Você já votou nesta sessão.",
      });
    }

    const sessao = await SessaoVotacaoProvider.getById(parseInt(sessaoId));
    if (!sessao) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Sessão não encontrada",
      });
    }

    if (!("dataTermino" in sessao)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "A sessão de votação não possui data de término definida.",
      });
    }

    if (sessao.dataTermino === undefined) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "A sessão de votação não possui data de término definida.",
      });
    }

    const agora = new Date();
    if (agora > sessao.dataTermino) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "A sessão de votação já expirou e não pode mais receber votos.",
      });
    }

    const newBody = {
      ...body,
      sessaoId: parseInt(sessaoId),
      userCpf: userCpf,
    };

    const result = await VotosProvider.create(newBody);

    if (result) {
      const currentSession = await SessaoVotacaoProvider.getById(
        parseInt(sessaoId)
      );

      if (
        currentSession &&
        "votos" in currentSession &&
        currentSession.votos !== undefined
      ) {
        const updatedVotos = (currentSession.votos ?? 0) + 1;

        const updatedSessao = await SessaoVotacaoProvider.updateById(
          parseInt(sessaoId),
          {
            votos: updatedVotos,
          } as Omit<ISessaoDeVotacao, "id" | "duracaoMinutos">
        );

        return res.status(StatusCodes.CREATED).json(result) && updatedSessao;
      } else {
        console.error("Sessão não encontrada ou votos não estão definidos.");
        return res.status(StatusCodes.NOT_FOUND).json({
          error: "Sessão não encontrada ou votos não estão definidos.",
        });
      }
    } else {
      console.error("Resultado não encontrado.");
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "Resultado não encontrado.",
      });
    }
  } catch (error) {
    console.error("Erro ao criar voto:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Erro ao criar voto",
    });
  }
};
