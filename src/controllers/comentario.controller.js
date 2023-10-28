import Comentario from "../models/comentario.model.js"; 

export const getComentarios = async (req, res) => {
    try {
        const comentarios = await Comentario.find().populate("usuario").populate("publicacion");
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los comentarios" });
    }
};

export const getComentario = async (req, res) => {
    try {
        const comentario = await Comentario.findById(req.params.id).populate("usuario").populate("publicacion");
        if (!comentario) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.json(comentario);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el comentario" });
    }
};

export const getComentariosByPublicacion = async (req, res) => {
    const { publicacionId } = req.body;
    try {
        const comentarios = await Comentario.find({ publicacion: publicacionId }).populate("usuario");
        res.json(comentarios);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar comentarios por publicación" });
    }
};


export const createComentario = async (req, res) => {
    const { contenido, fechaCreacion, usuario, publicacion } = req.body;

    try {
        const nuevoComentario = new Comentario({
            contenido,
            fechaCreacion,
            usuario,
            publicacion,
        });
        const comentarioGuardado = await nuevoComentario.save();
        res.status(201).json(comentarioGuardado);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el comentario" });
    }
};

export const updateComentario = async (req, res) => {
    const { contenido, fechaCreacion, usuario, publicacion } = req.body;

    try {
        const comentarioActualizado = await Comentario.findByIdAndUpdate(
            req.params.id,
            {
                contenido,
                fechaCreacion,
                usuario,
                publicacion,
            },
            { new: true }
        );
        if (!comentarioActualizado) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.json(comentarioActualizado);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el comentario" });
    }
};

export const deleteComentario = async (req, res) => {
    try {
        const comentarioEliminado = await Comentario.findByIdAndDelete(req.params.id);
        if (!comentarioEliminado) {
            return res.status(404).json({ message: "Comentario no encontrado" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el comentario" });
    }
};

export const deleteComentarioByFechaAndPublicacion = async (req, res) => {
    const { fecha, publicacionId } = req.body;
    try {
        const result = await Comentario.findOneAndDelete({ fechaCreacion: fecha, publicacion: publicacionId });
        res.json({ message: "Comentario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al borrar comentarios por fecha y publicación" });
    }
};

