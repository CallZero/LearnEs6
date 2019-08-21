let uid = Symbol.for("uid");
let uid2 = Symbol.for("uid2");
let object = {
    [uid]: "12345",
    [uid2]: "123456",
    ab3c: '123'
};
let symbols = Object.getOwnPropertySymbols(object);
console.log(symbols.length); // 1
console.log(symbols[0]); // "Symbol(uid)"
console.log(object[symbols[0]]); // "12345"

console.log(symbols[1]); // "Symbol(uid)"
console.log(object[symbols[1]]); // "12345"