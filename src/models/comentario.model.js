import mongoose from "mongoose";

const comentarioSchema = new mongoose.Schema({
    contenido: String,
    fechaCreacion: Date,
    usuario : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
    publicacion : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Publicacion"
    }
})

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;