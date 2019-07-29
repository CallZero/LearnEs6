//变量提升
function getValue(c) {
  if (c) {
    var value = 20;
    return value;
  } else {
    return value;
  }
}

//这里的value相当于挂载在了window上（在网页中运行时是这样的）
/*问题？？
这个value运行再node上的时候，值挂载在了哪里？看完 深入浅出node.js后再来思考这个问题
*/
console.log(typeof value);
value = 20;
console.log(value);

//临时死区 TDZ
function getValue2() {
  let value;
  console.log(value);
}

//let和const 在循环中的应用
var funcs = [];
var object = {
  a: true,
  b: true,
  c: true,
};

//这里的let不能换成const 因为i的值改变了，用const会抛出错误
/*for (let i = 0; i < 10; i++) {
  funcs.push(function() {
    console.log(i);
  });
}*/

//这里的let可以改成const ，因为每次迭代会生成新的const的值，并没有修改之前的值
for (let key in object) {
  funcs.push(function () {
    console.log(key);
  });
}

funcs.forEach(function (func) {
  func();
});



console.log('v1' in window)
console.log(window.v1)
let v1 = 30;
console.log(window.v1 === v1)