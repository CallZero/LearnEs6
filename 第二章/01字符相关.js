let text = '好的'

console.log(text.codePointAt(0)) //获取字符编码

let t2 = "123"

t2 = String.fromCodePoint(text.codePointAt(0)) //字符编码转字符

console.log(t2)


//字符标准化问题

let s1 = ['水电  费这   ', '我认为是']

//s1.normalize() //默认nfc形式，可用参数 nfd nfc nfkc

let s2 = s1.sort(function (a, b) {
    let aa = a.normalize()
    let bb = b.normalize()
    console.log(aa > bb)
    //字符串可以直接比较但是不能做 减 操作进行比较
    if (bb > aa)
        return -1;
    else
        return 1;
})

console.log(s2)

//如果要将字符排序，需要先标准化后再排序