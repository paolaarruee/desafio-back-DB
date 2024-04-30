import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { UsuariosProvider } from "../../database/providers/User";

interface IParamProps {
  cpf?: string;
}
export const getByCpfValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      cpf: yup.string().required(),
    })
  ),
}));

export const getByCpf = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.cpf) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "CPF" precisa ser informado.',
      },
    });
  }
  const usuario = await UsuariosProvider.getByCpf(req.params.cpf);
  if (!usuario) {
    return res.status(StatusCodes.NOT_FOUND).json({
      error: "Usuário não encontrado",
    });
  }

  return res.status(StatusCodes.OK).json(usuario);
};
