// var arr1 = [1,2,3];

// var arr2 = _.map(arr1, function(item) { return item * 3});
// console.log(arr2);

// var arr3 = _.filter([1,2,3,4,5,6,7], function(item) { return item % 2 === 0 });
// console.log(arr3);


var person = {
	firstname: 'Default',
	lastname: 'Default',
	getFullName: function() {
		return this.firstname + ' ' + this.lastname
	}
}

var john = {
	firstname: 'John',
	lastname: 'Doe'
}

//don't do this EVER! for demo only
john.__proto__ = person;


for(var prop in john) {
	if( john.hasOwnProperty(prop) ){
	  console.log(prop + ': ' + john[prop]);
	}
}

var jane = {
	address: '111 Main Street',
	getFormalFullName: function() {
		return this.lastname + ', ' + this.firstname;
	}
}


var jim = {
	getFirstName: function() {
		return this.firstname;
	}
}

_.extend(john, jane, jim);


console.log(john);




// console.log(john.getFullName());  // John Doe
// console.log(john.firstname);  // John



// var jane = {
// 	firstname: 'Jane'
// }

// jane.__proto__ = person;
// console.log(jane.getFullName());  // Jane Default
// console.log(jane.lastname);  // Default



