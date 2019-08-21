# 第五章

## 对象解构

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
};
let { type, name } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
```

## 你使用解构赋值语句时，如果所指定的本地变量在对象中没有找到同名属性，那么该变量会被赋值为 undefined

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
};
let { type, name, value } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value); // undefined
```

## 选择性地定义一个默认值，以便在指定属性不存在时使用该值。若要这么做，需要在属性名后面添加一个等号并指定默认值，就像这样

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
};
let { type, name, value = true } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value); // true
```

## ES6 有一个扩展语法，允许你在给本地变量赋值时使用一个不同的名称，而且该语法看上去就像是使用对象字面量的非简写的属性初始化。这里有个示例

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
};
let { type: localType, name: localName } = node;
console.log(localType); // "Identifier"
console.log(localName); // "foo"
```

## 可以给变量别名添加默认值，依然是在本地变量名称后添加等号与默认值，例如：

```javascript
let node = {
  type: 'Identifier',
};
let { type: localType, name: localName = 'bar' } = node;
console.log(localType); // "Identifier"
console.log(localName); // "bar"
```

## 嵌套的对象解构

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    },
  },
};
let {
  loc: { start },
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
```

## 在对象的嵌套解构中同样能为本地变量使用不同的名称

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    },
  },
};
// 提取 node.loc.start
let {
  loc: { start: localStart },
} = node;
console.log(localStart.line); // 1
console.log(localStart.column); // 1
```

## 数组解构

```javascript
let colors = ['red', 'green', 'blue'];
let [firstColor, secondColor] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"

let colors = ['red', 'green', 'blue'];
let [, , thirdColor] = colors;
console.log(thirdColor); // "blue"
```

## 解构赋值

```javascript
let colors = ['red', 'green', 'blue'],
  firstColor = 'black',
  secondColor = 'purple';
[firstColor, secondColor] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"
```

## 数组解构赋值有一个非常独特的用例，能轻易地互换两个变量的值

```javascript
// 在 ES5 中互换值
let a = 1,
  b = 2,
  tmp;
tmp = a;
a = b;
b = tmp;
console.log(a); // 2
console.log(b); // 1

// 在 ES6 中互换值
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a); // 2
console.log(b); // 1
```

## 数组解构赋值同样允许在数组任意位置指定默认值。当指定位置的项不存在、或其值为 undefined ，那么该默认值就会被使用。

```javascript
let colors = ['red'];
let [firstColor, secondColor = 'green'] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"
```

## 嵌套的解构

```javascript
let colors = ['red', ['green', 'lightgreen'], 'blue'];
// 随后
let [firstColor, [secondColor]] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"
```

## 剩余项

```javascript
let colors = ['red', 'green', 'blue'];
let [firstColor, ...restColors] = colors;
console.log(firstColor); // "red"
console.log(restColors.length); // 2
console.log(restColors[0]); // "green"
console.log(restColors[1]); // "blue"
```

## 克隆数组

```javascript
// 在 ES5 中克隆数组
var colors = ['red', 'green', 'blue'];
var clonedColors = colors.concat();
console.log(clonedColors); //"[red,green,blue]"

// 在 ES6 中克隆数组
let colors = ['red', 'green', 'blue'];
let [...clonedColors] = colors;
console.log(clonedColors); //"[red,green,blue]"
```

## 混合解构

```javascript
let node = {
  type: 'Identifier',
  name: 'foo',
  loc: {
    start: {
      line: 1,
      column: 1,
    },
    end: {
      line: 1,
      column: 4,
    },
  },
  range: [0, 3],
};
let {
  loc: { start },
  range: [startIndex],
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
console.log(startIndex); // 0
```

## 参数解构

```javascript
//ES5要这么写
// options 上的属性表示附加参数
function setCookie(name, value, options) {
  options = options || {};
  let secure = options.secure,
    path = options.path,
    domain = options.domain,
    expires = options.expires;
  // 设置 cookie 的代码
}
// 第三个参数映射到 options
setCookie('type', 'js', {
  secure: true,
  expires: 60000,
});

//ES6改进后这么写
function setCookie(name, value, { secure, path, domain, expires }) {
  // 设置 cookie 的代码
}
setCookie('type', 'js', {
  secure: true,
  expires: 60000,
});
```

## 参数解构的默认值

```javascript
function setCookie(
  name,
  value,
  {
    secure = false,
    path = '/',
    domain = 'example.com',
    expires = new Date(Date.now() + 360000000),
  } = {},
) {
  // ...
}
```
