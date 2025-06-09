const http = require('http');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command line arguments
const args = minimist(process.argv.slice(2));
const port = args.port || 3000;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url}`);

  if (req.url === '/' || req.url === '/home') {
    serveFile('home.html', res);
  } else if (req.url === '/project') {
    serveFile('project.html', res);
  } else if (req.url === '/registration') {
    serveFile('registration.html', res);
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

function serveFile(filename, res) {
  const filePath = path.join(__dirname, filename);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.end('Internal Server Error');
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.end(data);
    }
  });
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
