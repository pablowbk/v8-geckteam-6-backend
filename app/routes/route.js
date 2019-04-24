const cors = require('cors');
 
	module.exports = function (app, db) {
	
			app.post('/users', cors(), (req, res) => {
					const user = {
						name: req.body,
						email: req.body.email,
						password: req.body.password,
						terms: req.body.terms,
					};
				db.collection('Users').insertOne(user, (err, result) => {
				console.log('user', user);
				if (err) {
					res.send({ error: 'There was an error' });
				} else {
					res.send(result.ops[0]);
				}
			});
			console.log('db', db);
			console.log('user: ', user);
			res.send('You staaahp!!');
		});
	}; 
// const userRoute = express.Router();
// userRoute.use(bodyParser.json());
// // 
// userRoute.get('/users', cors(), (req, res) => {
// 	res.send('Fuck you');
// 	console.log('Fuck you Console Digger');
// });
// 
// userRoute.post('/users', cors(), (req, res) => {
// 	const user = { 
// 			name: req.body.name,
// 			email: req.body.email,
// 			password: req.body.password,
// 			terms: req.body.terms,
// 		};
// 		console.log('user: ', user);
// 	res.send('You stop it there Noob POST crapper');
// 	console.log('req', req);
// 	console.log('POST: Fuck you console.cunt');
// });

// const cors = require('cors');
// 
// module.exports = function (app, db) {
// app.get('/search', cors(), (req, res) => {
// 	console.log('db', db);
// 	res.send('Search Route Up and Running');
// 	// if (typeof name !== 'undefined') {
// 
// 

	// MEDS
	// app.post('/meds', cors(), (req, res) => {
	// const med = { 
	// 	manufacturer: req.body.manufacturer,
	// 	comercialName: req.body.comercialName,
	// 	name: req.body.name,
	// 	dosage: req.body.dosage,
	// 	units: req.body.units,
	// 	expiration: req.body.expiration,
	// 	image: req.body.image,
	// 	contact: req.body.contact,
	// };
	// 	db.collection('Meds').insertOne(med, (err, result) => {
	// 			console.log('Object sent: ', result.ops);
	// 			if (err) {
	// 				res.send({ error: 'An error has ocurred' });
	// 			} else {
	// 				console.log('Server: POST taken');
	// 				res.send(result.ops[0]);
	// 			}
	// 	});
	// });
	// app.get('/meds', cors(), (req, res) => {
	// 		console.log('Getting 200');
	// 		res.send('Made it, recieved the GET call');
	// });
