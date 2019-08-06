//Object.is() 方法
console.log('Object.is() 方法------------------------');

console.log(+0 == -0); // true
console.log(+0 === -0); // true
console.log(Object.is(+0, -0)); // false
console.log('------------------------');
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log('------------------------');

console.log(5 == 5); // true
console.log(5 == "5"); // true
console.log(5 === 5); // true
console.log(5 === "5"); // false
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, "5")); // false

//Object.assign() 方法
console.log('Object.assign() 方法------------------------');

function mixin(receiver, supplier) {
    Object.keys(supplier).forEach(function (key) {
        receiver[key] = supplier[key];
    });
    return receiver;
}

function class1() {}
class1.prototype = {
    emit: function () {
        console.log('something');
    }
}
var class2 = {}
//class2复制了class1.prototype中所有的内容
mixin(class2, class1.prototype)
class2.emit()
//class2复制了class1.prototype中所有的内容

var receiver = {};
Object.assign(receiver, {
    type: "js",
    name: "file.js"
}, {
    type: "css",
    abc: 222
});
console.log(receiver); // "{ type: 'css', name: 'file.js', abc: 222 }"


console.log('自有属性的枚举顺序------------------------');
var obj = {
    a: 1,
    0: 1,
    c: 1,
    2: 1,
    d: 1,
    1: 1
};
obj.b = 1;
console.log(Object.getOwnPropertyNames(obj).join("")); // "012acbd"