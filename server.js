const http = require('http')

let server = http.createServer((req, res) => {
    res.writeHead(200)
    res.end('hello yzq0')
})

server.listen(9092, () => {
    console.log('serve11r start on port 9092')
})