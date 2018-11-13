import bcrypt from 'bcrypt';
import db from  '../../utility/dbQuery';
import Helper from '../helper';

class UsersController {
// create user
  static async postUser(req, res) {
    const { username, password, role } = req.body;

    if (!req.body.username) {
      return res.status(400).json({
        success: false,
        message: 'username is required to register',
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'password is required to register',
      });
    }

    const userQuery = 'INSERT INTO users(username,password,role) VALUES ($1, $2, $3) RETURNING *';
    const hashedPassword = bcrypt.hashSync(password, 10);
    const values = [username, hashedPassword, role];
    try{
        const { rows } = await db.query(userQuery, values);
          return res.status(201).json({
            success: true,
            message: 'User successfully created',
            result: rows[0],
        })
    }
    catch(error) {
      return res.status(400).json({
        success: false,
        message: 'There is an error with this query',
        error,
      });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;
    
    if(!username || !password) {
      return res.status(400).send({
        success: false,
        message: 'Kindly enter username and password to proceed',
      });
    }
    const userQuery = 'SELECT * FROM users WHERE username=$1';
    try{
      const { rows } = await db.query(userQuery, [username]);
      if(!rows[0]){
        return res.status(400).send({
          success: false,
          message: 'Incorrect credentials',
        });
      }
      if(!Helper.comparePassword(rows[0].password, password)) {
        return res.status(400).send({
          success: false,
          message: 'Incorrect credentials',
        });
      };
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({ 
        success: true,
        message: 'You are welcome to the store manager',
        token
       });
    }
    catch(error) {
      return res.status(400).send({message: error});
    }
  }

  // get all users
  static async getUsers(req, res, next) {
    const userQuery = 'SELECT * FROM users';
    try{
    const { rows } = await db.query(userQuery);
      return res.status(200).json({
        success: true,
        message: 'All users on this platform',
        Users: rows,
      });
    }
    catch(err) {
        return res.status(400).send({
          success: false,
          message: 'There is an error with this query',
          err,
        });
    }
  }

  static async getOneUser(req, res) {
    const { id } = req.params;
    const userQuery = 'SELECT * FROM users WHERE id = $1';

    try{
      const { rows } = await db.query(userQuery, [id]);
      if (!rows[0]) {
        return res.status(404).send({
          success: false,
          message: 'The specified user does not exist on this platform',
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Below is the specified user',
        users: rows[0],
      });
    }
    catch(error) {
      return res.status(400).send({
        success: false,
        message: 'Kindly check the values supplied and try again',
      });
    }
  }


  // update user
  static async updateUser(req, res) {
    const { id } = req.params;
    const { role } = req.body;

    const findUser = 'SELECT * FROM users WHERE id=$1';
    const updateQuery = 'UPDATE users SET role=$1 WHERE id=$2 RETURNING *';

    try{
      const { rows } = await db.query(findUser, [id]);
      if(!rows[0]) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
    }
    const values = [role, id];

    const users = await db.query(updateQuery, values);
    return res.status(200).send({
      success: true,
      message: 'User\'s information successfully updated',
      data: users.rows[0],
    });
    }
    catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default UsersController;
