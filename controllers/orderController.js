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
        `UPDATE orders
        SET status = 'cancelled'
        WHERE order_id = ?`,
        req.body.order_id,
        (err, result) => {
            if(err) {
                return res.status(500).json(err.message);
            }
            return res.status(200).json("Order cancelled!");
        }
    );
}

exports.placeOrder = (req, res) => {
    console.log(req.body);
    const {
        user_id,
        phone,
        address,
        city,
        state,
        total,
        items
       
      } = req.body;

    db.query(
        `INSERT INTO orders SET ?`,
        {
            contact_number: phone,
            address: address,
            country: "PH",
            total: total,
            status: "pending",
            user_id: user_id,
            city_id: city

        },
        (err, result) => {
            if (err) {
              return console.log(err.message);
            }

            let order_items = [];

            for(let i in items) {
                order_items.push([
                    items[i].product_id,
                    typeof items[i].quantity == 'string' ? parseInt(items[i].quantity, 10) : items[i].quantity,
                    items[i].total,
                    result.insertId
                ]);
            }
            console.log('order_items', order_items);
            db.query(
                `INSERT INTO order_items (product_id, quantity, total, order_id) VALUES ?`,
                [order_items],
                (err) => {
                    if (err) {
                      return console.log(err.message);
                    }

                    console.log("Order Submitted");
                     res.send("Success!");
                });
          }
        
    );
};
