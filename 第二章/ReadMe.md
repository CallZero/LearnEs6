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
var p = /[cb]at/i
console.log(p.test(t))

//正则表达式都用这种方法创建
var ren = new RegExp('[cb]at', 'i')
console.log(ren.test(t))
```

 + 使用正则表达式字面量必须直接调用RegExp构造函数，每次创建新的RegExp实例
