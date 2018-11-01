import jwt from 'jsonwebtoken';
import db from './dbQuery';

class Auth {
  static async verifyToken (req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(401).send({
        success: 'False',
        message: 'Unauthorized User',
      });
    }
    try{
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(!rows[0]) {
        return res.status(401).send({
          success: 'False',
          message: 'Unauthorized User',
        });
      }
      req.user = { id: decoded.id };
      next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }

  static async isAdmin (req, res, next) {
    try{
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.id]);
      for(i = 0; i < rows.length; i++){
        if(rows[rows.length - 1] !== 'superadmin')
          return res.status(401).send({
            success: 'False',
            message: 'Unauthorized User',
          });
      }
      req.user = { id: decoded.id };
      next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }
}
export default Auth;
