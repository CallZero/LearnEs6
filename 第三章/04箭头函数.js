let person = ((name) => {
    return {
        getName: function () {
            return name;
        }
    };
})("Nicholas");
console.log(person.getName()); // "Nicholas"