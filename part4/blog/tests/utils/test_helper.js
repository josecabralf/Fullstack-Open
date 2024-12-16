const bcrypt = require('bcrypt');
const Blog = require('../../models/blog');
const User = require('../../models/user');

const initialBlogs = [
  {
    title: "Hello World",
    author: "James A. Doe",
    url: "http://www.jccodesblog.com",
    likes: 3
  },
  {
    title: "JS Basics",
    author: "Fred K. Simmons",
    url: "http://www.jccodesblog.com",
    likes: 5
  }
];

const initialUsers = [
  {
    username: 'jcabralf',
    name: 'Jose Cabral',
    password: 'sekret'
  }
];

const newBlog = {
  title: "React Hooks",
  author: "Jane Popper",
  url: "http://www.jccodesblog.com",
  likes: 9
};

const newUser = {
  username: 'newUser',
  name: 'New User',
  password: 'secret_password'
};

const resetDb = async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const userInsertPromiseArray = initialUsers.map(async (user) => {
    const passwordHash = await bcrypt.hash(user.password, 10);
    await new User({ ...user, passwordHash }).save();
  });
  await Promise.all(userInsertPromiseArray);

  const user = await User.findOne({username: 'jcabralf'});
  const blogInsertPromiseArray = initialBlogs.map(blog => new Blog({...blog, user: user.id}).save());
  await Promise.all(blogInsertPromiseArray);

  const blogs = await Blog.find({});
  user.blogs = blogs.map(blog => blog.id);
  await user.save();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

const aUser = async () => {
  const user = await User.findOne({});
  return user.toJSON();
};

module.exports = {
  initialBlogs,
  initialUsers,
  newBlog,
  newUser,
  resetDb,
  blogsInDb,
  usersInDb,
  aUser
};