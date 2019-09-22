const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const result = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return result;
};

const favoriteBlog = blogs => {
  const result = blogs.reduce((mostLiked, blog) => {
    return mostLiked.likes > blog.likes ? mostLiked : blog;
  }, []);

  return {
    title: result.title,
    author: result.author,
    likes: result.likes
  };
};

// with Lodash
const mostBlogs = blogs => {
  const blogsCountByAuthor = _.map(_.countBy(blogs, 'author'), (val, key) => ({
    author: key,
    blogs: val
  }));

  return blogsCountByAuthor.reduce((mostPopular, blogs) => {
    return mostPopular > blogs ? mostPopular : blogs;
  }, []);
};

/* without Lodash **/
// const mostBlogs = blogs => {
//   const authorsList = [];

//   blogs.forEach(blog => {
//     const index = authorsList.findIndex(
//       author => author.author === blog.author
//     );

//     // if index !== -1 then author is already in the list
//     const alreadyExist = index !== -1;

//     if (alreadyExist) {
//       authorsList[index] = {
//         author: blog.author,
//         blogs: authorsList[index].blogs + 1
//       };
//     } else {
//       authorsList.push({
//         author: blog.author,
//         blogs: 1
//       });
//     }
//   });

//   return authorsList.reduce((mostPopular, author) => {
//     return mostPopular.likes > author.likes ? mostPopular : author;
//   }, []);
// };

const mostLikes = blogs => {
  const authorsList = [];

  blogs.forEach(blog => {
    const index = authorsList.findIndex(
      author => author.author === blog.author
    );

    const alreadyExist = index !== -1 ? true : false;

    if (alreadyExist) {
      authorsList[index] = {
        author: blog.author,
        likes: authorsList[index].likes + blog.likes
      };
    } else {
      authorsList.push({
        author: blog.author,
        likes: blog.likes
      });
    }
  });

  return authorsList.reduce((mostLiked, author) => {
    return mostLiked.likes > author.likes ? mostLiked : author;
  }, []);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
