const User = require("../../models/User");
// const bcrypt = require("bcrypt");

const changePassword = async (req, res ) => {
  const { id } = req.params;
  try {
    // Validate if the user exists (you can add more validations here
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Generate the hash of the new password
    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Update user password
    // user.password = hashedPassword;
    await user.save();

    //Here you can perform other actions like sending an email or generating a JWT token if needed

    res.json({
      msg: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

module.exports = changePassword;
