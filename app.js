var arr = [
	1,
	false,
	{
		name: "Tiffany",
		address: "111 Main Street"
	},
	function(name) {
		var greeting = "Hello";
		console.log(greeting + " " + name)
	},
	"hello"
];

var greet = arr[3](arr[2].name);
console.log(greet);