import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { IPauta } from "../../database/models";
import { PautasProvider } from "../../database/providers/Pautas";

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IPauta, "id" | "votos"> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      descricao: yup.string().required().min(10).max(300),
      categoria: yup.string().required().min(5).max(100),
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

  const pauta = await PautasProvider.updateById(req.params.id, req.body);
  if (pauta instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: { default: "Pauta não encontrada" },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(req.body);
};
