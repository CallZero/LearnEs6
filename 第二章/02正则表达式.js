let t = 'ジ   b'

function code(text) {
    let res = text.match(/[\s\S]/gu)
    console.log(res);
    return res ? text.length : 0
}

console.log(code(t));

//检测是否支持u修饰符
//y修饰符也可以这样检测
function hasRegExpU() {
    try {
        var pattern = new RegExp(".", "u")
        //var pattern = new RegExp(".", "y")  检测y修饰符
        return true
    } catch (ex) {
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

var s = 'aaa_aba_a';
var r1 = /a+/g;
var r2 = /a+_/y;


console.log(r1.exec(s)) //["aaa", index: 0, input: "aaa_aa_a"]
console.log(r2.exec(s)) //["aaa_", index: 0, input: "aaa_aa_a"]
console.log(r1.exec(s)) //["aa", index: 4, input: "aaa_aa_a"]
console.log(r2.exec(s)) //["aa_", index: 4, input: "aaa_aa_a"]
console.log(r1.exec(s)) //["a", index: 7, input: "aaa_aa_a"]
console.log(r2.exec(s)) //null

//匹配ab且不区分大小写 i修饰符：不区分大小写
let re1 = /ab/i

let re2 = new RegExp(re1, 'g')

console.log(re1.toString());
console.log(re2.toString());

//访问正则的source属性，获取正则的内容
console.log(re1.source);

//访问正则的flags属性，获取正则的修饰符
console.log(re1.flags);