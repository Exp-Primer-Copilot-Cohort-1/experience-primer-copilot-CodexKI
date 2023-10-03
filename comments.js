// Create web server
// Run: $ node comments.js
// Access: http://localhost:3000/comments

const http = require('http');
const url = require('url');
const qs = require('querystring');

const comments = [];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/comments') {
    if (req.method === 'GET') {
      const commentString = JSON.stringify(comments);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(commentString);
    } else if (req.method === 'POST') {
      let comment = '';
      req.on('data', (data) => {
        comment += data;
      });
      req.on('end', () => {
        const parsedComment = qs.parse(comment);
        const commentObj = {
          name: parsedComment.name,
          comment: parsedComment.comment,
        };
        comments.push(commentObj);
        res.writeHead(302, { Location: '/comments' });
        res.end();
      });
    }
  } else {
    res.writeHead(404, 'Not Found');
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});