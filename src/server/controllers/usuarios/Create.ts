import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { Iuser } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/User";

interface IBodyProps extends Omit<Iuser, "id" | "admin"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      cpf: yup.string().required().min(11).max(11),
      nome: yup.string().required().min(3),
      senha: yup.string().required().min(6),
      email: yup.string().required().min(5),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Iuser>, res: Response) => {
  const result = await UsuariosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
