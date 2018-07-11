const http = require('http');

const Server = require('./lib/app');

const app = new Server();

app.listen(8082, (err) => {
	if (err) {
		console.log(`There was an error: ${err}`);
		process.exit(1);
	}
	console.log('App listening on port 8082');
});