import db from  '../../utility/dbQuery';
import Validations from  '../../utility/validaions';

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
    const productsQuery = 'SELECT * FROM products WHERE productid = $1';

    if (!Validations.validNumber(id)) {
      return res.status(400).send({
        success: false,
        message: 'id must be a valid whole number other than zero(0)',
      });
    }

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
      productName, price, quantity, minQty, productImage
    } = req.body; 

    if (!productName || !price || !quantity || !minQty || !productImage){
      return res.status(400).send({
        success: false,
        message: 'all fields are required',
      });
    }
    if (!Validations.acceptableString(productName)) {
      return res.status(400).send({
        success: false,
        message: 'product name must contain only valid alphanumeric characters',
      });
    }
    if (!Validations.validPriceAndQuantity(price)) {
      return res.status(400).send({
        success: false,
        message: 'price must be a valid whole number other than zero(0)',
      });
    }
    if (!Validations.validPriceAndQuantity(quantity)) {
        return res.status(400).send({
          success: false,
          message: 'quantity must be a valid whole number other than zero(0)',
        });
    }
    if (!Validations.validImageUrl(productImage)) {
      return res.status(400).send({
        success: false,
        message: 'product image must be a valid url with the extension of jpeg, jpg, png, gif or svg',
      });
    }

    const findProduct = 'SELECT * FROM products WHERE productname=$1';
    try{
      const { rows } = await db.query(findProduct, [productName]);
      if(rows[0]){
        return res.status(400).send({
          success: false,
          message: 'product with that name already exist',
        });
      }
    }
    catch(error){
      return res.status(400).send({
        success: false,
        message: 'Kindly check the supplied values and try again',
        error,
      });
    }
    const productsQuery = 'INSERT INTO products(productname,price,quantity,mininventoryqty,productimage) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [productName, price, quantity, minQty, productImage];
    
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
      minQty,
      productImage,
    } = req.body;

    if (!Validations.validNumber(id)) {
      return res.status(400).send({
        success: false,
        message: 'id must be a valid whole number other than zero(0)',
      });
    }
    if (!productName || !price || !quantity || !minQty || !productImage){
      return res.status(400).send({
        success: false,
        message: 'all fields are required',
      });
    }
    if (!Validations.acceptableString(productName)) {
      return res.status(400).send({
        success: false,
        message: 'product name must contain only valid alphanumeric characters',
      });
    }
    if (!Validations.validPriceAndQuantity(price)) {
      return res.status(400).send({
        success: false,
        message: 'price must be a valid whole number other than zero(0)',
      });
    }
    if (!Validations.validPriceAndQuantity(quantity)) {
        return res.status(400).send({
          success: false,
          message: 'quantity must be a valid whole number other than zero(0)',
        });
    }
    if (!Validations.validImageUrl(productImage)) {
      return res.status(400).send({
        success: false,
        message: 'product image must be a valid url with the extension of jpeg, jpg, png, gif or svg',
      });
    }

    const findProduct = 'SELECT * FROM products WHERE productid = $1';
    const productsQuery = 'UPDATE products SET productname=$1, price=$2, quantity=$3, mininventoryqty=$4, productimage=$5 WHERE productid=$6 RETURNING *';

    try{
      const { rows } = await db.query(findProduct, [id]);
      if(!rows[0]){
        return res.status(404).send({
          success: false,
          message: 'product not found',
        });
      }
      const values = [productName, price, quantity, minQty, productImage, id];
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
    const findProduct = 'SELECT * FROM products WHERE productid = $1';

    if (!Validations.validNumber(id)) {
      return res.status(400).send({
        success: false,
        message: 'id must be a valid whole number other than zero(0)',
      });
    }

    try{
      const product = await db.query(findProduct, [id]);
      if(!product.rows[0]){
        return res.status(404).send({
          success: false,
          message: 'product not found',
        });
      }
    const productsQuery = 'DELETE FROM products WHERE productid=$1';
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
