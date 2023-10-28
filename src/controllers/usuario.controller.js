import Usuario from "../models/usuario.model.js";

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

export const getUsuarioByEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await Usuario.find({ email });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar usuarios por email" });
  }
};

export const createUsuario = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const usuarioEncontrado = await Usuario.findOne({ email });
    if (usuarioEncontrado)
      return res.status(400).json(["El email está en uso"]);

    const nuevoUsuario = new Usuario({
      nombre,
      email,
    });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const updateUsuario = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      req.params.id,
      {
        nombre,
        email,
      },
      { new: true }
    );
    if (!usuarioActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
};
