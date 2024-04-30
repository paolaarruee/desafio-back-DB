import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsuariosProvider } from "../../database/providers/User";
import { validation } from "../../shared/middlewares";
import { Iuser } from "../../database/models";

interface IBodyProps extends Omit<Iuser, "id" | "nome" | "admin" | "email"> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      senha: yup.string().required().min(6),
      cpf: yup.string().required().email().min(11),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { cpf, senha } = req.body;

  const result = await UsuariosProvider.getByCpf(cpf);

  if (result instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "CPF ou senha são inválidos",
      },
    });
  }

  if (senha !== result.senha) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "CPF ou senha são inválidos",
      },
    });
  } else {
    return res
      .status(StatusCodes.OK)
      .json({ accessToken: "teste.teste.teste" });
  }
};
