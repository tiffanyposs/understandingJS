// var person = {
// 	firstname: "Tiffany",
// 	lastname: "Poss",
// 	getFullName: function() {
// 		var fullname = this.firstname + ' ' + this.lastname;
// 		return fullname;
// 	}
// }

// var person2 = {
// 	firstname: "Karl",
// 	lastname: "Poss"
// }

// console.log(person.getFullName.apply(person2));  // Karl Poss

// console.log(person.getFullName());






// function multiply(a, b) {
// 	return a*b
// }

// var multiplyByTwo = multiply.bind(this, 2);

// console.log(multiplyByTwo(5)); // 10


function mapForEach(arr, fn) {
	var newArray = [];
	for(var i = 0; i < arr.length; i++) {
		newArray.push(
			fn(arr[i])
		);
	}
	return newArray;
}

var array = [1,2,3]

//first example
var checkPastLimit = function(limiter, item) {
	return item > limiter;
}

var arr4 = mapForEach(array, checkPastLimit.bind(this, 1))
console.log(arr4); // [false, true, true]



//second example
var checkPastLimitSimplifed = function(limiter) {
	return function(limiter, item) {
		return item > limiter;
	}.bind(this, limiter);
}


var arr5 = mapForEach(array, checkPastLimitSimplifed(2));
console.log(arr5) // [false, false, true]



// var arr1 = [1,2,3];

// var arr2 = [];

// for(var i = 0; i < arr1.length; i++) {
// 	arr2.push(arr1[i] * 2);
// }

// console.log(arr2);