import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PautasController } from './../controllers';



const router = Router();



router.get('/', (_, res) => {
  return res.send('Olá, DEV!');
});

router.post('/pauta', PautasController.createValidation, PautasController.create);



export { router };