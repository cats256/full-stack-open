const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((acc, cur) => (acc.likes > cur.likes ? acc : cur));

const mostBlogs = (blogs) => {
  const authorsCount = blogs.reduce((acc, blog) => {
    const existingAuthor = acc.find((accBlog) => accBlog.author === blog.author);

    if (existingAuthor) {
      existingAuthor.blogs += 1;
    } else {
      acc.push({ author: blog.author, blogs: 1 });
    }

    return acc;
  }, []);

  const authorMostBlogs = authorsCount.reduce((acc, author) => (
    author.blogs > acc.blogs ? author : acc
  ));

  return authorMostBlogs;
};

const mostLikes = (blogs) => {
  const authorsCount = blogs.reduce((acc, blog) => {
    const existingAuthor = acc.find((accBlog) => accBlog.author === blog.author);

    if (existingAuthor) {
      existingAuthor.likes += blog.likes;
    } else {
      acc.push({ author: blog.author, likes: blog.likes });
    }

    return acc;
  }, []);

  const authorMostLikes = authorsCount.reduce((acc, author) => (
    author.likes > acc.likes ? author : acc
  ));

  return authorMostLikes;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
