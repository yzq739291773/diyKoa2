const DiyKoa = require('./application')
const app = new DiyKoa()

// app.use(async(ctx) => {
//     console.log(1111, ctx.url)
//     ctx.body = 'hello yzq' + ctx.url
//         // res.writeHead(200)
//         // res.end('hello yzq1')
// })
app.use(async(ctx, next) => {
    ctx.body = '1'
    await next()
    ctx.body += '2'
})
app.use(async(ctx, next) => {
    ctx.body += '3'
    await delay()
    await next()
    ctx.body += '4'
})
app.use(async(ctx, next) => {
    ctx.body += '5'
})

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

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