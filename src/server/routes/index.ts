import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { PautasController } from "./../controllers";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá, DEV!");
});


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

export { router };
