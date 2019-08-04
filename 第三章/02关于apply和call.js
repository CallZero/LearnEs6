function test1(a, b, ...c) {
    console.log(a, b)
    console.log(...c)
}

function test2(a, b, ...c) {
    console.log("B", a, b, ...c)
}

let num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let num1 = 111;
let num2 = 222;
test2.call(test1, num)
test2.call(test1, num1, num2)
test2.call(test1, ...num)
test2.apply(test1, num)  //apply会自动将num展开 call 不会展开，需要使用...来展开数组,或者一个参数一个参数的输入
///test2.apply(test1, ...num) 这么写会报错
