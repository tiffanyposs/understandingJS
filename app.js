var Person = function(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
}

Person.prototype.getFullName = function() {
	return this.firstname + ' ' + this.lastname;
}

function person(firstname, lastname) {
	return new Person(firstname, lastname);
}

var john = person('John', 'Doe');

console.log(john.getFullName());

