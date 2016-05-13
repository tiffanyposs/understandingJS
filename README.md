##Understanding Javascript

Notes from Udemy Course **JavaScript: Understanding the Weird Parts**

[Udemy Course Here](https://www.udemy.com/understand-javascript/learn/v4/overview)

###Big Words

* **Associativity** - What order *operator* functions get called in (left-to-right or right-to-left)
* **Asynchronous** - More than one at a time.
* **Dynamic Typing** - You don't tell the engine what type of data a variable holds, it figures it out while your code is running. This means you don't have tell the code what datatype it's supposed to be.
* **Execution Contexts** - A wrapper that helps manage the code that is running. It can contain things beyond what you have written in your code. Any script that you have is wrapped in a execution script. This has two phases.
  * **Creation Phase** - First the engine sets up `Memory Space` for Variables and Functions. All variables in JavaScript are initially set to *undefined* before their actual value is set while functions are set in the memory in entirety.
  * **Execution Phase** - This is when the code actually runs.
* **Invocation** - Running a function
* **Lexical Environments** - Where something sits physically in the code you write. This exists in programming languages that it matters where something is located in  your code.
* **Operator** - A special function that is syntactically (written) different. Generally take two params and return one result. i.e. `1 + 2`
* **Operator Precedence** - Which *operator* gets called first
* **Primitive Type** - A type of data that represents a single value (not an object)
  * *undefined* - a lack of existence (you should not set a variable to this)
  * *null* - a lack of existence (you can set a variable to this)
  * *boolean* - *true* or *false*
  * *number* - floating point number. 
  * *string* - sequence of characters
  * *symbol* - for ES6 and not widely used... yet...
* **Scope** - Where a variable is available in your code.
* **Single Threaded** - One command is being executed at a time
* **Synchronous Execution** - One at a time in order
* **Syntax Parsers** - A program that reads your code and determines what it does and if its grammar/syntax is valid. Combs through you code character by character.
* **Variable Environments** - Where the variables live and how they relate to each other in memory



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