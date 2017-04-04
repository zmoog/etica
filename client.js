var etica = require('./index');

var username = process.env.ETICA_USERNAME;
var password = process.env.ETICA_PASSWORD;


etica.load(username, password, function(err, data) {

	if (err) {
		console.err('Failed', err);
	} else {
		console.log('data: ', data);
	}
});

