import inMemoryUser from '../../model/users';
import client from '../../utility/dbConnect';

class UsersController {
  // get all users
  static getUsers(req, res) {
    res.status(200).json({
      success: 'True',
      message: 'All users on this platform',
    });
  }

  static getOneUser(req, res) {
    const { id } = req.params;
    const user = inMemoryUser.filter(theUser => theUser.id === parseInt(id, 10))[0];
    if (!user) {
      return res.status(404).json({
        success: 'False',
        message: 'The specified user does not exist on this platform',
      });
    }
    return res.status(200).json({
      success: 'True',
      message: 'Below is the specified user',
      user,
    });
  }

  // create user
  static postUser(req, res) {
    const { username, password, role } = req.body;

    if (!req.body.username || !req.body.password || !req.body.role) {
      return res.status(400).json({
        success: 'False',
        message: 'All fields are required',
      });
    }

    const userQuery = 'INSERT INTO users(username,password,role) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, password, role];
    client.query(userQuery, values, (error, result) => {
      if (error) {
        return res.status(400).send({
          success: 'False',
          message: 'There is an error with this query',
          error,
        });
      }
      return res.status(201).json({
        success: 'True',
        message: 'User successfully created',
        result: result.rows[0],
      });
    });
    return res.status(201);
  }

  // update user
  static updateUser(req, res) {
    const { id } = req.params;
    const user = inMemoryUser.filter(theUser => theUser.id === parseInt(id, 10))[0];
    const { username, password, role } = req.body;
    if (!user) {
      return res.status(404).json({
        success: 'False',
        message: 'The specified user does not exist on this platform',
      });
    }

    const userUpdate = {
      id, username, password, role,
    };
    const userIndex = inMemoryUser.indexOf(user);
    inMemoryUser[userIndex] = userUpdate;

    return res.status(201).json({
      success: 'True',
      message: 'User\'s information successfully updated',
      userUpdate,
    });
  }

  // delete user
  static deleteUser(req, res) {
    const { id } = req.params;
    const user = inMemoryUser.filter(theUser => theUser.id === parseInt(id, 10))[0];

    if (!user) {
      return res.status(404).json({
        success: 'False',
        message: 'The specified user does not exist on this platform',
      });
    }
    const userIndex = inMemoryUser.indexOf(user);
    inMemoryUser.splice(userIndex, 1);
    return res.status(200).json({
      success: 'True',
      message: 'The user has been successfully deleted',
    });
  }
}

export default UsersController;
