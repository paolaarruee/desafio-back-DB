import { Router } from "express";

import {
  PautasController,
  SessoesController,
  VotosController,
  UsuariosController,
} from "./../controllers";

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

router.get("/votos", VotosController.getAllValidation, VotosController.getAll);

//routes usuarios

router.get(
  "/usuarios",
  UsuariosController.getAllValidation,
  UsuariosController.getAll
);

router.post(
  "/usuario",
  UsuariosController.createValidation,
  UsuariosController.create
);

router.get(
  "/usuario/:id",
  UsuariosController.getByIdValidation,
  UsuariosController.getById
);

router.put(
  "/usuario/:id",
  UsuariosController.updateByIdValidation,
  UsuariosController.updateById
);

router.delete(
  "/usuario/:id",
  UsuariosController.deleteByIdValidation,
  UsuariosController.deleteById
);

export { router };
