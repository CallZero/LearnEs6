let node = {
        type: "Identifier",
        name: "foo",
        abc: 'asdfasdfasdf'
    },
    type = "Literal",
    name = 5;

function outputInfo(value) {
    console.log(value === node); // true
    console.log(value.abc);
}
//对 type 与 name 的赋值正常进行，同时 node 也被传入了outputInfo() 函数。
outputInfo({
    type,
    name
} = node);
console.log(type); // "Identifier"
console.log(name); // "foo"

node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1
        },
        end: {
            line: 1,
            column: 4
        }
    }
};
let {
    loc: {
        start: {
            line
        }
    }
} = node;
console.log(line); // 1
//console.log(start.column); // 1