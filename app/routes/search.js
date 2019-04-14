const cors = require('cors');

module.exports = function (app, db) {
app.get('/search', cors(), (req, res) => {
	console.log('db', db);
	res.send('Search Route Up and Running');
	// if (typeof name !== 'undefined') {
	// 	res.json(filterMeds('name', name));
	// } else if (typeof comercialName !== 'undefined') {
	// 	res.json(filterMeds('comercialName', comercialName));
	// } else if (typeof manufacturer !== 'undefined') {
	// 	res.json(filterMeds('manufacturer', manufacturer));
	// } else {
	// 	res.send('Made it to here SearchRouter');
	// }
});
};
