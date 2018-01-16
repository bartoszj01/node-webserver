const express = require('express');

var app = express();

app.get('/', (req, res) => {
	res.send({
		name: 'Andrew',
		likes: [
			'Biking',
			'Cities'
		]
	});
});

app.get('/about', (req, res) => {
	res.send('About Page');
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'An error has occurred.'
	});
});

app.listen(3000);