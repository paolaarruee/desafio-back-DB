import { Router } from "express";

import {
  PautasController,
  SessoesController,
  VotosController,
  UsuariosController,
} from "./../controllers";
import { ensureAuthenticated, verifyAdmin } from "../shared/middlewares";

const router = Router();

router.get("/", (_, res) => {
  return res.send();
});

//routes pautas

router.get(
  "/pautas",
  // ensureAuthenticated,
  PautasController.getAllValidation,
  PautasController.getAll
);

router.post(
  "/pauta",
  // ensureAuthenticated,
  // verifyAdmin,
  PautasController.createValidation,
  PautasController.create
);

router.get(
  "/pauta/:id",
  // ensureAuthenticated,
  // verifyAdmin,
  PautasController.getByIdValidation,
  PautasController.getById
);

router.put(
  "/pauta/:id",
  // ensureAuthenticated,
  // verifyAdmin,
  PautasController.updateByIdValidation,
  PautasController.updateById
);

router.delete(
  "/pauta/:id",
  // ensureAuthenticated,
  PautasController.deleteByIdValidation,
  PautasController.deleteById
);

//routes sessoes
router.get(
  "/sessoes",
  // ensureAuthenticated,
  SessoesController.getAllValidation,
  SessoesController.getAll
);

router.get(
  "/sessao/:pautaId",
  // ensureAuthenticated,
  SessoesController.getByIdValidation,
  SessoesController.getById
);

router.put(
  "/sessao/:pautaId",
  // verifyAdmin,
  // ensureAuthenticated,
  SessoesController.updateByIdValidation,
  SessoesController.updateById
);

router.delete(
  "/sessao/:pautaId",
  // ensureAuthenticated,
  // verifyAdmin,
  SessoesController.deleteByIdValidation,
  SessoesController.deleteById
);

router.post(
  "/sessao/:pautaId",
  // ensureAuthenticated,
  // verifyAdmin,
  SessoesController.createValidation,
  SessoesController.create
);

// routes votos

router.post(
  "/voto/:id",
  // ensureAuthenticated,
  VotosController.createValidation,
  VotosController.create
);

router.get(
  "/votos",
  // ensureAuthenticated,
  VotosController.getAllValidation,
  VotosController.getAll
);

//routes usuarios

router.get(
  "/usuarios",
  // ensureAuthenticated,
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
  // ensureAuthenticated,
  UsuariosController.getByCpfValidation,
  UsuariosController.getByCpf
);

router.put(
  "/usuario/:id",
  // ensureAuthenticated,
  UsuariosController.updateByIdValidation,
  UsuariosController.updateById
);

router.delete(
  "/usuario/:id",
  // ensureAuthenticated,
  UsuariosController.deleteByIdValidation,
  UsuariosController.deleteById
);

export { router };
