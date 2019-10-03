const listHelper = require('../utils/list_helper');
const helper = require('./test_helper');

test('dummy returns one', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);

  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    const emptyList = [];
    expect(listHelper.totalLikes(emptyList)).toBe(0);
  });

  test('when list has only one blog equals the likes of that', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
          'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ];

    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.initialBlogs)).toBe(175);
  });

  //   test.only('only this test will run', () => {
  //     console.log('This is helpful while debugging a test');
  //     expect(1).toBe(1);
  //   });

  // OR,
  // npx jest -t 'name of the test'
  // Eg: npx jest -t 'of a bigger list is calculated right'
});

describe('favorite blog', () => {
  test('the blog with highest likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs);
    const expected = {
      title: 'Gray Moon',
      author: 'Tony Fireman',
      likes: 60
    };
    expect(result).toEqual(expected);
  });
});

describe('author with most blogs', () => {
  test('the author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs);

    const expected = {
      author: 'Tony Fireman',
      blogs: 3
    };

    expect(result).toEqual(expected);
  });
});

describe('author with most likes', () => {
  test('the author with most likes', () => {
    const result = listHelper.mostLikes(helper.initialBlogs);

    const expected = {
      author: 'Tony Fireman',
      likes: 120
    };

    expect(result).toEqual(expected);
  });
});
