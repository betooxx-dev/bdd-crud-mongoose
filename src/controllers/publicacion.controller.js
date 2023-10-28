import Publicacion from "../models/publicacion.model.js"; 

export const getPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find().populate("usuario");
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las publicaciones" });
    }
};

export const getPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id).populate("usuario");
        if (!publicacion) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.json(publicacion);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la publicación" });
    }
};

export const getPublicacionesByUsuario = async (req, res) => {
    const { usuarioId } = req.body;
    try {
        const publicaciones = await Publicacion.find({ usuario: usuarioId });
        res.json(publicaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar publicaciones por usuario" });
    }
};

export const createPublicacion = async (req, res) => {
    const { titulo, contenido, fechaCreacion, usuario } = req.body;

    try {
        const nuevaPublicacion = new Publicacion({
            titulo,
            contenido,
            fechaCreacion,
            usuario,
        });
        const publicacionGuardada = await nuevaPublicacion.save();
        res.status(201).json(publicacionGuardada);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la publicación" });
    }
};

export const updatePublicacion = async (req, res) => {
    const { titulo, contenido, fechaCreacion, usuario } = req.body;

    try {
        const publicacionActualizada = await Publicacion.findByIdAndUpdate(
            req.params.id,
            {
                titulo,
                contenido,
                fechaCreacion,
                usuario,
            },
            { new: true }
        );
        if (!publicacionActualizada) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.json(publicacionActualizada);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la publicación" });
    }
};

export const deletePublicacion = async (req, res) => {
    try {
        const publicacionEliminada = await Publicacion.findByIdAndDelete(req.params.id);
        if (!publicacionEliminada) {
            return res.status(404).json({ message: "Publicación no encontrada" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la publicación" });
    }
};

export const deletePublicacionesByFecha = async (req, res) => {
    const { fecha } = req.body;
    try {
        const result = await Publicacion.findOneAndDelete({ fechaCreacion: fecha });
        res.json({ message: "Publicación eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al borrar publicaciones por fecha" });
    }
};