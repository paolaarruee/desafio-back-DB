import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { Iuser } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/User";

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<Iuser, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      cpf: yup.string().required().min(11).max(11),
      nome: yup.string().required().min(3),
      senha: yup.string().required().min(6),
      email: yup.string().required().min(5),
      admin: yup.boolean().required(),
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

  const user = await UsuariosProvider.updateById(req.params.id, req.body);
  if (user instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: { default: "Usuário não encontrado" },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(user);
};
