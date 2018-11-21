import jwt from 'jsonwebtoken';
import db from './dbQuery';

class Auth {
  static async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(401).send({
        success: false,
        message: 'Unauthorized User',
      });
    }
    try{
      const decoded = await jwt.verify(token, process.env.SECRET);
      req.decoded = decoded;
      const text = 'SELECT * FROM users WHERE userid = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(!rows[0]) {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized User4',
        });
      }
      req.user = { id: decoded.id };
      return next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }

  static async isAdmin (req, res, next) {
    const token = req.headers['x-access-token'];
    try{
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE userid = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(rows[0].role === "superadmin" || rows[0].role === "admin") {
        return next();
      }
      if(rows[0].role !== "superadmin" || rows[0].role !== "admin") {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized user',
        });
      }
      next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }

  static async isUser (req, res, next) {
    const token = req.headers['x-access-token'];
    try{
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE userid = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(rows[0].role !== 'user') {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized user',
        });
      }
      next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }

  static async isUserOrAdmin (req, res, next) {
    const token = req.headers['x-access-token'];
    try{
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE userid = $1';
      const { rows } = await db.query(text, [decoded.id]);
      if(rows[0].role !== 'user' || rows[0].role !== 'admin' || rows[0].role !== 'superadmin') {
        return res.status(401).send({
          success: false,
          message: 'Unauthorized user',
        });
      }
      next();
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }
}
export default Auth;
