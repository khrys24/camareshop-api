const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
const userController = require('../controllers/userController');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get('/cities', (req, res) => {
    db.query(
        `SELECT * FROM cities`,
        (err, rows) => {
            if(err) {
                return console.log(err.message);
            }

            res.send(rows);
        }
    );
});
   

router.post('/register', userController.register);
router.post("/login", userController.login);
router.get("/", userController.fetchusers);
router.get("/:id", userController.getUser);
router.post("/:id", userController.update);
router.delete("/:id", userController.delete);


module.exports = router;
