import { Router } from "express";

import {
  PautasController,
  SessoesController,
  VotosController,
  UsuariosController,
} from "./../controllers";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

router.get("/", (_, res) => {
  return res.send();
});

//routes pautas

router.get(
  "/pautas",
  ensureAuthenticated,
  PautasController.getAllValidation,
  PautasController.getAll
);

router.post(
  "/pauta",
  ensureAuthenticated,
  PautasController.createValidation,
  PautasController.create
);

router.get(
  "/pauta/:id",
  ensureAuthenticated,
  PautasController.getByIdValidation,
  PautasController.getById
);

router.put(
  "/pauta/:id",
  ensureAuthenticated,
  PautasController.updateByIdValidation,
  PautasController.updateById
);

router.delete(
  "/pauta/:id",
  ensureAuthenticated,
  PautasController.deleteByIdValidation,
  PautasController.deleteById
);

//routes sessoes
router.get(
  "/sessoes",
  ensureAuthenticated,
  SessoesController.getAllValidation,
  SessoesController.getAll
);

router.get(
  "/sessao/:id",
  ensureAuthenticated,
  SessoesController.getByIdValidation,
  SessoesController.getById
);

router.put(
  "/sessao/:id",
  ensureAuthenticated,
  SessoesController.updateByIdValidation,
  SessoesController.updateById
);

router.delete(
  "/sessao/:id",
  ensureAuthenticated,
  SessoesController.deleteByIdValidation,
  SessoesController.deleteById
);

router.post(
  "/sessao/:pautaId",
  ensureAuthenticated,
  SessoesController.createValidation,
  SessoesController.create
);

// routes votos

router.post(
  "/voto/:sessaoId",
  ensureAuthenticated,
  VotosController.createValidation,
  VotosController.create
);

router.get(
  "/votos",
  ensureAuthenticated,
  VotosController.getAllValidation,
  VotosController.getAll
);

//routes usuarios

router.get(
  "/usuarios",
  UsuariosController.getAllValidation,
  UsuariosController.getAll
);

router.post(
  "/cadastrar",
  UsuariosController.createValidation,
  UsuariosController.create
);

router.post("/entrar", UsuariosController.signIn, UsuariosController.create);

router.get(
  "/usuario/:cpf",
  UsuariosController.getByCpfValidation,
  UsuariosController.getByCpf
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
