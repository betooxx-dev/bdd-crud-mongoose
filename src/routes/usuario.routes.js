import express from "express";
import {
  getUsuarios,
  getUsuario,
  getUsuarioByEmail,
  createUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.controller.js";

const router = express.Router();

router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuario);
router.post("/usuario-email", getUsuarioByEmail);
router.post("/usuarios", createUsuario);
router.put("/usuarios/:id", updateUsuario);
router.delete("/usuarios/:id", deleteUsuario);

export default router;
