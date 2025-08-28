const { Router } = require("express");
const productsUser = require("../../controllers/products/produtcsUser");
const createProductsUser = require("../../controllers/products/createProductsUser");
const { validateFields } = require("../../middleware/validateFields");
const { check } = require("express-validator");
const deleteProduct = require("../../controllers/products/delelteProduct");
const updateProduct = require("../../controllers/products/updateProduct");

const router = Router();

router.get("/", productsUser);

router.post(
  "/createProduct",

  [
    check("nameProduct", "El nombre del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("descriptionProduct", "La descripción del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("imageProduct", "La imagen del producto es obligatorio.")
      .not()
      .isEmpty(),
    check("price", "El precio del producto es obligatorio y debe ser numérico.")
      .notEmpty()
      .isNumeric(),
    validateFields,
  ],
  createProductsUser
);

router.delete(
  "/:uid/:productId",
  [
    check("uid", "El id del usuario es obligatorio.").not().isEmpty(),
    check("productId", "El id del usuario es obligatorio.").not().isEmpty(),
    validateFields,
  ],
  deleteProduct
);

router.put(
  "/:uid/:productId",
  [
    check("uid", "El id del usuario es obligatorio.").not().isEmpty(),
    check("productId", "El id del usuario es obligatorio.").not().isEmpty(),
    validateFields,
  ],
  updateProduct
);

module.exports = router;
