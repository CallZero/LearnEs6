let t = 'ジ   b'

function code(text) {
    let res = text.match(/[\s\S]/gu)
    console.log(res);
    return res ? text.length : 0
}

console.log(code(t));

function hasRegExpU() {
    try {
        var pattern = new RegExp(".", "u")
        return true
    }
    catch (ex) {
        return false
    }
}

console.log(hasRegExpU())

t = 'atdatewsdcat'

//禁止这样调用正则，因为二次调用的时候，会从之前的索引处继续匹配
var p = /[cb]at/i
console.log(p.test(t))

//正则表达式都用这种方法创建
var ren = new RegExp('[cb]at', 'i')
console.log(ren.test(t))

//repeat 字符重复次数
let str = '?'
console.log(str.repeat(10))


