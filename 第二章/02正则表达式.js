let t = 'ジ   b'

function code(text) {
    let res = text.match(/[\s\S]/gu)
    console.log(res);
    return res ? text.length : 0
}

//这行去掉
//?????

console.log(code(t));