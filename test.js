async function fn1(next) {
    console.log('fn1')
    await next()
    console.log('end fn1')
}

async function fn2(next) {
    console.log('fn2')
    await delay()
    await next()
    console.log('end fn2')
}

async function fn3(next) {
    console.log('fn3')
}

function delay() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 2000)
    })
}

function compose(middlewares) {
    return function() {
        return dispatch(0)

        function dispatch(i) {
            let fn = middlewares[i]
            if (!fn) {
                return Promise.resolve()
            }
            return Promise.resolve(fn(function next() {
                return dispatch(i + 1)
            }))
        }
    }
}
const middlewares = [fn1, fn2, fn3]
const finalFn = compose(middlewares)
finalFn()



// let demo = {
//     _name: 'yzq',
//     get _name() {
//         return '不给你'
//     },
//     set _name(val) {
//         console.log("设置值")
//         this._name = val
//     }
// }

// console.log(demo._name)
// demo._name = 'aaa'
// console.log(demo._name)