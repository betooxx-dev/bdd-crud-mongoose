import express from "express";
import {
    getPublicaciones,
    getPublicacion,
    getPublicacionesByUsuario,
    createPublicacion,
    updatePublicacion,
    deletePublicacion,
    deletePublicacionesByFecha
} from "../controllers/publicacion.controller.js"; 

const router = express.Router();

router.get("/publicaciones", getPublicaciones); 
router.get("/publicaciones/:id", getPublicacion); 

router.post("/publicaciones-usuario", getPublicacionesByUsuario)
router.post("/publicaciones", createPublicacion); 

router.put("/publicaciones/:id", updatePublicacion); 
router.delete("/publicaciones/:id", deletePublicacion); 
router.delete("/publicaciones-fecha", deletePublicacionesByFecha)

export default router;