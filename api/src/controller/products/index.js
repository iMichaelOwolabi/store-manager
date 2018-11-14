import db from  '../../utility/dbQuery';

class ProductsController {
  // get all products
  static async getAllProducts(req, res) {
    const productsQuery = 'SELECT * FROM products';
    try{
      const { rows } = await db.query(productsQuery);
        return res.status(200).json({
          success: true,
          message: 'all prodcts',
          data: rows,
        });
    }
    catch(error) {
      return res.status(400).send({
        success: false,
        message: 'There is an error with this query',
        error,
      });
    }
  }
  // get a single product
  static async getOneProduct(req, res) {
    const { id } = req.params;
    const productsQuery = 'SELECT * FROM products WHERE id = $1';

    try{
      const { rows } = await db.query(productsQuery, [id]);
      if (!rows[0]) {
        return res.status(404).send({
          success: false,
          message: 'product not found',
        });
      }
      return res.status(200).send({
        success: true,
        message: 'the product',
        data: rows[0]
      });
    }
    catch(error) {
      return res.status(400).send({
        success: false,
        message: 'Bad Request',
        error,
      });
    }
  }

  // create a product
  static async postProduct(req, res) {
    const {
      productName, price, quantity, productImage
    } = req.body; 

    if (!productName || !price || !quantity || !productImage){
      return res.status(400).send({
        success: false,
        message: 'all fields are required',
      });
    }
    const productsQuery = 'INSERT INTO products(productname,price,quantity,productimage) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [productName, price, quantity, productImage];
    
    try{
      const { rows } = await db.query(productsQuery, values);
        return res.status(201).json({
          success: true,
          message: 'product successfully added',
          data: rows[0],
      })
    }
    catch(error) {
      return res.status(400).send({
        success: false,
        message: 'There is an error with this query',
        error,
      });
    }
  }

  // update a particular product
  static async updateProduct(req, res) {
    const { id } = req.params;

    const {
      productName,
      price,
      quantity,
      productImage,
    } = req.body;

    const findProduct = 'SELECT * FROM products WHERE id = $1';
    const productsQuery = 'UPDATE products SET productname=$1, price=$2, quantity=$3, productimage=$4 WHERE id=$5 RETURNING *';

    try{
      const { rows } = await db.query(findProduct, [id]);
      if(!rows[0]){
        return res.status(404).send({
          success: false,
          message: 'product not found',
        });
      }
      const values = [productName, price, quantity, productImage, id];
      const prodcts = await db.query(productsQuery, values);
      return res.status(200).send({
        success: true,
        message: 'product updated successfully',
        data: prodcts.rows[0],
      });
    }
    catch(error) {
      return res.status(400).send({
        success: false,
        message: 'Bad request',
        error,
      })
    }
  }

  // delete a product
  static async deleteProduct(req, res) {
    const { id } = req.params;
    const findProduct = 'SELECT * FROM products WHERE id = $1';

    try{
      const product = await db.query(findProduct, [id]);
      if(!product.rows[0]){
        return res.status(404).send({
          success: false,
          message: 'product not found',
        });
      }
    const productsQuery = 'DELETE FROM products WHERE id=$1';
      const { rows } = await db.query(productsQuery, [id]);
      return res.status(200).send({
        success: true,
        message: 'product successfully deleted',
      })
    }
    catch(error){
      return res.status(400).send({
        success: false,
        message: 'Bad request',
      });
    }
  }
}

export default ProductsController;
