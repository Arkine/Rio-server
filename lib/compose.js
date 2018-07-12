module.exports = (middleware) => {
	console.log(typeof middleware);

	if (!Array.isArray(middleware)) {
		throw new TypeError('Middleware must be an array!');
	}

	for (const fn of middleware){
		if (typeof fn !== 'function') {
			throw new TypeError('Middleware must be a function!');
		}
	}


	return (req, res, next) => {
		// console.log('HERE', req, res);
		// Last called middleware
		let index = -1;

		function dispatch(i) {
			if (i <= index) {
				return Promise.reject(new Error('next() called multiple times'));
			}

			index = i;

			let fn = middleware[i];
			if (i === middleware.length) {
				fn = next;
			}

			if (!fn) {
				console.log('no fn');
				return Promise.resolve();
			}

			try {
				return Promise.resolve(fn(req, res, dispatch.bind(null, i + 1)));
			} catch (error) {
				return Promise.reject(error);
			}
		}

		return dispatch(0);
	}
}