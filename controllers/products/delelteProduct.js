const { response } = require("express");
const User = require("../../models/User");
const Products = require("../../models/Products");

const deleteProduct = async (req, res = response) => {
  const { uid, productId } = req.params; // Obtener el ID del producto de los parámetros de la URL

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    // Buscar el producto por su ID y eliminarlo de la base de datos
    const productoEliminado = await Products.findByIdAndDelete(productId);

    if (!productoEliminado) {
      // Si el producto no se encontró en la base de datos
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Respondemos con un mensaje indicando que el producto ha sido eliminado
    res.status(200).json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    // Manejar errores
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};

module.exports = deleteProduct;
