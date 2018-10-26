import inMemoryUser from '../../model/users';

// get all user
const getUsers = (req, res) => {
	res.status(200).json(inMemoryUser);
};

// get a single user
const getOneUser = (req, res) => {
	const { id } = req.params;
	const user = inMemoryUser.filter( theUser => theUser.id === parseInt(id) )[0];
	if(!user){
    res.status(404).json('The specified user does not exist on this platform');
    return;
	}
	else{
		res.status(200).json(user);
	}
};

// create user
const postUser = (req, res) => {
	const { username, password } = req.body;

	const lastId = inMemoryUser.length;
	const id = lastId + 1;

	const newUser = { id: id, username: username, password: password, role: 'user' };

	inMemoryUser.push(newUser);

	res.status(201).location(`/api/users/${id}`).json(newUser);
};
// update user
const updateUser = (req, res) => {
  const { id } = req.params;
  const user = inMemoryUser.filter(theUser => theUser.id === parseInt(id))[0];
  const {username, password, role} = req.body;
  if(!user) {
		res.status(404).json('There is no user with the given information on this platform');
		return;
  }
  
  const userUpdate = {id: id, username: username, password: password, role: role};
  const userIndex = inMemoryUser.indexOf(user);
  inMemoryUser[userIndex] = userUpdate;

  res.status(201).json(userUpdate);
  
};

// delete user
const deleteUser = (req, res) => {
  const { id } = req.params;
  const user = inMemoryUser.filter(theUser => theUser.id === parseInt(id))[0];

  if(!user) {
		res.status(404).json('There is no user with the given information on this platform');
		return;
	}
  const userIndex = inMemoryUser.indexOf(user);
  inMemoryUser.splice(userIndex, 1);
  res.status(200).json('The user has been successfully deleted');
}
export default(getUsers, getOneUser, postUser, updateUser, deleteUser);