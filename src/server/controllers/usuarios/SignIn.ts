import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsuariosProvider } from "../../database/providers/User";
import { validation } from "../../shared/middlewares";
import { Iuser } from "../../database/models";
import { JWTService, PasswordCrypto } from "../../shared/services";

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

  const usuario = await UsuariosProvider.getByCpf(cpf);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    senha,
    usuario.senha
  );
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: "Email ou senha são inválidos",
      },
    });
  } else {
    const accessToken = JWTService.sign({
      uid: usuario.id,
      cpf: usuario.cpf,
      admin: usuario.admin,
    });
    if (accessToken === "JWT_SECRET_NOT_FOUND") {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: "Erro ao gerar o token de acesso",
        },
      });
    }

    return res.status(StatusCodes.OK).json({ accessToken });
  }
};
