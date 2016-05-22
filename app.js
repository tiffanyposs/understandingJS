function test(one, two, three, ...param) {
	console.log(param); // ["four", "five", "six"]
	console.log(one, two, three); //  "one" "two" "three"
}

test("one", "two", "three", "four", "five", "six");
