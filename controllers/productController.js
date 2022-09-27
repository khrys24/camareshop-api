const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

exports.products = (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    return res.status(200).json(result);
  });
};

exports.productList = (req, res) => {
  db.query(`SELECT * FROM products`, (err, result) => {
    if (err) {
      return console.log(err.message);
    }
    return res.status(200).json(result);
  });
};

exports.getProduct = (req, res) => {
  const id = req.params.id;
  db.query(
    `SELECT * FROM products
    WHERE product_id=?`,
    id,
    (err, result) => {
      if (err) {
        return console.log(err.message);
      }
      return res.status(200).json(result);
    }
  );
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, image, price } = req.body;

  console.log('updateProduct', req.body);
  db.query(
    `UPDATE products
      SET name = ?, description=?,  price = ?
      WHERE product_id= ? `,
    [name, description, price, id],
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Product Updated");
      return res.status(200).json({ message: "Product updated Successfully" });
    }
  );
};

exports.delete = (req, res) => {
  const id = req.params.id;

  db.query(`DELETE FROM products WHERE product_id = ?`, id, (err) => {
    if (err) {
      return console.log(err.message);
    }
    console.log(`Deleted Product ${id}`);
    res.json({ message: "Product has been deleted" });
  });
};

exports.addproduct = (req, res) => {
    // console.log()
  const { name, description, price } = req.body;
  const image = req.files.image[0];
  /*   const imagePath = req.protocol + "://"+req.get("host")+"/public/images/"+image.filename; */
  const imagePath = image.filename;

  db.query(
    `INSERT INTO products SET ?`,
    { name: name, description: description, image: imagePath, price: price },
    (err) => {
      if (err) {
        return console.log(err.message);
      }
      console.log("Product Added Successfully");
      res.send("Success!");
    }
  );
};
