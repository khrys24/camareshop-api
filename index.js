const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

const port = process.env.port;
const hostname = "localhost";

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("public", express.static(path.join(__dirname, "/public")));
const directory = path.join(__dirname, "/public/images");
app.use("/images", express.static(directory));

//Fix cors error
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// console.log('process.env', process.env);
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

//Routes
app.use("/users", require("./routes/user"));
app.use("/orders", require("./routes/order"));
app.use("/products", require("./routes/product"));

app.listen(process.env.port || port, () => {
  console.log(`Server started at http://${hostname}:${port}`);
  db.connect((err) => {
    if (err) {
      console.log("Database error: " + err);
    } else {
      console.log("DB connected");
    }
  });
});
