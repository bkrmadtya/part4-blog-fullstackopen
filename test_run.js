const mostBlogsWithLodash = require('./utils/list_helper').mostBlogsWithLodash;

const biggerList = [
  {
    title: 'New Moon',
    author: 'Harris Newman',
    url: 'www.newmoon.com',
    likes: 55,
    id: '5d60323b53440f25b490a68f'
  },
  {
    title: 'Blue Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 65,
    id: '5d603cb6a83ce627c84807b7'
  },
  {
    title: 'Blue Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 64,
    id: '5d603cdd3c51961b68b87346'
  },
  {
    title: 'Golden Moon',
    author: 'Tony Fireman',
    url: 'www.bluemoon.com',
    likes: 67,
    id: '5d603cf2c26aaf04745b2446'
  }
];

console.log(mostBlogsWithLodash(biggerList));
