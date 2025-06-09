const http = require('http')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')

const args = minimist(process.argv.slice(2))
const port = args.port || 3000

const server = http.createServer((req, res) => {
  console.log(`Request URL: ${req.url}`)
  if (req.url === '/' || req.url === '/home') {
    serve('home.html', res)
  } else if (req.url === '/project') {
    serve('project.html', res)
  } else if (req.url === '/registration') {
    serve('registration.html', res)
  } else {
    res.writeHead(404)
    res.end('404 Not Found')
  }
})

function serve(filename, res) {
  const filePath = path.join(__dirname, filename)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end('500 Internal Server Error')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    }
  })
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
