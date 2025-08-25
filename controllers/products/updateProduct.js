const Products = require("../../models/Products");
const User = require("../../models/User");

const updateProduct = async (req, res = response) => {
  const { uid, productId } = req.params; // Obtener el ID del producto de los parámetros de la URL
  const { newData } = req.body; // Obtener los datos actualizados del producto de la solicitud

  try {
    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Agregar la fecha de actualización
    newData.updatedAt = Date.now();

    // Buscar el producto por su ID y actualizarlo con los nuevos datos
    const productoActualizado = await Products.findByIdAndUpdate(
      productId,
      newData,
      { new: true }
    );

    if (!productoActualizado) {
      // Si el producto no se encontró en la base de datos
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Respondemos con el producto actualizado
    res.status(200).json(productoActualizado);
  } catch (error) {
    // Manejar errores
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

module.exports = updateProduct;
