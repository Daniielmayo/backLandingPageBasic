const { response } = require("express");
const User = require("../../models/User");
const bcrypt = require('bcrypt');
const { triggerJWT } = require("../../helpers/jwt");

const loginUser = async(req, res = response) => {
 
  const {email, password} = req.body
  try {
    
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).json({
        ok:false,
        message:"Usuario o contraseña incorrecta"
      })
    }

    const validatePassword = bcrypt.compareSync(password, user.password)

    if(!validatePassword){
      return res.status(400).json({
        ok:false,
        message:"Usuario o contraseña incorrecta"
      })
    }

    const token = await triggerJWT(
      user.id,
      user.name,
      user.lastname,
      user.image,
      user.email,
      user.country,
      user.city,
      user.phone,
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
      message: "Error en credenciales de usuario",
    });
  }

};

module.exports = loginUser;
