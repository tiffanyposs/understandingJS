var Tiffany = {
	firstname: "Tiffany",
	lastname: "Poss",
	address: {
		street: "111 Main Street",
		city: "New York",
		state: "NY"
	}
}


function greet(person) {
	console.log("Hello " + person.firstname);
}

greet(Tiffany)