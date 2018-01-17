const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Welcome Page',
		//currentYear: new Date().getFullYear(),
		welcomeMessage: 'Hello, visitor!'
	});
	// res.send({
	// 	name: 'Andrew',
	// 	likes: [
	// 		'Biking',
	// 		'Cities'
	// 	]
	// });
});

app.get('/about', (req, res) => {
	//res.send('About Page');
	res.render('about.hbs', {
		pageTitle: 'About Page',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'An error has occurred.'
	});
});

app.listen(3000, () => {
	console.log('server is running on port 3000');
});