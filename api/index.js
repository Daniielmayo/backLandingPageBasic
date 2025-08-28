const express = require("express");
const cors = require("cors");
const { dbConection } = require("./database/dbConfig");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
  "Access-Control-Allow-Origin": "*",
};

const app = express();

//todo conexion a la base datsos
dbConection();

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

//todo routes
const loginUserRoute = require("./routes/auth/loginUserRoute");
const ProductsUserRoute = require("./routes/products/productsUserRoute");

app.use("/api/auth", loginUserRoute);
app.use("/api/products", ProductsUserRoute);

app.listen(process.env.PORT, () => {
  console.log(`Listening port ${process.env.PORT}`);
});

module.exports = app;
