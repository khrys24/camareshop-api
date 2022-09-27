const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.list = (req, res) => {
    console.log('req.query ==> ', req.query);
    let userSql = '';

    if(req.query.is_admin !== '1') {
        userSql = 'WHERE orders.user_id = ?';
    }

    db.query(
        `SELECT CONCAT(users.first_name, " ", users.last_name) AS "name",
            orders.order_id,
            orders.contact_number,
            orders.address,
            cities.name AS "city",
            cities.zipcode,
            orders.date_delivered,
            orders.total,
            orders.status
            FROM orders
        INNER JOIN cities ON cities.city_id = orders.city_id
        INNER JOIN users ON users.user_id = orders.user_id 
        ${userSql}`, 
        req.query.user_id,
        (err, result) => {
            if(err) {
                return res.status(500).json(err.message);
            }
            return res.status(200).json(result);
        }
    );
}

exports.orderItems = (req, res) => {
    db.query(
        `SELECT products.image,
            products.name,
            products.price,
            order_items.quantity,
            order_items.total
            FROM order_items
        INNER JOIN products ON products.product_id = order_items.product_id
        WHERE order_id = ?`,
        req.query.order_id,
        (err, result) => {
            if(err) {
                return res.status(500).json(err.message);
            }
            return res.status(200).json(result);
        }
    );
}

exports.statusChange = (req, res) => {
    db.query(
        `UPDATE orders
        SET status = ?
        WHERE order_id = ?`,
        [req.body.status,
        req.body.order_id],
        (err, result) => {
            if(err) {
                return res.status(500).json(err.message);
            }
            return res.status(200).json("Successfully updated order status!");
        }
    );
}

exports.cancelOrder = (req, res) => {
    db.query(
        `DELETE FROM orders WHERE order_id = ?`,
        req.body.order_id,
        (err, result) => {
            if(err) {
                return res.status(500).json(err.message);
            }
            return res.status(200).json("Order cancelled!");
        }
    );
}
