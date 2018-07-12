const http = require('http');

const Server = require('./lib/app');

const app = new Server();
const testMiddleware = (req, res, next) => {
	// console.log('Test middleware called', next);

	next(null, {testData: 'test'});
}

const nextMiddleware = (req, res, next) => {
	console.log('next middleware called');
}

app.use(testMiddleware);
app.use(nextMiddleware);

app.listen(8082, (err) => {
	if (err) {
		console.log(`There was an error: ${err}`);
		process.exit(1);
	}
	console.log('App listening on port 8082');
});