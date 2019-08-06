let doSth = function doSomethingElse() {

}

var person = {
    get firstName() {
        return "name1"
    },
    satName: function () {
        console.log(this.name)
    }
}

console.log(doSth.name)
console.log(person.satName.name)
console.log(person.firstName.name)
console.log(doSth.bind().name)


function person1(name) {
    this.name = name;
    console.log('pserson1 run')
}

person1('person2')

console.log(person1.name)

function Person(name) {
    if (typeof new.target !== "undefined") {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person.")
    }
}
var person = new Person("Nicholas");
//var notAPerson = Person.call(person, "Michael");  出错

//检查 new.target 是否被使用特定构造器进行了调用，例如以下代码：
function Person2(name) {
    if (new.target === Person2) {
        this.name = name; // 使用 new
    } else {
        throw new Error("You must use new with Person2")
    }
}

function AnotherPerson(name) {
    Person2.call(this, name);
}
var person = new Person2("Nicholas");
//var anotherPerson = new AnotherPerson("Nicholas"); // 出错！