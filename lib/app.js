'use strict';

const http = require('http');
const response = require('./response');
const request = require('./request');
const context = require('./context');
const compose = require('./compose');

module.exports = class Application {
	constructor() {
		// super();
		this.middleware = [];
		this.request = Object.create(request);
		this.response = Object.create(response);
		this.context = Object.create(context);
	}

	listen(...args) {
		const server = http.createServer(this.callback());

		console.log('LISTEN CALLED', this);

		return server.listen(...args);
	}

	use(middleware) {
		if (typeof middleware !== 'function') {
			throw new TypeError('Middleware must be a function!');
		}

		this.middleware.push(middleware);

		return this;
	}

	callback() {
		const middleware = compose(this.middleware);

		const onError = (err) => {
			console.log('Middleware encounterd an error', err);
		}

		return (req, res) => {
			const m = middleware(req, res).then(this.respond(req, res)).catch(onError);
		}
	}

	respond(req, res) {

		res.writeHead(200, { 'Content-Type': 'text/plain' });
		// console.log('res', res);
		res.write('Got it');

		res.end();
		// return {
		// 	req: Object.create(this.request),
		// 	res: Object.create(this.response),
		// }
	}
}