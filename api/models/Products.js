const { Schema, model } = require("mongoose");

const ProductsSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  uuidImage: {
    type: String,
    require: true,
  },
  nameProduct: {
    type: String,
    required: true,
  },
  descriptionProduct: {
    type: String,
    required: true,
  },
  imageProduct: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  priceOff: {
    type: Number,
    default: null,
  },
  saving: {
    type: Number,
    default: null,
  },
  link4lifeProduct: {
    type: String,
    require: true,
  },
});

const Products = model("Products", ProductsSchema);

module.exports = Products;
