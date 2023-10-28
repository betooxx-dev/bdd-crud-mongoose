import express from "express";
import {
  getComentarios,
  getComentario,
  getComentariosByPublicacion,
  createComentario,
  updateComentario,
  deleteComentario,
  deleteComentarioByFechaAndPublicacion,
} from "../controllers/comentario.controller.js";

const router = express.Router();

router.get("/comentarios", getComentarios);
router.get("/comentarios/:id", getComentario);
router.post("/comentarios-publicacion", getComentariosByPublicacion);
router.post("/comentarios", createComentario);
router.put("/comentarios/:id", updateComentario);
router.delete("/comentarios/:id", deleteComentario);
router.delete(
  "/comentarios-fecha-publicacion",
  deleteComentarioByFechaAndPublicacion
);

export default router;
