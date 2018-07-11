'use strict';

const http = require('http');
const response = require('./response');
const request = require('./request');

module.exports = class Application {
	constructor() {
		// super();

		this.request = {};
		this.response = Object.create(response);
		this.context = {};
	}

	listen(...args) {
		const server = http.createServer(this.callback());

		console.log('LISTEN CALLED', this);

		return server.listen(...args);
	}

	callback() {
		return (req, res) => {

			res.writeHead(200, { 'Content-Type': 'text/plain' });

			res.write('Got It');

			res.end();
			// return {
			// 	req: Object.create(this.request),
			// 	res: Object.create(this.response),
			// }
		}
	}
}