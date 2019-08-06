# 第四章

## 对象类别

### 对象类别包括：

- 普通对象：拥有 JS 对象所有默认的内部行为。
- 奇异对象：其内部行为在某些方面有别于默认行为。
- 标准对象：在 ES6 中被定义的对象，例如 Array 、 Date ，等等。标准对象可以是普通的，也可以是奇异的。
- 内置对象：在脚本开始运行时由 JS 运行环境提供的对象。所有的标准对象都是内置对象。

## 属性初始化器

```javascript
function createPerson(name, age) {
  return {
    name,
    age,
  };
}
```

## 方法的简写

```javascript
//ES5
var person = {
  name: 'Nicholas',
  sayName: function() {
    console.log(this.name);
  },
};

//ES6
var person = {
  name: 'Nicholas',
  sayName() {
    console.log(this.name);
  },
};
```

## 需计算属性名

```javascript
//ES5
var person = {},
  lastName = 'last name';
person['first name'] = 'Nicholas';
person[lastName] = 'Zakas';
console.log(person['first name']); // "Nicholas"
console.log(person[lastName]); // "Zakas"

var person = {
  'first name': 'Nicholas',
};
console.log(person['first name']); // "Nicholas"

//ES6
var lastName = 'last name';
var person = {
  'first name': 'Nicholas',
  [lastName]: 'Zakas',
};
console.log(person['first name']); // "Nicholas"
console.log(person[lastName]); // "Zakas"

//方括号内可以包含表达式
var suffix = ' name';
var person = {
  ['first' + suffix]: 'Nicholas',
  ['last' + suffix]: 'Zakas',
};
console.log(person['first name']); // "Nicholas"
console.log(person['last name']); // "Zakas"
```

## Object.assign() 方法用来复制一个“类”

```javascript
//ES5中使用的方法
function mixin(receiver, supplier) {
  Object.keys(supplier).forEach(function(key) {
    receiver[key] = supplier[key];
  });
  return receiver;
}

function EventTarget() {
  /*...*/
}
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function() {
    /*...*/
  },
  on: function() {
    /*...*/
  },
};
var myObject = {};
mixin(myObject, EventTarget.prototype);
myObject.emit('somethingChanged');

//ES6中使用的方法
function EventTarget() {
  /*...*/
}
EventTarget.prototype = {
  constructor: EventTarget,
  emit: function() {
    /*...*/
  },
  on: function() {
    /*...*/
  },
};
var myObject = {};
Object.assign(myObject, EventTarget.prototype);
myObject.emit('somethingChanged');
```

## Object.assign() 方法可以接受任意数量的供应者

```javascript
var receiver = {};
Object.assign(
  receiver,
  {
    type: 'js',
    name: 'file.js',
  },
  {
    type: 'css',
    abc: 222,
  },
);
console.log(receiver); // "{ type: 'css', name: 'file.js', abc: 222 }"
```

## Object.assign() 并未在接收者上创建访问器属性

### Object.getOwnPropertyDescriptor（）方法介绍

#### 如果指定的属性存在于对象上，则返回其属性描述符对象（property descriptor），否则返回 undefined。

### 一个属性描述符是一个记录，由下面属性当中的某些组成的：

### value

- 该属性的值(仅针对数据属性描述符有效)

### writable

- 当且仅当属性的值可以被改变时为 true。(仅针对数据属性描述有效)

### get

- 获取该属性的访问器函数（getter）。如果没有访问器， 该值为 undefined。(仅针对包含访问器或设置器的属性描述有效)

### set

- 获取该属性的设置器函数（setter）。 如果没有设置器， 该值为 undefined。(仅针对包含访问器或设置器的属性描述有效)

### configurable

- 当且仅当指定对象的属性描述可以被改变或者属性可被删除时，为 true。

##### enumerable

- 当且仅当指定对象的属性可以被枚举出时，为 true。

```javascript
var receiver = {},
  supplier = {
    get name() {
      return 'file.js';
    },
  };
Object.assign(receiver, supplier);
var descriptor = Object.getOwnPropertyDescriptor(receiver, 'name');
console.log(descriptor.value); // "file.js"
console.log(descriptor.get); // undefined
```

## 自有属性枚举时基本顺序如下：

1. 所有的数字类型键，按升序排列。
2. 所有的字符串类型键，按被添加到对象的顺序排列。
3. 所有的符号类型（详见第六章）键，也按添加顺序排列。

### 字符串类型的键会跟在数值类型的键之后，按照被添加到 obj 对象的顺序，在对象字面量中定义的键会首先出现，接下来是此后动态添加到对象的键。（所以下面代码 b 是后加入到 obj 中的，所以最后输出）

```javascript
var obj = {
  a: 1,
  0: 1,
  c: 1,
  2: 1,
  d: 1,
  1: 1,
};
obj.b = 1;
console.log(Object.getOwnPropertyNames(obj).join('')); // "012acdb"
```

## 更强大的原型

### 查看 02 原型方法.js

## 正式的“方法”定义

- ES6 则正式做出了定义：方法是一个拥有 [[HomeObject]] 内部属性的函数，此内部属性指向该方法所属的对象。
- 任何对 super 的引用都会使用 [[HomeObject]] 属性来判断要做什么。
- 第一步是在[[HomeObject]] 上调用 Object.getPrototypeOf() 来获取对原型的引用；
- 接下来，在该原型上查找同名函数；最后，创建 this 绑定并调用该方法。

```javascript
let person = {
  getGreeting() {
    return 'Hello';
  },
};
// 原型为 person
let friend = {
  getGreeting() {
    return super.getGreeting() + ', hi!';
  },
};
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"
```

调用 friend.getGreeting() 返回了一个字符串，也就是 person.getGreeting() 的返回值与
", hi!" 的合并结果。此时 friend.getGreeting() 的 [[HomeObject]] 值是 friend ，并且
friend 的原型是 person ，因此 super.getGreeting() 就等价于
person.getGreeting.call(this)
