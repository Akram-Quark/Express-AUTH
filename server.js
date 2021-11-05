const express = require("express");
const router = require("./routs/myRouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();
//todo::middleware initialization::////
app.use(bodyParser.json());
app.use("/api/user", router);
//*::servers setup and run ⭐:://///////
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Database connected 🖐️"))
  .catch((err) => console.log(err));
app.listen(PORT, () => console.log(PORT + ": listening 😸"));
