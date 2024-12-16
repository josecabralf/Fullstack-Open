const bcrypt = require('bcrypt');
const User = require('../../models/user');

const initialUsers = [
  {
    username: 'jcabralf',
    name: 'Jose Cabral',
    password: 'sekret',
  }
];

const newUser = {
  username: 'newUser',
  name: 'New User',
  password: 'secret_password',
};

const resetDb = async () => {
  await User.deleteMany({});

  const insertPromiseArray = initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await new User({ ...user, passwordHash }).save();
  });
  
  await Promise.all(insertPromiseArray);
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
}

module.exports = {
  initialUsers, 
  newUser, 
  resetDb, 
  usersInDb
}