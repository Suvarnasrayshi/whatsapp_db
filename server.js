const express = require("express");
const app = express();
const sequelize = require("./utils/database");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const dataRoutes = require("./router/router");
require('dotenv').config();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cookieParser());
var corsOptions = {
  origin:'http://localhost:8080',
  credentials: true,
 };
  app.use(cors(corsOptions));
  app.use("/", dataRoutes);


// sequelize.sync({ force: false });
app.listen(process.env.PORT || 3003, () => {
  console.log("Running at Port 3003");
});
