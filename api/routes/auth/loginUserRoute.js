const { Router } = require("express");
const loginUser = require("../../controllers/auth/loginUser");
const createUser = require("../../controllers/auth/CreateUser");
const { validateFields } = require("../../middleware/validateFields");
const { check } = require("express-validator");
const changePassword = require("../../controllers/auth/changePasswordUser");
const { existeUsuarioPorId } = require("../../helpers/db-validators");
const updateUser = require("../../controllers/auth/udpateInfoUser");
const validatePassword = require("../../controllers/auth/validatePassword");

const router = Router();

router.post(
  "/",
  [
    check("email", "El correo electrónico  es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    validateFields,
  ],
  loginUser
);

router.post(
  "/register",
  [
    //middlewares
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El correo electrónico  es obligatorio.").isEmail(),
    check("password", "La contraseña debe tener mínimo 6 caracteres.").isLength(
      {
        min: 6,
      }
    ),
    check("lastname", "El apellido  es obligatorio.").not().isEmpty(),
    check("country", "El país es obligatorio.").not().isEmpty(),
    check("phone", "El teléfono debe ser un número válido.")
      .optional()
      .isNumeric(),
    check("city", "La cuidad es obligatoria.").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.put(
  "/change-password/:id",
  [
    // check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validateFields,
  ],

  changePassword
);

router.put(
  "/updateInfo/:uid",
  [
    check("uid", "El id del usuario es obligatorio.").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.post(
  "/validate-password/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
  ],

  validatePassword
);
module.exports = router;
