module.exports = {
	get header() {
		return this.req.headers;
	},

	set header(val) {
		this.req.headers = val;
	},

	get headers() {
		return this.req.headers;
	},

	set headers(val) {
		this.req.headers = val;
	},

	get url() {
		return this.req.url;
	},

	set url(val) {
		this.req.url = val;
	},
}