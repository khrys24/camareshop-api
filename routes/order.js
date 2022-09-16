const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

router.get('/list', (req, res) => { // { status: 'completed' }
    db.query(
        `SELECT * FROM orders where status = ${req.body.status}`,
        (err, rows) => {
            if(err) {
                return console.log(err.message);
            }

            res.send(rows);
        }
    );
});

router.get('/add', (req, res) => {
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

   


module.exports = router;
