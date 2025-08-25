const { response } = require("express");
const User = require("../../models/User");
const updateUser = async (req, res = response) => {
  const { uid } = req.params;
  const newData = req.body;

  try {
    // Verificar si el usuario está intentando actualizar la propiedad 'admin'
    if (newData.hasOwnProperty("admin")) {
      // Si intenta actualizar la propiedad 'admin', devolver un error 404
      return res
        .status(404)
        .json({ error: "No se puede actualizar la propiedad 'admin'" });
    }

    // Buscar el usuario por su ID y actualizarlo con los nuevos datos
    const user = await User.findByIdAndUpdate(uid, newData, { new: true });

    if (!user) {
      // Si el usuario no se encontró en la base de datos
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Identificar las propiedades actualizadas
    const updatedFields = {};
    for (const key in newData) {
      if (newData.hasOwnProperty(key) && user[key] !== newData[key]) {
        updatedFields[key] = newData[key];
      }
    }

    // Eliminar la contraseña del objeto de usuario
    delete user.password;

    // Guardar el usuario actualizado
    await user.save();

    // Respondemos con el usuario actualizado y las propiedades que se actualizaron
    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        ...user.toObject(),
        // updatedFields,
      },
    });
  } catch (error) {
    // Manejar errores
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

module.exports = updateUser;
