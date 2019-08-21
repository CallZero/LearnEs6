//为了理解该方法是如何工作的，可研究下述代码：
let obj = [1, 2, 3]
console.log(obj instanceof Array);
//上面这句代码等价于：
console.log(Array[Symbol.hasInstance](obj));