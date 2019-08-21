let uid1 = Symbol.for("uid")
let object = {};
object[uid1] = '12345';
let uid2 = Symbol.for("uid");

console.log(uid1); // "Symbol(uid)"
console.log(object[uid1]); // "12345"


console.log(uid2); // "Symbol(uid)"
console.log(object[uid2]); // "12345"