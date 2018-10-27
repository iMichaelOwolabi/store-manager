import inMemoryUser from '../../model/users';

// get all users
export const getUsers = (req, res) => {
  return res.status(200).json({
    success: 'True',
    message: 'All users on this platform',
    inMemoryUser,
  });
};

// get a single user
export const getOneUser = (req, res) => {
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
};

// create user
export const postUser = (req, res) => {
  const { username, password } = req.body;
  const lastId = inMemoryUser.length;
  const id = lastId + 1;
  const newUser = {
    id, username, password, role: 'user',
  };

  if (!req.body.username || !req.body.password || !req.body.role) {
    return res.status(400).json({
      success: 'False',
      message: 'All fields are required',
    });
  }
  inMemoryUser.push(newUser);

  return res.status(201).json({
    success: 'True',
    message: 'User successfully created',
    newUser,
  });
};

// update user
export const updateUser = (req, res) => {
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
};

// delete user
export const deleteUser = (req, res) => {
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
};
