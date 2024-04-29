import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/User";

interface IParamProps {
  id?: number;
}
export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }
  const usuario = await UsuariosProvider.getById(req.params.id);
  if (!usuario) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Usuário não encontrado",
    });
  }

  return res.status(StatusCodes.OK).json(usuario);
};
