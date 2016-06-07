// function makeGreeting(language) {

// 	return function(firstname, lastname) {

// 		if(language === 'en') {
// 			console.log('Hello ' + firstname + ' ' + lastname)
// 		}

// 		if(language === 'es') {
// 			console.log('Hola ' + firstname + ' ' + lastname)
// 		}

// 	}

// }

// var greetEnglish = makeGreeting('en');
// var greetSpanish = makeGreeting('es');

// greetEnglish('Jane', 'Doe');
// greetSpanish('John', 'Doe');


// function sayHiLater() {

// 	var greeting = "Hi!";

// 	setTimeout(function() {

// 		console.log(greeting)

// 	}, 3000);

// }

// sayHiLater();





function tellMeWhenDone(callback) {
	var a = 1000;
	var b = 2000;

	callback();
}

tellMeWhenDone(function() {

	alert("I am done!")
	
});

tellMeWhenDone(function() {

	console.log("I am done!")

});
