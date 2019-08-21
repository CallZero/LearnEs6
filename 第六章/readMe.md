# 第六章

## 独一无二的值 Symbol()

```javascript
let firstName = Symbol();
let person = {};
person[firstName] = 'Nicholas';
console.log(person[firstName]); // "Nicholas"
```

## Symbol 函数还可以接受一个额外的参数用于描述符号值，该描述并不能用来访问对应属性，但它能用于调试，例如：

```javascript
let firstName = Symbol('first name');
let person = {};
person[firstName] = 'Nicholas';
console.log('first name' in person); // false
console.log(person[firstName]); // "Nicholas"
console.log(firstName); // "Symbol(first name)"
```

## 共享符号值

Symbol.for() 方法首先会搜索全局符号注册表，看是否存在一个键值为 "uid" 的符号值。
若是，该方法会返回这个已存在的符号值；否则，会创建一个新的符号值，并使用该键值将
其记录到全局符号注册表中，然后返回这个新的符号值。

```javascript
let uid = Symbol.for('uid');
let object = {
  [uid]: '12345',
};
console.log(object[uid]); // "12345"
console.log(uid); // "Symbol(uid)"
let uid2 = Symbol.for('uid');
console.log(uid === uid2); // true
console.log(object[uid2]); // "12345"
console.log(uid2); // "Symbol(uid)"
```

## 共享符号值还有另一个独特用法，你可以使用 Symbol.keyFor() 方法在全局符号注册表中根据符号值检索出对应的键值，例如：

```javascript
let uid = Symbol.for('uid');
console.log(Symbol.keyFor(uid)); // "uid"
let uid2 = Symbol.for('uid');
console.log(Symbol.keyFor(uid2)); // "uid"

//符号值 uid3 在全局符号注册表中并不存在，因此没有关联的键值， Symbol.keyFor() 方法只会返回 undefined 。
let uid3 = Symbol('uid');
console.log(Symbol.keyFor(uid3)); // undefined
```

## ES6 定义了“知名符号”来代表 JS 中一些公共行为，而这些行为此前被认为只能是内部操作。每一个知名符号都对应全局 Symbol 对象的一个属性.这些知名符号是：

- Symbol.hasInstance ：供 instanceof 运算符使用的一个方法，用于判断对象继承关系。
- Symbol.isConcatSpreadable ：一个布尔类型值，在集合对象作为参数传递给 Array.prototype.concat() 方法时，指示是否要将该集合的元素扁平化。
- Symbol.iterator ：返回迭代器（参阅第七章）的一个方法。
- Symbol.match ：供 String.prototype.match() 函数使用的一个方法，用于比较字符串。
- Symbol.replace ：供 String.prototype.replace() 函数使用的一个方法，用于替换子字符串。
- Symbol.search ：供 String.prototype.search() 函数使用的一个方法，用于定位子字符串。

- Symbol.species ：用于产生派生对象（参阅第八章）的构造器。
- Symbol.split ：供 String.prototype.split() 函数使用的一个方法，用于分割字符串。
- Symbol.toPrimitive ：返回对象所对应的基本类型值的一个方法。
- Symbol.toStringTag ：供 String.prototype.toString() 函数使用的一个方法，用于创建对象的描述信息。
- Symbol.unscopables ：一个对象，该对象的属性指示了哪些属性名不允许被包含在 with 语句中。

## Symbol.hasInstance 属性

每个函数都具有一个 Symbol.hasInstance 方法，用于判断指定对象是否为本函数的一个实例。这个方法定义在 Function.prototype 上，因此所有函数都继承了面对 instanceof 运算符时的默认行为。 Symbol.hasInstance 属性自身是不可写入、不可配置、不可枚举的，从而保证它不会被错误地重写。

```javascript
//为了理解该方法是如何工作的，可研究下述代码：
obj instanceof Array;
//上面这句代码等价于：
Array[Symbol.hasInstance](obj);
```

## 定义一个函数，使得任意对象都不会被判断为该函数的一个实例，你可以采用硬编码的方式让该函数的 Symbol.hasInstance 方法始终返回 false ，就像这样：

```javascript
function MyObject() {
  // ...
}
Object.defineProperty(MyObject, Symbol.hasInstance, {
  value: function(v) {
    return false;
  },
});
let obj = new MyObject();
console.log(obj instanceof MyObject); // false
```

## 可以基于各种条件来决定一个值是否应当被判断为某个类的实例。例如，将介于 1 到 100 之间的数值认定为一个特殊的数值类型，为此你可以书写如下代码：

```javascript
function SpecialNumber() {
  // empty
}
Object.defineProperty(SpecialNumber, Symbol.hasInstance, {
  value: function(v) {
    return v instanceof Number && (v >= 1 && v <= 100);
  },
});
let two = new Number(2),
  zero = new Number(0);
console.log(two instanceof SpecialNumber); // true
console.log(zero instanceof SpecialNumber); // false
```

## Symbol.isConcatSpreadable

concat() 方法用于将两个数组连接到一起

```javascript
let colors1 = ['red', 'green'],
  colors2 = colors1.concat(['blue', 'black']);
console.log(colors2.length); // 4
console.log(colors2); // ["red","green","blue","black"]
```

### Symbol.isConcatSpreadable 属性是一个布尔类型的属性，它表示目标对象拥有长度属性与数值类型的键、并且数值类型键所对应的属性值在参与 concat() 调用时需要被分离为个体。该符号与其他的知名符号不同，默认情况下并不会作为任意常规对象的属性。它只出现在特定类型的对象上，用来标示该对象在作为 concat() 参数时应如何工作，从而有效改变该对象的默认行为。你可以用它来定义任意类型的对象，让该对象在参与 concat() 调用时能够表现得像数组一样，例如：

```javascript
let collection = {
  0: 'Hello',
  1: 'world',
  length: 2,
  [Symbol.isConcatSpreadable]: true,
};
let messages = ['Hi'].concat(collection);
console.log(messages.length); // 3
console.log(messages); // ["hi","Hello","world"]
```

## Symbol.match 、 Symbol.replace 、 Symbol.search 与 Symbol.split

- match(regex) ：判断指定字符串是否与一个正则表达式相匹配；
- replace(regex, replacement) ：对正则表达式的匹配结果进行替换；
- search(regex) ：在字符串内对正则表达式的匹配结果进行定位；
- split(regex) ：使用正则表达式将字符串分割为数组。

- Symbol.match ：此函数接受一个字符串参数，并返回一个包含匹配结果的数组；若匹配失败，则返回 null 。
- Symbol.replace ：此函数接受一个字符串参数与一个替换用的字符串，并返回替换后的结果字符串。
- Symbol.search ：此函数接受一个字符串参数，并返回匹配结果的数值索引；若匹配失败，则返回 -1。
- Symbol.split ：此函数接受一个字符串参数，并返回一个用匹配值分割而成的字符串数组。

### 这里有一个例子，展示了这些符号的用法：

```javascript
// 有效等价于 /^.{10}$/
let hasLengthOf10 = {
  [Symbol.match]: function(value) {
    return value.length === 10 ? [value.substring(0, 10)] : null;
  },
  [Symbol.replace]: function(value, replacement) {
    return value.length === 10 ? replacement + value.substring(10) : value;
  },
  [Symbol.search]: function(value) {
    return value.length === 10 ? 0 : -1;
  },
  [Symbol.split]: function(value) {
    return value.length === 10 ? ['', ''] : [value];
  },
};
let message1 = 'Hello world', // 11 characters
  message2 = 'Hello John'; // 10 characters
let match1 = message1.match(hasLengthOf10),
  match2 = message2.match(hasLengthOf10);
console.log(match1); // null
console.log(match2); // ["Hello John"]
let replace1 = message1.replace(hasLengthOf10, 'Howdy!'),
  replace2 = message2.replace(hasLengthOf10, 'Howdy!');
console.log(replace1); // "Hello world"
console.log(replace2); // "Howdy!"
let search1 = message1.search(hasLengthOf10),
  search2 = message2.search(hasLengthOf10);
console.log(search1); // -1
console.log(search2); // 0
let split1 = message1.split(hasLengthOf10),
  split2 = message2.split(hasLengthOf10);
console.log(split1); // ["Hello world"]
console.log(split2); // ["", ""]
```

## Symbol.toPrimitive

```javascript
```

##

```javascript
```

##

```javascript
```

##

```javascript
```

##

```javascript
```

##

```javascript
```

##

```javascript
```

##

```javascript
```
