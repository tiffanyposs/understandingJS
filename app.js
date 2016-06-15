class Person {

	constructor(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}

	greet() {
		return 'Hi ' + this.firstname;
	}

}

var john = new Person('John', 'Doe')



