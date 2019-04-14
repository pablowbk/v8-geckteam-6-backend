const route = require('./route');
const search = require('./search');

module.exports = (app, db) => {
	route(app, db);
	search(app, db);
};
