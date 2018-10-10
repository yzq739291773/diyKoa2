const http = require('http')

let request = {
    get url() {
        return this.req.url
    }
}

let response = {
    get body() {
        // console.log(this)
        return this._body
    },
    set body(val) {
        this._body = val
    }
}

let contex = {
    get url() {
        return this.request.url
    },
    get body() {
        return this.response.body
    },
    set body(val) {
        this.response.body = val
    }
}

class Application {
    constructor() {
        // this.callback = () => {}
        this.contex = contex
        this.request = request
        this.response = response
        this.middlewares = []
    }

    use(callback) {
        this.middlewares.push(callback)
        this.callback = callback
    }
    compose(middlewares) {
        return function(context) {
            return dispatch(0)

            function dispatch(i) {
                let fn = middlewares[i]
                if (!fn) {
                    return Promise.resolve()
                }
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1)
                }))
            }
        }
    }
    listen(...args) {
        const server = http.createServer(async(req, res) => {
            // console.log(2222, res._body)
            let ctx = this.createCtx(req, res)
            const fn = this.compose(this.middlewares)
            await fn(ctx)
            console.log(333, ctx.body)
            ctx.res.end(ctx.body)
        })
        server.listen(...args)
    }
    createCtx(req, res) {
        let ctx = Object.create(this.contex)
        ctx.request = Object.create(this.request)
        ctx.response = Object.create(this.response)

        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res

        return ctx
    }
}

module.exports = Application