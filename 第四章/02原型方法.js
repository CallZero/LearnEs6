//ES5的原型方法
let person = {
    getGreeting() {
        return "Hello";
    }
};
let dog = {
    getGreeting() {
        return "Woof";
    }
};
// 原型为 person
let friend = Object.create(person);
console.log(friend.getGreeting()); // "Hello"
console.log(Object.getPrototypeOf(friend) === person); // true
// 将原型设置为 dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof"
console.log(Object.getPrototypeOf(friend) === dog); // true


//ES5若要覆盖对象实例的一个方法、但依然要调用原型上的同名方法，你可能会这么做
person = {
    getGreeting() {
        return "Hello";
    }
};
dog = {
    getGreeting() {
        return "Woof";
    }
};
friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
// 将原型设置为 person
Object.setPrototypeOf(friend, person);
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(Object.getPrototypeOf(friend) === person); // true
// 将原型设置为 dog
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting()); // "Woof, hi!"
console.log(Object.getPrototypeOf(friend) === dog); // true

//ES6使用 super 引用的简单原型访问

friend = {
    getGreeting() {
        // 这相当于上个例子中的：
        // Object.getPrototypeOf(this).getGreeting.call(this)
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, dog);
console.log(friend.getGreeting());

//这种情况下Object.getPrototypeOf() 不再适用于所有场景，例如：

person = {
    getGreeting() {
        return "Hello";
    }
};
// 原型为 person
friend = {
    getGreeting() {
        return Object.getPrototypeOf(this).getGreeting.call(this) + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
// 原型为 friend
let relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
//console.log(relative.getGreeting()); // error!Maximum call stack size exceeded 循环调用导致栈溢出

//此问题在 ES5 中很难解决，但若使用 ES6 的 super ，就很简单了：
person = {
    getGreeting() {
        return "Hello";
    }
};
// 原型为 person
friend = {
    getGreeting() {
        return super.getGreeting() + ", hi!";
    }
};
Object.setPrototypeOf(friend, person);
// 原型为 friend
relative = Object.create(friend);
console.log(person.getGreeting()); // "Hello"
console.log(friend.getGreeting()); // "Hello, hi!"
console.log(relative.getGreeting()); // "Hello, hi!"