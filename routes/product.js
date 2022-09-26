const express = require("express");
const router = express.Router();
// const mysql = require('mysql2');
const productController = require("../controllers/productController");
const multer = require("multer");
const path = require("path");

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, callback) => {
    const fileName =
      Date.now() + "_" + file.fieldname + path.extname(file.originalname);
    callback(null, fileName);
  },
});

const upload = multer({
  storage: storage,
});

const imageUpload = upload.fields([{ name: "image" }]);

router.get("/list", productController.products);
router.get("/productList", productController.productList);
router.get("/:id", productController.getProduct);
/* router.post("/:id", productController.updateProduct); */
router.delete("/:id", productController.delete);
router.post("/addproduct", imageUpload, productController.addproduct);

module.exports = router;
