const DiyKoa = require('./application')
const app = new DiyKoa()

app.use(async(ctx) => {
    console.log(1111, ctx.url)
    ctx.body = 'hello yzq' + ctx.url
        // res.writeHead(200)
        // res.end('hello yzq1')
})

app.listen(9092, () => {
    console.log('server start on port 9092')
})



// 原生node 起一个服务

// const http = require('http')

// let server = http.createServer((req, res) => {
//     res.writeHead(200)
//     res.end('hello yzq0')
// })

// server.listen(9092, () => {
//     console.log('serve11r start on port 9092')
// })