const express = require('express');
const router = express.Router();
// const mysql = require('mysql2');
const productController = require('../controllers/productController');

// const db = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
// });

router.get('/list', productController.products);

module.exports = router;
