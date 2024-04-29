import { Router } from "express";

import { PautasController, SessoesController } from "./../controllers";
import { VotosController } from "../controllers/votos";

const router = Router();

router.get("/", (_, res) => {
  return res.send();
});
//routes pautas

router.get(
  "/pautas",
  PautasController.getAllValidation,
  PautasController.getAll
);

router.post(
  "/pauta",
  PautasController.createValidation,
  PautasController.create
);

router.get(
  "/pauta/:id",
  PautasController.getByIdValidation,
  PautasController.getById
);

router.put(
  "/pauta/:id",
  PautasController.updateByIdValidation,
  PautasController.updateById
);

router.delete(
  "/pauta/:id",
  PautasController.deleteByIdValidation,
  PautasController.deleteById
);

//routes sessoes
router.get(
  "/sessoes",
  SessoesController.getAllValidation,
  SessoesController.getAll
);

router.get(
  "/sessao/:id",
  SessoesController.getByIdValidation,
  SessoesController.getById
);

router.put(
  "/sessao/:id",
  SessoesController.updateByIdValidation,
  SessoesController.updateById
);

router.delete(
  "/sessao/:id",
  SessoesController.deleteByIdValidation,
  SessoesController.deleteById
);

router.post(
  "/sessao/:pautaId",
  SessoesController.createValidation,
  SessoesController.create
);

// routes votos

router.post(
  "/voto/:sessaoId",
  VotosController.createValidation,
  VotosController.create
);

router.get(
  "/votos",
  VotosController.getAllValidation,
  VotosController.getAll
);

export { router };
