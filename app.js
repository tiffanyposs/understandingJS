var greeting = "Hola";

(function(global) {
	console.log(global.greeting) // #1 Hola
	var greeting = "Hello";

	//resets the global variable
	global.greeting = "Bonjour";

	console.log("function ---> ", greeting); // #2 Hello
	console.log(greeting) // # 3 Hello
})(window)

console.log("global ---> ", greeting);  // #4 Bonjour





