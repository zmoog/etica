var etica = require('./index');

var username = process.env.ETICA_USERNAME;
var password = process.env.ETICA_PASSWORD;


etica.scrape(username, password, function(err, data) {

	if (err) {
		console.log('Failed', err);
	} else {
		console.log('data: ', data);
	}
});

