
//function statement - is hoisted, has a name, and has a code property
function greet() {
	console.log('hi')
}

//function expression - is a function, does not have a name (nothing before the parateses), code property
var anonymousGreet = function() {
	console.log('hi')
}


function log(a) {
	// console.log(a());
	a()
}

log(function() {
	console.log("hi")
})