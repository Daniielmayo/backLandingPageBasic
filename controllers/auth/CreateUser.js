const { response } = require("express");
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { triggerJWT } = require("../../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        message: "Un usuario ya existe con este correo electronico",
      });
      
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    user.admin = false;
    user.image =
      "http://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png";
    await user.save();

    const token = await triggerJWT(
      user.id,
      user.name,
      user.lastname,
      user.image,
      user.email,
      user.country,
      user.city,
      user.phone
    );

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      lastname: user.lastname,
      image: user.image,
      email: user.email,
      country: user.country,
      city: user.city,
      phone: user.phone,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      message: "error en la creacion de usuario",
    });
  }
};

module.exports = createUser;
