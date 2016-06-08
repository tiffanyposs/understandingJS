var person = {
	firstname: "Tiffany",
	lastname: "Poss",
	getFullName: function() {
		var fullname = this.firstname + ' ' + this.lastname;
		return fullname;
	}
}

var person2 = {
	firstname: "Karl",
	lastname: "Poss"
}

console.log(person.getFullName.apply(person2));  // Karl Poss

console.log(person.getFullName());






function multiply(a, b) {
	return a*b
}

var multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(5)); // 10