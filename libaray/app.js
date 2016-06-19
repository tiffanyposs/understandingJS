function setGreeting(firstname, lastname, lang) {
	var person = G$(firstname, lastname, lang);
	person.HTMLGreeting('#greeting', true);
}

$('#login').on('click', function() {
	var firstname = $('#username input.firstname').val();
	var lastname = $('#username input.lastname').val();
	var lang = $('select#lang').val();
	setGreeting(firstname, lastname, lang);
});