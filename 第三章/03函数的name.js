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