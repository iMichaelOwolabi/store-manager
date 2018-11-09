import inMemorySalesRecord from '../../model/sales';
import db from '../../utility/dbQuery';
import { realpathSync } from 'fs';

class SalesController {
  // get all sales record
  static async getAllSales (req, res) {

    const salesQuery = 'SELECT * FROM sales';
    try{
      const { rows } = await db.query(salesQuery);
      return res.status(200).send({
        success: true,
        message: 'All sales record found',
        sales: rows,
      });
    }
    catch(error){
      return res.status(400).send({
        success: 'False',
        message: 'There is an error with this query',
        error,
      });
    } 
  }

  // get one user sales record
  static async getOneUserSales(req, res) {
    const { userId } = req.params;
    const salesQuery = 'SELECT * FROM sales WHERE userid=$1';
    try{
      const { rows } = await db.query(salesQuery, [userId]);
      if(!rows[0]){
        return res.status(404).send({
          success: false,
          message: 'Sales record not found',
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Below is the specified sales record',
        Data: {
          UserSales: rows,
        },
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
    const salesQuery = 'INSERT INTO sales(productid,quantity,amount,userid) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [productId, quantity, amount, userId];

    try{
      const { rows } = await db.query(salesQuery, values);
      return res.status(201).send({
        success: true,
        message: 'Sales record created successfully',
        result: rows[0],
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
