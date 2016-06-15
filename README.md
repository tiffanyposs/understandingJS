##Understanding Javascript

Notes from Udemy Course **JavaScript: Understanding the Weird Parts** by *Anthony Alicea*

[Udemy Course Here](https://www.udemy.com/understand-javascript/learn/v4/overview)

###"Big Words"

* **Arguments** - The parameters you pass to a function.
* **Associativity** - What order *operator* functions get called in (left-to-right or right-to-left)
* **Asynchronous** - More than one at a time.
* **Callback Function** - A function you give to another function to be run when the other function is finished
* **Coercion** - Converting a value from one type to another
* **Currying** - Creating a copy of a function but with some preset params
* **Dynamic Typing** - You don't tell the engine what type of data a variable holds, it figures it out while your code is running. This means you don't have tell the code what datatype it's supposed to be.
* **Execution Contexts** - A wrapper that helps manage the code that is running. It can contain things beyond what you have written in your code. Any script that you have is wrapped in a execution script. This has two phases.
  * **Creation Phase** - First the engine sets up `Memory Space` for Variables and Functions. All variables in JavaScript are initially set to *undefined* before their actual value is set while functions are set in the memory in entirety.
  * **Execution Phase** - This is when the code actually runs.
* **Expression** - a unit of code that results in a value.
* **First Class Functions** - Everything you can do with other types you can do with functions. Assign variables, pass them around, create them on the fly.
* **Function Constructor** - a function that is used to construct objects.
* **Inheritance** - One object gets access to the properties and methods of another object
* **Immutable** - It cannot be changed.
* **Invocation** - Running a function
* **Lexical Environments** - Where something sits physically in the code you write. This exists in programming languages that it matters where something is located in  your code.
* **Mutate** - To change something. "Mutate an Object"
* **Namespace** - a container for variables and functions.
* **Operator** - A special function that is syntactically (written) different. Generally take two params and return one result. i.e. `1 + 2`
* **Operator Precedence** - Which *operator* gets called first
* **Polyfill** - Code that adds a feature which the engine *may* lack.
* **Primitive Type** - A type of data that represents a single value (not an object)
  * *undefined* - a lack of existence (you should not set a variable to this)
  * *null* - a lack of existence (you can set a variable to this)
  * *boolean* - *true* or *false*
  * *number* - floating point number. 
  * *string* - sequence of characters
  * *symbol* - for ES6 and not widely used... yet...
* **Reflection** - An object can look at itself, listing and changing its properties and methods
* **Scope** - Where a variable is available in your code.
* **Single Threaded** - One command is being executed at a time
* **Synchronous Execution** - One at a time in order
* **Syntactic Sugar** - A different way to *type* something that doesn't change how it works under the hood.
* **Syntax Parsers** - A program that reads your code and determines what it does and if its grammar/syntax is valid. Combs through you code character by character.
* **Variable Environments** - Where the variables live and how they relate to each other in memory
* **Whitespace** - Invisible characters that create literal "space" in your written code



###Objects

* **Name/Value Pair** - a name that maps to a unique value. It can be defined more than once but can only have one value at a time.
* **Object** - a collection of *Name/value* pairs (in JavaScript)


###Global Environment and Global Scope

The global scope is created when you run your js code. In your browser when you type `this` into the console it give you the `window` object. The window is the global object of browsers.

When you add something to you code, like a variable that is not inside of a function, it will get attached to the global object. So if you run it in the browser then type in `window`, somewhere in that list of *key/value* pairs will be your variable. If you create a variable named `a`, in the console you can run `a` or `window.a` and both will have the value of `a`.

* Global Object
* `this`
* Link to the Outer Environment

###Hoisting

```
  var a = "Hello World!";

  function b() {
	console.log("B was called")
  }

  b();
  console.log(a);
  
  //"B was called"
  //"Hello World!"

```


Notice below that a comes backed undefined. That doesn't' mean it doesn't exist yet, it does or the browser would have thrown an error. It exists but the value hasn't been assigned to it yet. 

```
  b();
  console.log(a);
  
  var a = "Hello World!";

  function b() {
	console.log("B was called")
  }
  
  //"B was called"
  // undefined

```


###Undefined vs "Is not defined"

*undefined* and *is not defined* are not the same. `undefined` happens when a variable exists but no value has been set yet. `is not defined` happens when a variable does not exist in the **Memory Space**.

Consider the below examples:

```
console.log(a);

// Uncaught ReferenceError: x is not defined

```
```
var a;
console.log(a);

// undefined

```

```
var a;
console.log(a);

a = "Hello World"

// undefined

```

Note NEVER set a variable to *undefined* yourself, this will make things extremely difficult to debug. Even though it is valid JS to do `a = undefined` it is really bad practice to do so.


###Function Evocation and The Execution Stack


Whenever you Invoke a function a new *Execution Context* is created and added to the *Execution Stack*. Whatever is at the top of the *Execution Stack* is what is currently running.

```
function a() {
	b();
	var c;
	console.log(e);
}

function b() {
	var d;
}

a();
var e = 'hello';

```

1. The functions and variables are put into the **Memory Space** that are within scope (not inside a function), this is the **Creation Phase**
2. **Execution Phase** begins, the first line read is invoking `a()`
3. `a` is added to the **Execution Stack** and is at the top of the stack
4. `b()` is called and now b is at the top of the **execution stack**
5. `var d` if defined to undefined
6. `b()` is popped off the top of the **execution stack**, and now `a` continues to execute
7. `c` is declared to *undefined*
8. `e` at this point is equal to *undefined* because the variable exists but the value `hello` hasn't been set yet since `a()` was called
9. `a` finishes execution and is popped off of the **execution stack**
10. Lastly, `e` is defined to `hello`


###Functions, Context, Variable Environments

Variable Environments are where variables live


```
function b() {
	var myVar;
}

function a() {
	var myVar = 2;
	b();
}

var myVar = 1;
a();

console.log(myVar)

```

In the above example, `myVar` is declared 3 times but each within it's own scope. 

1. Hoisting of variable names and functions
2. `myVar` is set to `1` within the *Global Scope*
3. `a()` is called a new *Execution Context* is created within the `a` function and `a` is added to the *Execution Stack*
4. `myVar` is declared within the `a` scope and set to `2`. This is set to 2 inside of the function, but `myVar` still exists outside in the global scope and is still set to 1 there
5. `b()` is called and add to the *Execution Stack*
6. `myVar` is defined to *undefined* within `b`'s scope
7. `b` ends and is popped of the *Execution Stack*
8. `a` continues and ends because there is no code after `b()` is called
9. Lastly, `myVar` is logged at the end, and it is still equal to `1` since the other `myVar`s existed within their own scope


###The Scope Chain

Every contextual environment can reference it's outer environment. If a variable is not defined within a functions it will then look for it outside of it's environment to see if it exists there.

The **Scope Chain** is asking *"Where can I find this variable?"* and it keeps checking up chain until it finds a reference.

Below the log will be `1` because `b` will reference the global declaration of `myVar`.

```
function b() {
	console.log(myVar);
}

function a() {
	var myVar = 2;
	b();
}

var myVar = 1;
a();

// 1

```

But if we put `b` inside of `a` the output will be `2`. Because when `myVar` is not found within b's environment, in moves up to the next environment, which is a's environment. There is finds `myVar`.

```
function a() {

  function b() {
	console.log(myVar);
  }

  var myVar = 2;
  b();
}

var myVar = 1;
a();

// 2

```


###Scope, ES6, and let

ES6, ECMAscript 6, or Javascript 2015


####let

`let` is a new way to declare a variable. `let` does not let you use a variable that appears after, i.e. will throw an error instead of returning *undefined* because of hoisting. Also, let will be unique within **blocks**, aka *curly brackets*. This is called **block scoping**

Consider the below example, `let c` is a variable, the first console.log would throw an error instead of returning *undefined* because of hoisting. The second console.log would work, but because of the error it would not continue. The third console.log would also be an error, because `c` would not be an available variable outside of the if statement.

If the `let` in this example was a `var`, there would be no errors and the output would be *undefined*, 100, 100

```
var a = 10;
var b = 3;

if (a > b) {
  //error
  console.log(c)
	
  let c = 100;
  console.log(c)
	
}

//error
console.log(c)


```

`let` is beneficial because it's more strict because it forces you to write your variable in a proper way, and allows you to have a variable contained within curly brackets that is within it's own scope.

Below is another example, if you use `let` within a for loop that variable will only be available within the loop. The program would error on the second console.log.

```
for(let y = 0; y < 10; y++) {
	console.log(y)
}

//error
console.log(y)

```


###Asynchronous Callbacks

Sometimes asynchronous event swill happen such as ajax calls and click events. When these thing happen they are added to the **Event Queue**. First he js code will finish running, then the events from he *event queue* will run after the js is complete.

The below example, if you click during the 3 second wait, the click event won't trigger until after the `waitThreeSeconds` function completes.

```
function waitThreeSeconds() {
	var ms = 3000 + new Date().getTime();
	while (new Date() < ms){}
	console.log('finished function')
}

function clickHandler() {
	console.log('click event')
}

document.addEventListener('click', clickHandler);

waitThreeSeconds();
console.log('finished execution');


```


###Types and JavaScript

Javascript has different *types* of values. JS uses *dynamic typing* to determine what the value type of a variable is. This means you don't have to set the variable type when you create the variable, and you're allowed to save over a value with a different *type*. The **primitive types** are `undefined, null, boolean, number, string, and symbol`.

###Operators

Operators used `infix notation`. Essentially operators like `+` and `-` are like regular function but they use `infix notation`. Imagine writing a function named `+(2, 3)`, but instead we are writing it in *infix notation* so it looks like this `2 + 3`.

See the *sudo* code below.

```
var a = 2 + 3;

function +(num1, num2) {
  //write code to add the numbers
  return sum
}

var b = x(2, 3)

```

####Operator Precedence and Associativity

**Operator Precedence** is what *operator* gets called first and associativity is if it is read right-to-left or left-to-right. Below find a link with more information.

[Operator Precedence MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)

Below is a good example of **associativity**. All the variables end up being `4`, this is because `=` *associativity* is `right-to-left`. So it sets c = b, then b = a.

```
var a = 2, b = 3, c = 4;

a = b = c;

console.log(a); // 4
console.log(b); // 4
console.log(c); // 4

```
Also `(...)` wrapping groupings in parentheses has the highest *precedence*. Note how it can make a big difference.

```
var a = 2 + 3 * 5;
var b = (2 + 3) * 5;

console.log(a); //17
console.log(b); //25

```

###Coercion

This is converting a value from one type to another. 

In the below example the `1` was coerced into a string, thats why the result ends up being 12 and not 3. The JS engine sees the string and the number and it decides to convert (coerce) the number into a string. It's *Best Guess*

```
var a = 1 + "2" //"12" 

```

####Comparison Operators

Coercion also happens with comparison operators. Take the below two examples. They both end up being true, but when we read the expressions our brains think a is going the be true and b is going to be false. The less than operator reads left to right. See below explications

```
var a = 1 < 2 < 3;
console.log(a); // true

var b = 3 < 2 < 1;
console.log(b); // true

```

* `a` is set to `1 < 2 < 3`
* `<` reads left-to-right so first it converts this to `true < 3` because 1 is less than 2 it sets that part to true
* Now it evaluates if `true < 3`, true is not a number so JS tries to coerce it into a number. Since its a boolean, it will convert it to `1`
* Now we have `1 < 3` which is true
* `a = true` since one is less than 3


The same thought process can be applied to the second expression that ends up being true as well.

* `b` is set to `3 < 2 < 1`
* `3 < 2` is false
* `false < 1` becomes `0 < 1` since false is coerced into a number which is 0;n
* `b = true` since zero is less than one.

#####Type functions

You can use type functions to play around with coercion in the console, although they aren't recommended in actual JS code.

```
Number(false) // 0
Number("10") // 10
Number(true) // 1

```

####NaN

*Not a Number*. This is the JavaScript engine trying to convert something to a number and saying, I can't convert it to a number

```
Number(undefined) // NaN
Number("hello")  // NaN
Number(null) // 0

```

###Equality

[Equality Comparisons and Sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

`==` and `===` have different meanings. `==` will try to coerce the types of the values it's given to be the same type then compare them, while `===` does not. `===` is almost always recommended.

####Double Equals

`==` can have some strange behaviors, often it tries to coerce the types into the same type in order to compare them.

See the examples below where `==` has a very loose meaning.

```
3 == 3 // true
"3" == 3 // true
false == 0 // true

var a = false;
a == 0 // true

```

#####Null

Null does not coerce for equality statements but does for comparison statements. Even through *null* coerces to 0, when it comes to equality it does not coerce. Same with *undefined*.

```
var a = Number(null) // 0

null < 1   // true
null == 0  // false


```
#####Empty Strings

Also empty strings act weird.

```
"" == 0      // true
"" == false  //true

```

####Triple Equals

`===` does not coerce it's values. This is the better choice when it comes to 

```
3 === 3      // true
"3" === "3"  // true
3 === "3"    // false

```


###Booleans

You can also play in the console using `Boolean()`, although this isn't recommended in real code.

Below you can see that Boolean will convert all of these *lack of value* values to false. We can use that to our advantage.

```
Boolean(undefined)  // false
Boolean(null)  // false
Boolean("")  // false

```

We can use it to our advantage because in things like if statements, where the value is being coerced into true/false values, we can depend that if `a` doesn't get defined, is null, or is an empty string, that the if statement won't run.

Note - if there is any chance the value will be a `0` that will be false, and thats a problem.

```
var a;

// go to the internet and set the value

if(a) {
  console.log("There's stuff there");
}

```

###Default Values

In JavaScript, unlike other programming languages, it doesn't care if you don't pass a parameter that is set up in the functions. See the below example we call `greet()` it won't throw an error, but it will set `name` to *undefined*. The interesting part is that the JS engine coerced the *undefined* value into a string when it saw the `+`.

```
function greet(name) {
  console.log("Hello " + name);
}

greet(); // "Hello undefined"

```

In ES6 there will be a way to set values within the params itself, but all legacy code handles default values like this:

```
function greet(name) {
  name = name || "<YOUR NAME HERE>"
  console.log("Hello " + name);
}

greet(); // "Hello <YOUR NAME HERE>"
greet("Joe"); // "Hello Joe"

```

This works because `||` reads left-to-right and returns the first item that is true, but does not convert it to true.

###Global Namespace with Multiple Files

When you have multiple js files linked in your html file, they are all in the same namespace sharing variables. Often you will see something like this in library codes that are checking for variable names in the global namespace. This will prevent a script that is running after from overriding an existing variable from another file. This also makes debugging easier. 

```
window.libraryName = window.libraryName || "Lib 2"

```


##Objects and Functions

###Objects

An object can hold all different types of types as its values inside

* Primitive "property" (boolean, string, etc)
* Object "property"
* Function "method"

The way these are saved in memory is that the object has reference codes of where the different properties are saved.

See below we explore how to set strings inside of an object, and three ways to call them: with brackets and variable, with brackets and the property name, and dot notation with the property name.

*Note* this is not the best way to make an object. Best way to follow.

```
var person = new Object();

person["firstname"] = "Tiffany";
person["lastname"] = "Poss";

var firstNameProperty = "firstname";

console.log(person[firstNameProperty]);
console.log(person["firstname"]);
console.log(person.firstname);

```

* `[...]` - Called *Computed Member Access*
* `.` - Called *Member Access*

We could also add an object as the value within the above person object:

```
person.address = new Object();
person.address.street = "111 Main Street";
person.address.zipcode = "90210"

```

####Object Literals

Another way to set an object is by simply setting a variable to an empty object, this is called an *Object Literal*

```
var a = {};

```

You can also initialize the object:

```
var person = {
	firstname: "Tiffany",
	lastname: "Poss",
	address: {
		street: "111 Main Street",
		city: "New York",
		state: "NY"
	}
}

```


Take it one step further you can pass an object as a param and access it. 

```
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

greet(Tiffany);

```

You could also make an object on the fly and call greet like this:

```
greet({ 
	firstname: "Tiffany", 
	lastname: "Poss"
})

```

###Faking Namespace

A *namespace* is a container for variables and functions. Objects come in handy here because you can have less exposed global variables. This helps prevent and conflicts in variable names.

For Example: this might be an issue if these variable were in separate files, they would override each other

```
var greet = "Hello!";
var greet = "Hola!";

console.log(greet);

```

We could combat this issue by putting them into separate objects

```
var english = {
	greet: "Hello!"
};

var spanish = {
	greet: "Hola!"
};

console.log(english.greet);
console.log(spanish.greet);

```


###JSON

Stands for *JavaScript Object Notation*\

Previously we used to use *XML*, which looked something like this:

```
  <object>
	<firstname>Mary</firstname>
	<lastname>Jane</lastname>
  </object>

```

This took up a lot of bandwidth to send data this way. Then people realized that the JavaScript object seemed like a good way to format data going to the server and took up a lot less space/bandwidth. **JSON** looks like a javascript object, but it's wrapped in quotes because parsers expect it.

```
{
  "firstname": "Mary",
  "lastname": "Jane"
}

```

In order to add these quotes you can use `JSON.stringify()` to covert the object into a valid JSON object. To convert it back you can use `JSON.parse()`. These are called *Object Literal* and *JSON String* See examples below that covert between JSON and Objects.

```
var Tiffany = {
  firstname: "Tiffany",
  lastname: "Poss"
}

var jsonTiffany = JSON.stringify(Tiffany);

var Mary = '{"firstname": "Mary", "lastname": "Jane" }';

var objectMary = JSON.parse(Mary);

console.log(jsonTiffany, objectMary)

```

###First Class Functions

* **First Class Functions** - Everything you can do with other types you can do with functions. Assign variables, pass them around, create them on the fly.

Functions are Objects with special properties. You can attach *Primitives*, Objects, or functions to it. It also has a name (which is optional, you can also have an anonymous function) and it has it's *code* property.


####Expressions vs Statements

An *expression* is a unit of code that results in a value. 

`a = 3` and `1 + 2` are both *expressions*, and both return a value

A *statement* is a unit of code that does not return / result in a value.

`if(a === 3) { //do stuff }`, the if *statement*... is a *statement* but `a === 3` is an *expression* that returns a value

Statement does work and expression results in a value


####Function Statements and Function Expressions

A *function statement* creates a function with a name and a code property, while a *function expression* is a variable set equal to an anonymous function (does not have a name) and also has a code property. 

The biggest difference is that the *function statement* can be called above itself because statement is created in the *creation stage* and is hoisted to the top, while the *function expression* will be created as a variable set to undefined in the *creation stage*, and if called before that line of code the function will be *undefined*


```
greet(); // will work
anonymousGreet(); // won't work - undefined

//function statement
function greet() {
	console.log('hi')
}

//function expression
var anonymousGreet = function() {
	console.log('hi')
}

anonymousGreet(); //will work

```

You can pass functions all sorts of params, including another function:

```

function log(a) {
	a()
}

log(function() {
	console.log("hi")
})

```

###By Value vs By Reference

####By Value

When you set a variable to the *primitive* value of another variable, this takes up two spots in memory. Essentially a copy is made of the original value. The value is saved twice.

In the example below both `a` and `b`, their values are both 1, but that value is saved in two memory spots. This is called *by value*

```
var a = 1;

var b = a;

```

####By Reference

Objects and functions (a type of object) will share spots in memory, the value is saved once. This means when you set a variable to a new variable, they will alter each other if you alter one of them.

See the example below. Variable `a` and `b` are both saved in the same location. When you alter `b`'s name to karl (*mutate* it), it will also alter `a`'s. This causes both `a` and `b` to have the same value even if just one of them is altered after creations. This is called *by reference*

```
var a = {
	name: "tiffany",
	age: 27
}

var b = a;

b.name = "karl";

```
Also objects passed to functions will alter the original one. See below the function `changeGreeting` alters the object that is passed to it. But at the end of this script, `a`, `b`, and `obj` within scope all have a greeting of "Hola!". All of these variables point to the same spot in memory because they are objects.

```
var a = {
	greeting: "Hello!"
}

var b;
b = a;

function changeGreeting(obj) {
	obj.greeting = "Hola!";
	console.log(obj);
}

changeGreeting(b);

console.log(a, b);

```

Also note that even if two variables do share the same *memory space* at one point, if you set a variable to a new object, they will no longer share *memory space*.

Below at the end a and be are different objects because we set b to a brand new object.

```
var a = {
	greeting: "Hello!"
}

var b;

b = a;
// b and a share memory space.

b.greeting = "Hola!"
console.log(a, b);
// b and a are now both equal to Hola!

b = { greeting: "Howdy"};
// b and a no longer share memory space

console.log(a, b);
// a has Hola! and b has Howdy


```

###'this'


`this` points to something different depending what scope it is in. `this` on the global level ends up being the `Window` object in the browser.

In the below example `this` ends up being the `Window` object in all three cases.

```
console.log(this);

function a() {
	console.log(this);
}

var b = function() {
	console.log(this);
}
a();
b();

```

####Object method

When `this` appears within a *method* inside of an object, `this` ends up being the object. below `c.log()` evokes the function and this ends up being the `c` object itself.

```
var c = {
	name: "The c object",
	log: function() {
		console.log(this);
	}
}

c.log();

```

Some people consider the below a bug. `this` in the log function is the `c` object. But if you add a function within the *method* `this` becomes the Window object again. So when you do `this.name = newname` seen here, you are actually setting a newname variable onto the Window object, and now altering the name within the c object.

```
var c = {
	name: "The c object",
	log: function() {
		this.name = "Updated c object"
		console.log(this);
		function setName(newname) {
			this.name = newname;
		}	
		setName("Updated again");
		console.log(this);	
	}
}

c.log()

```

To combat *this* issue many developers will set a variable `self` to this within the top layer of the method, then use *self* instead of *this* throughout the method.

```
var c = {
	name: "The c object",
	log: function() {
		var self = this;
		self.name = "Updated c object"
		console.log(self);
		function setName(newname) {
			self.name = newname;
		}	
		setName("Updated again");
		console.log(self);	
	}
}

c.log()

```

###Arrays

JavaScript arrays can hold any *type* because of Js's *dynamic typing*. Not every programming language can do that. Below is a valid array:

```
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

```


###Arguments

**Arguments** is a keyword that JavaScript sets up for you that contains all the parameters that you pass to a function. 


In JavaScript, no error is thrown if call a function that requires variables (within reason). The below function will just log *undefined* three times if we don't pass the params


```
function test(one, two, three) {
	console.log(one, two, three); //undefined undefined undefined
}

test();

```

You can also set default variable to your params. Below is the conventional way setting param variables using `||`. 

```
function test(one, two, three) {
	one = one || "one";
	two = two || "two";
	three = three || "three";
	console.log(one, two, three);
}

test("one", "two");


```

The new version of JavaScript (not yet supported in all browsers) will allow you to do this:

```
function test(one = "one", two = "two", three = "three") {
	console.log(one, two, three);
}

test("one", "two");


```


If you call arguments, it returns it in an *array like* object. It mostly acts like an array but doesn't have all the features that arrays have.

```
function test(one, two, three) {
	console.log(arguments);
}

test("one", "two", "three");
// ["one", "two", "three"]

```

This means you can easily end a function if someone doesn't pass params that your function requires. This may be useful when writing your own language

```
function test(one, two, three) {
	if(arguments.length === 0) {
		console.log("Missing parameters!");
		return;
	}
	console.log(one, two, three);
}

test();


```

####Spread Parameters

This is the new way of doing arguments will allow you to tack on `...param` as an argument and use that param name to call the array of any additional arrays

```
function test(one, two, three, ...param) {
	console.log(param); // ["four", "five", "six"]
	console.log(one, two, three); //  "one" "two" "three"
}

test("one", "two", "three", "four", "five", "six");


```


###Function Overloading

Some languages allow you to have multiple functions of the same name but that take different numbers of parameters. This is called *function overloading*. This isn't really possible in JavaScript because functions are objects. There are other patterns that JavaScript uses to accomplish similar things.

Below is a simple function using *if* statements to do different things depending on a parameters values

```
function greet(firstname, lastname, language) {
		language = language || "en";
		if(language == "en") {
			console.log("Hello, " + firstname + " " + lastname);
		}
		if(language == "es") {
			console.log("Hola, " + firstname + " " + lastname);
		}
}

greet("John", "Doe", "en");
greet("John", "Doe", "es");

```

Below is one pattern to accomplishing something similar to *function overloading*. You can create new functions that call the original function that will default certain values.

See how `greetEnglish` is a new function that will call the `greet` with english at the param

```
function greet(firstname, lastname, language) {
		language = language || "en";
		if(language == "en") {
			console.log("Hello, " + firstname + " " + lastname);
		}
		if(language == "es") {
			console.log("Hola, " + firstname + " " + lastname);
		}
}

function greetEnglish(firstname, lastname) {
	greet(firstname, lastname, "en");
}

function greetSpanish(firstname, lastname) {
	greet(firstname, lastname, "es")
}

greetEnglish("John", "Doe");
greetSpanish("John", "Doe");

```


###Syntax Parsers

The *Syntax Parser* will go character by character through your code to determine what it means. If something doesn't makes sense to it, it will throw an error.

###Automatic Semicolon Insertion

The *syntax parser* does something to try to be helpful, which is *Automatic Semicolon Insertion*. This is when the *syntax parser* This is when the js engine automatically injects semicolons. This, for example, you can normally not put a semicolon after *return*. The engine reads each character of return, and when it see the new line (invisible character) it will be oh you can't have more info on a new line, so lets add a semicolon.

So semicolons aren't really *optional* like they sometimes seem to be, the engine just adds them for you.

The below for example would return *undefined* because of *Automatic Semicolon Insertion*. If you were to bring the start of the object to the same line as return it would return the function

```
function getPerson() {
	return 
	{
		firstname: "Tiffany"
	}
}

getPerson();

```


###Whitespace

Invisible characters that create literal "space" in your written code. JavaScript is very liberal when it comes to whitespace. A lot of frameworks are heavily coded and use a lot of whitespace. See below is perfectly valid syntax.

```
var 
	// first name of person
	firstname, 

	// last name of person
	lastname, 

	// language spoken
	language;


var person {
	// first name
	firstname: "Tiffany",

	// last name
	// (always required)
	lastname: "Poss"
}

```


###Immediately Invoked Function Expressions (IIFE)

Immediately Invoked Function Expressions is when you call a function immediately by adding parentheses to the end of where you create the function

See below we pass the name param at the end of the function expression, then `greeting` holds the returned value of the function instead of the function itself

```
var greeting = function(name) {
	return "Hello " + name;
}("Tiffany");

console.log(greeting);

```


You cannot just write a function outright like below. You will get an error `unexpected token (`. this is because it is expecting you to give the function a name.

```

function(name) {
	console.log("hello ", name)
}
//error!

```

In javascript writing strings, numbers, or objects without setting them to a variable is perfectly valid javascript, even though it's completely useless. It does save them to memory though.

To trick the syntax parser into executing a you can wrap your function in parentheses. Since parentheses are the grouping operator in Javascript, it will not recognize the expression as a function because of the parentheses. 

```
var firstname = "Tiffany";

(function(name) {

  var greeting = "Hello";
  console.log(greeting + " " + name);

})(firstname) //IIFE

```

Here is another example with an object:

```
(function(person) {
	var greeting = person.greeting + ", my name is " + person.firstname + " " + person.lastname;
	console.log(greeting)
}({
	greeting: "Hello",
	firstname: "Tiffany",
	lastname: "Poss"
}));

```

**note** - that you can invoke this function inside or outside of the parentheses, both ways are correct. See the difference below:

```
(function(name){ console.log(name) })("Tiffany");
(function(name){ console.log(name) }("Tiffany"));

```

####Why IIFEs are Safe

When you wrap a function within a variable, it creates barrier between your variables and the global variable namespace. This will prevent any confusion with variables from other files etc. 

Below greeting outside of the function would be "Hola". Imagine that this `greeting` variable was in a different file. By using the IIFE you can use a `greeting` variable in it's own context without having to worry about it overriding some other variable from another file or location.

```
var greeting = "Hola";

(function() {
	var greeting = "Hello";
	console.log("function ---> ", greeting);
})()

console.log("global ---> ", greeting);

```

What if you do want to reference the _global_ object? Well that's easy, just pass it into as the function as a variable.

See below we pass the window object to the IIFE as a param named global. We create our own variable greeting inside the function, and also override the existing window one using `global.greeting = "Bonjour"`, which changes the _window_ 's greeting variable to _Bonjour_ 

Writing code like this makes your resetting of the global variable intentional not accidental

```
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

```


###Closures

Closures are when you return a function but the namespace still exists from the original function. This allows you to call the top level function and pass it a variable, which then can be used later when you call the returned function.

See below `greet` function returns a function. You can pass a variable and set it to a variable, then call the internal function. See how `frenchGreet("Tiffany")` returns "Bonjour Tiffany".

```
function greet(whattosay) {
	return function(name) {
		console.log(whattosay + " " + name);
	}
}

greet("Hi")("Tiffany"); //Hi Tiffany

var spanishGreet = greet("Hola");
var englishGreet = greet("Hello");
var frenchGreet = greet("Bonjour");

frenchGreet("Tiffany"); //Bonjour Tiffany

```


This is the classic example, where you are pushing functions into an array within a for loop. One may think that calling `fs` will return `0, 1, 2` but actually since they are called after and `i` doesn't exist within it's own function it looks to the outer function for the `i`. At the time the functions are called `i` is equal to `3` since the for loop completed. 

```
function buildFunctions() {

	var arr = [];

	for(var i = 0; i < 3; i++) {
		arr.push(
			function() {
				console.log(i);
			}
		)
	}

	return arr

}

var fs = buildFunctions();

fs[0](); // 3
fs[1](); // 3
fs[2](); // 3

```


There are a few work arounds. You can IIFE the function creating it's own variable with the current value of `i` (`j` below). This is the old ES5 way:

```
function buildFunctions2() {

	var arr = [];

	for(var i = 0; i < 3; i++) {
		arr.push(
			(function(j) {
				return function() {
					console.log(j);
				}
			}(i))
		);
	}
	return arr

}

var fs2 = buildFunctions2();

fs2[0](); // 0
fs2[1](); // 1
fs2[2](); // 2

```


Now with ES6 you can create a context within a block (within the if statement) using `let`.

```

function buildFunctions2() {

	var arr = [];

	for(var i = 0; i < 3; i++) {
		let j = i;
		arr.push(
			function() {
				console.log(j)
			}
		);
	}
	return arr

}

var fs2 = buildFunctions2();

fs2[0](); // 0
fs2[1](); // 1
fs2[2](); // 2

```


####Function Factories & Closures

You can also create *function factories* using closures. Below is an example on how you could use a closure to create a greeting function factory.

```

function makeGreeting(language) {

	return function(firstname, lastname) {

		if(language === 'en') {
			console.log('Hello ' + firstname + ' ' + lastname)
		}

		if(language === 'es') {
			console.log('Hola ' + firstname + ' ' + lastname)
		}

	}

}

var greetEnglish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnglish('Jane', 'Doe');
greetSpanish('John', 'Doe');


```

####Callbacks

A callback function is a function you give to another function to be run when the other function is finished. An example of this is `setTimeout`, which is built into JavaScript. You pass it a *callback function*:

```
setTimeout(function() {
  console.log("This is a callback function");
}, 3000)

```

Here is an example of how you can build your own callback function:

```
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

```

###apply(), bind(), and call()

apply, bind, and call are built in methods that you can call on a functions. Remember a function is just an object. All three of these have to do with the *this* variable.

####.bind()

Take below as an example with *bind*. You have a regular `person` object with a method inside. Then you have a function named `logName`. If you just call `logName` *this* is attached to the global object and will error because `.getFullName` does not exist. When you use `bind` you can attach an object to function, and *this* becomes whatever you pass to it.

So when you create `logPersonName` you are making a copy of `logName` and binding the `person` object to it. So *this* becomes the `person` object.

```
var person = {
	firstname: "Tiffany",
	lastname: "Poss",
	getFullName: function() {
		var fullname = this.firstname + ' ' + this.lastname;
		return fullname;
	}
}

var logName = function(lang1, lang2) {

	console.log('Logged: ' + this.getFullName())

}

var logPersonName = logName.bind(person);

logPersonName(); // Logged: Tiffany Poss

logName(); //error

```

####.call()

Call allows you to pass an object to a function and call it at the same time. It's very similar to `.bind` except that it evokes the function. It does not make a copy like `.bind` does. You an also see you can pass it arguments.

```
var person = {
	firstname: "Tiffany",
	lastname: "Poss",
	getFullName: function() {
		var fullname = this.firstname + ' ' + this.lastname;
		return fullname;
	}
}

var logName = function(lang1, lang2) {

	console.log('Logged: ' + this.getFullName());
	console.log('Arguments ' + lang1 + ' ' + lang2);
	console.log('<===============>')

}



logName.call(person, 'en', 'sp')


```

####.apply()

`apply` is almost exactly the same as `call` except that apply wants to take an array as the arguments instead of one at at time:

```
var person = {
	firstname: "Tiffany",
	lastname: "Poss",
	getFullName: function() {
		var fullname = this.firstname + ' ' + this.lastname;
		return fullname;
	}
}

var logName = function(lang1, lang2) {

	console.log('Logged: ' + this.getFullName());
	console.log('Arguments ' + lang1 + ' ' + lang2);
	console.log('<===============>')

}

logName.apply(person, ['english', 'spanish'])

```


####Function Borrowing & Function Currying

#####Borrowing

Function borrowing is when you borrow a function from another object. See `person2` doesn't have the `getFullName` method, but it can borrow it from `person` by using apply.

```
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

```

#####Currying

Currying is when you copy a function but with some pre-set params using `.bind`.

Take the below example, we make a copy of the multiply function, we pass it *this* because in this case we want *this* to remain the global object, and we pass it 2. 2 will become the first param in the original function. Then you can call the copy of the function as normal but with only one param (ultimately b in this case)

```
function multiply(a, b) {
	return a*b
}

var multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(5)); // 10

```


###Functional Programming

Segmenting code into functions so that it is cleaner.

Below is an example of how you could make a mapping function that takes an array and function and it will map over the elements and apply the function you pass to it to each individual item within the array.

```
function mapForEach(arr, fn) {
	var newArray = [];
	for(var i = 0; i < arr.length; i++) {
		newArray.push(
			fn(arr[i])
		);
	}
	return newArray;
}

var array = [1,2,3];

var doubleArray = mapForEach(array, function(num) {
	return num * 2;
});

var isGreaterThanTwo = mapForEach(array, function(num) {
	return num > 2;
});

console.log(doubleArray); // [2, 4, 6]
console.log(isGreaterThanTwo); // [false, false, true]

```


You can take that further by using `.bind` and closures to make your code even more functional

```
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


```

####underscore.js

A great way to learn is by reading source code. *Underscore* has some great commented source code

* [Underscore.js with Comments](http://underscorejs.org/docs/underscore.html)
* [Lodash](https://lodash.com/)


See below some small examples of using *underscore*

```
var arr1 = [1,2,3];

var arr2 = _.map(arr1, function(item) { return item * 3 });
console.log(arr2);

var arr3 = _.filter([1,2,3,4,5,6,7], function(item) { return item % 2 === 0 });
console.log(arr3);

```


###Object-Oriented JavaScript and Prototypal Inheritance

Inheritance is when one object gets access to the properties and methods of another object. 


Classical Inheritance is a way of sharing methods and objects. It's Verbose. It uses words like Friend, Protected, Private, Interface

Prototypal Inheritance - Simple, Flexible, Extensible, Easy to Understand


###Prototypes

####Part 1

All objects (including functions) in JavaScript have a *prototype* property. A *prototype* is simply a reference to another object. When you call a property on an object, it will first look within itself for that property, then it will look into it's *prototypes* for that property if it doesn't find it. This is called the *prototype chain*.

`obj.__proto__` is a property that every object has. It has two underscores before and after so you don't mistakenly use it. Below is an example of how it works but **YOU SHOULD NEVER DO IT THIS WAY**

```
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
console.log(john.getFullName());  // John Doe
console.log(john.firstname);  // John



var jane = {
	firstname: 'Jane'
}

jane.__proto__ = person;
console.log(jane.getFullName());  // Jane Default
console.log(jane.lastname);  // Default


```

* You set John's proto to person so it now has access to all of person's properties.
* You can now call `john.getFullName()` and have access to that property and it gives the full name
* When you create jane w/o a lastname and attach the person object as a prototype, it will default jane's last name to "Default".


####Part 2

If you create a variable with an empty *object*, *function*, or *array*, then inspect it in the dev console using `__proto__` you can see what the default proto is. If you start writing `.` after the `__proto__` you will be able to see the other methods that are attached to that proto. These are all the methods attached to that object type like `.forEach` and `.toString`. 


###Reflection and Extend

Reflection is that an object can look at itself, listing and changing its properties and methods. In the below example you can see that we use the built in method `hasOwnProperty` which allow you to check if an object that you added a prototype to has a property that actually belongs to itself, not from a proto.

The second thing we do is use the *underscore.js* library to use it's `_.extend` method to add the property of other objects to the `john` object. You will see at the end, john contains all the properties that `jane` and `jim` had.

ES6 will have an `extends` method that will be similar to the underscore one.

```
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


```


###History of JavaScript and keyword "New"

JavaScript is named what it is because at the time of it's creation there were a lot of companies competing to get their language mainstream. The *JavaScript* name was named purely to attract *Java* developers, which was a popular language at the time. Also *JavaScript* as written in a way so some of the syntax looked like Java, like the below example:

```
var john = new Person();

```

Take the below example which is a way to construct an object called a *function constructor*. You can have a function that creates properties using `this`, then you can call `new Person()`.  `new` is actually an *operator* which basically creates an empty object and also changes where *this* points to, which is the new empty object, then feeds the function into it creating all of the properties.

```
function Person(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
	this.getFullName = function() {
		return this.firstname + ' ' + this.lastname;
	}
}

var john = new Person('John', 'Doe');

console.log(john);
console.log(john.getFullName());

```

###Function Constructors and ".prototype"


In addition to all functions having an (optional) name property and a code property; all functions have a `prototype` property, but it is only used when you use a function constructor.

Note that the prototype property of the function IS NOT the prototype of the function.

When you use the `prototype` property, you are adding to *the* prototype of a function constructor object. By default the `__proto__` of of a function constructor contains a constructor object name. See below example:

```
function Person(firstname, lastname) {
	this.firstname = firstname;
	this.lastname = lastname;
}

Person.prototype.getFullName = function() {
	return this.firstname + ' ' + this.lastname;
}

var john = new Person('John', 'Doe');
console.log(john);

for(var prop in john) {
	if( john.hasOwnProperty(prop) ){
	  console.log(prop + ': ' + john[prop]);
	}
}

console.log(john.__proto__);

```

* `Person` constructor contains *firstname* and *lastname* properties.
* Then we call `.prototype` to add the `getFullName` method to the prototype of any objects created using the function constructor method
* We create `john`, which we loop through it's properties and we see that it `hasOwnProperty` of only *firstname* and *lastname*
* When we log `john.__proto__`, you will see an object with `constructor`, `getFullName`, and it's `__proto__`

####Why use prototype

Why would you use `.prototype` instead of adding it directly to the object itself?

1. It's beneficial because you can add methods to an object on the fly even after many function constructor objects are invoked.
2. It takes up way less memory space. When you add a method as a `prototype` the method is saved only once in memory space, where as when you add it directly to the function constructor the method will be created in memory every time it is invoked.

In the last example, if `getFullName` was inside of the original `Person` function constructor, the method would take up memory space for every *John and Jane* you create, where as if it's created as a `.prototype` it is only created once and referenced in memory.

####Function Constructor Dangers

If you forget to put the `new` keyword, your code will error and return undefined for those functions. You can use a *linter* to help identify issues. Also, the convention is that you **always** capitalize function constructor's name

####Built-In Function constructors

There are also some built in function constructors such as `new Number()`, `new String()`, and `new Date()` to name a few. These actually create an object not the number etc you pass to it. You can see though it has all the *methods* that a number, string, or date has. 

You can view the methods by calling `.prototype` on the `Number` object etc.

```

var num = new Number(3);
console.log(num); // {[[PrimativeVlaue]] : 3 }
console.log(num.toFixed()); // "3.00"

var string = new String('John');
console.log(string); // a very long object
console.log(string.indexOf('0')); // 1

//how to see the methods attached
//by looking at the prototype
console.log('Number ---> ', Number.prototype);
console.log('String ---> ', String.prototype);
console.log('Date ---> ', Date.prototype);

```

Prototype comes in handy when creating new libraries, you can simply add a *prototype* to the String constructor to add methods for strings. See below I create a `isLongerThan` method.

```
var name = "Tiffany";

String.prototype.isLongerThan = function(limit) {
	return this.length > limit;
}

console.log(name.isLongerThan(5)); // true
console.log(name.isLongerThan(7)); // false
console.log(name.isLongerThan(9)); // false

```

*^ Note that this doesn't work for Number*


####Danger of Built In Function Constructors

Built in function constructors are dangerous because `==` returns true when compairing them to primatives, but `===` returns false. See below.

```
var a = 3;
var b = new Number(3);

console.log(a == b); //true
console.log(a === b); //false

var c = "hello";
var d = new String("hello");

console.log(c == d); //true
console.log(c === d); //false

```

This also applies to the `new Date()` function constructor. If you're using a lot of dates, you might want to the library called [moment.js](http://momentjs.com/).

####Danger of properties in Array objects

If you loop through an array using properties, be careful! Remember that arrays are also objects. When you loop through using properties, the properties will be index numbers and the value will be the object at that index. This is why you can call `arr[0]` like you can an object. You run into issues when a library you add adds a prototype to the Array constructor.

In the below example, adding the `somethingCool` property  to the Array object will cause looping through arrays in this way to include `somethingCool`, not just *John, Jane, and Jim*.

```
Array.prototype.somethingCool = "Cool!";

var arr = ['John', 'Jane', 'Jim'];

for(var prop in arr) {
	console.log(prop + ': ', arr[prop]);
}

```


###Object.create()

The final way you can construct an object is by using the `Object.create()` method in JavaScript, which is available in most modern browsers:

```
var person = {
	firstname: 'Default',
	lastname: 'Default',
	greet: function() {
		return 'Hi ' + this.firstname;
	}
}

var john = Object.create(person);
console.log(john); // empty object with proto as person
console.log(john.greet()); // Hi Default

john.firstname = 'John';
john.lastname = 'Doe';
console.log(john); // object containing firstname and lastname w/ proto from person
console.log(john.greet()); // Hi John

```

* first you create a n object with default settings and desired methods
* Then you set a variable to `Object.create(whateverObj)`
* This creates an empty object with a `__proto__` of the original object, this means that if you call the methods or properties of the original object it was created from, that new object will have access to those properties
* From there you can set then new values of those properties manually
* This is available in modern browsers

####Older Browsers & Polyfill

What if `.create` is not available in a browser you must support. The answer is `polyfill`, which is code that you add to add a feature which a JS engine *may* lack. For example for `.create` you might do something like this to create your own `.create` method that does the same thing if `.create` doesn't exist in the browser:

```
// polyfill
if( !Object.create) {
	Object.create = function(o) {
		if(arguments.length > 1) {
			throw new Error('Object.create implementation only accepts a first param')
		}
		function F() {};
		F.prototype = o;
		return new F();
	}
}

```

###ES6 and Classes

In ES6, there will be a way to create objects. Classes are now a away to make objects in ES6. This is a type of *syntactic sugar*, it's just a different way to type it but doesn't change how things happen under the hood. Example syntax below:


```

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


```

 
