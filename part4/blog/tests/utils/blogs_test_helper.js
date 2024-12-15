const Blog = require('../../models/blog');

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
  
const newBlog = {
  title: "React Hooks",
  author: "Jane Popper",
  url: "http://www.jccodesblog.com",
  likes: 9
};

const resetDb = async () => {
  await Blog.deleteMany({});

  const insertPromiseArray = initialBlogs.map(blog => new Blog(blog).save());
  await Promise.all(insertPromiseArray);
}

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog.toJSON());
}

module.exports = {
  initialBlogs, 
  newBlog, 
  resetDb, 
  blogsInDb
}