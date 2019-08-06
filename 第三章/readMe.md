# 第三章

## 关于块级函数

### ES5 在严格模式下不支持块级函数，在非严格模式下，会把块级函数做一次提升，提升成全局函数。

## 箭头函数

### 形式 1

```javascript
var reflect = value => value;
// 有效等价于：
var reflect = function(value) {
  return value;
};
```

### 形式 2

```javascript
var sum = (num1, num2) => num1 + num2;
// 有效等价于：
var sum = function(num1, num2) {
  return num1 + num2;
};
```

### 形式 3

#### 没有参数的情况下，需要加个空括号

```javascript
var getName = () => 'Nicholas';
// 有效等价于：
var getName = function() {
  return 'Nicholas';
};
```

### 形式 4

```javascript
var sum = (num1, num2) => {
  return num1 + num2;
};
// 有效等价于：
var sum = function(num1, num2) {
  return num1 + num2;
};
```

### 形式 5

#### 空函数

```javascript
var doNothing = () => {};
// 有效等价于：
var doNothing = function() {};
```

### 形式 6

#### 花括号被用于表示函数的主体，它在你至今看到的例子中都工作正常。

#### 但若箭头函数想要从函数体内向外返回一个对象字面量，就必须将该字面量包裹在圆括号内

```javascript
var getTempItem = id => ({ id: id, name: 'Temp' });
// 有效等价于：
var getTempItem = function(id) {
  return {
    id: id,
    name: 'Temp',
  };
};
```

### 使用箭头函数来创建立即调用函数，只要将其包裹在括号内即可

```javascript
let person = (name => {
  return {
    getName: function() {
      return name;
    },
  };
})('Nicholas');
console.log(person.getName()); // "Nicholas"
```

## 箭头函数没有 this 绑定

### 数组自定义排序

```javascript
var result = values.sort((a, b) => a - b);
```

### 当满足以下条件时，尾调用优化会清除当前栈帧并再次利用它，而不是为尾调用创建新的栈帧：

1. 尾调用不能引用当前栈帧中的变量（意味着该函数不能是闭包）；
2. 进行尾调用的函数在尾调用返回结果后不能做额外操作；
3. 尾调用的结果作为当前函数的返回值。
