function Person(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
}

Person.prototype.getFullName = function() {
	return this.firstname + ' ' + this.lastname;
}

var john = new Person('John', 'Doe');
console.log(john);

for(var prop in john) {
	if( john.hasOwnProperty(prop) ){
	  console.log(prop + ': ' + john[prop]);
	}
}

console.log(john.__proto__);



var num = new Number(3);
console.log(num); // {[[PrimativeVlaue]] : 3 }
console.log(num.toFixed()); // "3.00"

var string = new String('John');
console.log(string); // a very long object
console.log(string.indexOf('0')); // 1

//how to see the methods attached
//by looking at the prototype
console.log('Number ---> ', Number.prototype);
console.log('String ---> ', String.prototype);
console.log('Date ---> ', Date.prototype);



var name = "Tiffany";

String.prototype.isLongerThan = function(limit) {
	return this.length > limit;
}

console.log(name.isLongerThan(5)); // true
console.log(name.isLongerThan(7)); // false
console.log(name.isLongerThan(9)); // false
