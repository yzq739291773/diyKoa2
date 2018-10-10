let demo = {
    _name: 'yzq',
    get _name() {
        return '不给你'
    },
    set _name(val) {
        console.log("设置值")
        this._name = val
    }
}

console.log(demo._name)
    // demo._name = 'aaa'
    // console.log(demo._name)