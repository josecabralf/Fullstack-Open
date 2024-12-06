const dummy = (blogs) =>  1;

const totalLikes = (blogs) =>  blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favouriteBlog = (blogs) => {
    if (blogs.length === 0) 
        return null;

    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) 
        return null;

    const authors = {};
    blogs.forEach(b => {
        if (authors[b.author]) authors[b.author] += 1;
        else authors[b.author] = 1;
    });

    const author = Object.keys(authors).reduce((max, author) => (authors[author] > authors[max] ? author : max), Object.keys(authors)[0]);
    return { author, blogs: authors[author] };
};

const mostLikes = (blogs) => {
    if (blogs.length === 0) 
        return null;

    const authors = {};
    blogs.forEach(b => {
        if (authors[b.author]) authors[b.author] += b.likes;
        else authors[b.author] = b.likes;
    });

    const author = Object.keys(authors).reduce((max, author) => (authors[author] > authors[max] ? author : max), Object.keys(authors)[0]);
    return { author, likes: authors[author] };
};

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}