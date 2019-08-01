//模板字符串不需要转译双引号，如下
let msg = `"nihao"`
console.log(msg);

//多行转译字符串 直接换行即可，啥都不用加
msg = `第一行
  第二行`
/*
需要注意的是，这里空格也会当做字符存进去*/
console.log(msg);

//模板字符串可以插入变量
let name = "hehe"
msg = `hello ${name}`
console.log(msg);

//模板字符串支持运算

let num = 10;
msg = `num=${num*100}`
console.log(msg);

//模板字符串可以继续嵌套模板字符串

let msg2 = `字符串2`
msg = `字符串1
${msg2}`
console.log(msg);

msg = `字符串1 
${`字符串3 
${msg2}`}`

console.log(msg);

//标签模板字符串
//看一个简单的例子
var a = 5;
var b = 10;

function tag(s, ...v) {
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v[0]);
    console.log(v[1]);
    return "ok";
}
msg = tag `Hello ${a+b} world ${a*b}`;
console.log(msg);
//"Hello "
//" world "
//""
//15
//50
//"ok"