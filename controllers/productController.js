const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.products = (req, res) => {
    db.query(
        `SELECT * FROM products`,
        (err, result) => {
            if(err) {
                return console.log(err.message);
            }
            return res.status(200).json(result);
        }
    );
}
