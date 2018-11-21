import db from '../../utility/dbQuery';
import Validations from  '../../utility/validaions';

class SalesController {
  // get all sales record
  static async getAllSales (req, res) {

    const salesQuery = 'SELECT sales.salesid, products.productname, sales.quantity, amount, products.productimage, userid FROM sales INNER JOIN products ON sales.productid=products.productid';
    try{
      const { rows } = await db.query(salesQuery);
      return res.status(200).send({
        success: true,
        message: 'sales record',
        data: rows,
      });
    }
    catch(error){
      return res.status(400).send({
        success: false,
        message: 'There is an error with this query',
        error,
      });
    } 
  }

  // get one user sales record
  static async getOneUserSales(req, res) {
    const { salesId } = req.params;

    if (!Validations.validNumber(salesId)) {
        return res.status(400).send({
          success: false,
          message: 'sales id must be a valid whole number other than zero(0)',
        });
    }
    const salesQuery = 'SELECT sales.salesid, products.productname, sales.quantity, amount, products.productimage, userid FROM sales INNER JOIN products ON sales.productid=products.productid WHERE sales.salesid = $1';
    try{
      const { rows } = await db.query(salesQuery, [salesId]);
      if(!rows[0]){
        return res.status(404).send({
          success: false,
          message: 'sales record not found',
        });
      }
      return res.status(200).send({
        success: true,
        message: 'specified sales record',
        data: rows,
      });
    }
    catch(error){
      return res.status(400).send({
        success: false,
        message: 'Bad Request',
        error,
      });
    }
  }

  // create a sales record
  static async postSales(req, res) {
    const {
      productId,
      quantity,
      amount,
      userId,
    } = req.body;

    if (!productId || !quantity || !amount || !userId){
      return res.status(400).send({
        success: false,
        message: 'all fields are required',
      });
    }
    if (!Validations.validQuantity(productId)) {
        return res.status(400).send({
          success: false,
          message: 'product id must be a valid whole number other than zero(0)',
        });
    }
    if (!Validations.validQuantity(quantity)) {
        return res.status(400).send({
          success: false,
          message: 'quantity must be a valid whole number other than zero(0)',
        });
    }
    if (!Validations.validPrice(amount)) {
        return res.status(400).send({
          success: false,
          message: 'amount must be a valid positive number other than zero(0)',
        });
    }
    if (!Validations.validQuantity(userId)) {
        return res.status(400).send({
          success: false,
          message: 'user id must be a valid whole number other than zero(0)',
        });
    }

    const findUser = 'SELECT * FROM users WHERE userid=$1';
    try{
      const { rows } = await db.query(findUser, [userId]);
      if(!rows[0]){
        return res.status(400).send({
          success: false,
          message: 'user with that id cannot be found',
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
    const findProduct = 'SELECT * FROM products WHERE productid=$1';
    try{
      const { rows } = await db.query(findProduct, [productId]);
      if(!rows[0]){
        return res.status(400).send({
          success: false,
          message: 'product with that id cannot be found',
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

    const salesQuery = 'INSERT INTO sales(productid,quantity,amount,userid) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [productId, quantity, amount, userId];

    try{
      const { rows } = await db.query(salesQuery, values);
      return res.status(201).send({
        success: true,
        message: 'sales record created successfully',
        data: rows,
      });
    }
    catch(error){
      return res.status(400).send({
        success: false,
        message: 'There is an error with this query',
        error,
      });
    }
  }
}

export default SalesController;
