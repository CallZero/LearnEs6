let collection = {
    0: 'Hello',
    1: 'world',
    2: '????',
    length: 3, //可以通过这里的数值控制复制的个数，如果是2的话，？？？就不会被复制
    [Symbol.isConcatSpreadable]: true,
    //这里加了这行后，让collection这个类可以像数组一样进行拼接操作
};
let messages = ['Hi'].concat(collection);
console.log(messages.length); // 3
console.log(messages); // ["hi","Hello","world"]