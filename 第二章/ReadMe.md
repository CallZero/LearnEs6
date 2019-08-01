# 第二章

## 1、字符标准化问题

- 如果需要将字符排序，需要向将字符标准化后再排序

```javascript
//字符标准化问题

let s1 = ['水电  费这   ', '我认为是'];

//s1.normalize() //默认nfc形式，可用参数 nfd nfc nfkc

let s2 = s1.sort(function(a, b) {
  let aa = a.normalize();
  let bb = b.normalize();
  console.log(aa - bb); //这种操作会返回nan
  //字符串可以直接比较但是不能做 减 操作进行比较
  if (bb > aa) return -1;
  else return 1;
});

console.log(s2);

//如果要将字符排序，需要先标准化后再排序
```

### 字符串可以直接比较但是不能做 减 操作进行比较

## 2、正则表达式

### 重要内容

```javascript
//禁止这样调用正则，因为二次调用的时候，会从之前的索引处继续匹配
var p = /[cb]at/i;
console.log(p.test(t));

//正则表达式都用这种方法创建
var ren = new RegExp('[cb]at', 'i');
console.log(ren.test(t));
```

- 使用正则表达式字面量必须直接调用 RegExp 构造函数，每次创建新的 RegExp 实例

### 正则表达式 y 修饰符

```javascript
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+_/y;

console.log(r1.exec(s)); //["aaa", index: 0, input: "aaa_aa_a"]
console.log(r2.exec(s)); //["aaa_", index: 0, input: "aaa_aa_a"]
console.log(r1.exec(s)); //["aa", index: 4, input: "aaa_aa_a"]
console.log(r2.exec(s)); //["aa_", index: 4, input: "aaa_aa_a"]
console.log(r1.exec(s)); //["a", index: 7, input: "aaa_aa_a"]
console.log(r2.exec(s)); //null
```

- y 修饰符的作用与 g 修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g 修饰符只要剩余位置中存在匹配就可，而 y 修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的含义。
- 当使用 y 修饰符的时候匹配不到相应字符串的时候（返回 null)，再次调用会从头（lastindex=0 的位置）开始匹配，g 修饰符与此相同，但是由于 g 修饰符的特性，g 修饰符相当于全部匹配完成后再重新匹配。

## 获取正则表达式的 2 个主要属性

```javascript
//访问正则的source属性，获取正则的内容
console.log(re1.source);

//访问正则的flags属性，获取正则的修饰符
console.log(re1.flags);
```

## 3 、模板字符串

```javascript
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
  return 'ok';
}
msg = tag`Hello ${a + b} world ${a * b}`;
console.log(msg);
//"Hello "
//" world "
//""
//15
//50
//"ok"
```

## 标签模板字符串，主要作用就是，对相应的数据进行计算后再拼接到模板中
