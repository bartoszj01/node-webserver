const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(`${now}: ${req.method} ${req.url}`);

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append server.log')
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

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

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'An error has occurred.'
	});
});



app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});