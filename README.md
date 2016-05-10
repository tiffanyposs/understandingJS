##Understanding Javascript


Notes from Undemy Course **JavaScript: Understanding the Weird Parts**

[Udemy Course Here](https://www.udemy.com/understand-javascript/learn/v4/overview)

###Big Words

* **Syntax Parsers** - A program that reads your code and determines what it does and if its grammar/syntax is valid. Combs through you code character by character.
* **Execution Contexts** - A wrapper that helps manage the code that is running. It can contain things beyond what you have written in your code. Any script that you have is wrapped in a execution script.
* **Lexical Environments** - Where something sits physically in the code you write. This exists in programming languages that it matters where something is located in  your code. 


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

* **Creation Phase** - First the engine sets up `Memory Space` for Variables and Functions. All variables in JavaScript are initially set to *undefined* before their actual value is set while functions are set in the memory in entirety.
* **Execution Phase** - This is when the code actually runs.