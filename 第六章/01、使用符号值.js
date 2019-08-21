let firstName = Symbol("first name");
// 使用一个需计算字面量属性
let person = {
    [firstName]: "Nicholas"
};
// 让该属性变为只读
//直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
Object.defineProperty(person, firstName, {
    writable: false
});
let lastName = Symbol("last name");
//直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。
Object.defineProperties(person, {
    [lastName]: {
        value: "Zakas",
        writable: false
    }
});
console.log(person[firstName]); // "Nicholas"
console.log(person[lastName]); // "Zakas"