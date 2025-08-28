const { response } = require("express");
const Products = require("../../models/Products");

const productsUser = async (req, res = response) => {
  try {
    // Obtener todos los productos de la base de datos
    const productos = await Products.find();

    // Devolver los productos en la respuesta
    res.status(200).json(productos);
  } catch (error) {
    // Manejar errores
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

module.exports = productsUser;
