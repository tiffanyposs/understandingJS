Array.prototype.somethingCool = "Cool!";

var arr = ['John', 'Jane', 'Jim'];

for(var prop in arr) {
	console.log(prop + ': ', arr[prop]);
}