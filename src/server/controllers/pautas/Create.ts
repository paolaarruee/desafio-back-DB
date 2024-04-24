import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { PautasProvider } from '../../database/providers/Pautas';
import { validation } from '../../shared/middlewares';
import { IPauta } from '../../database/models';


interface IBodyProps extends Omit<IPauta, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
  })),
}));

export const create = async (req: Request<{}, {}, IPauta>, res: Response) => {
  const result = await PautasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};