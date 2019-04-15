const cors = require('cors');

module.exports = function (app, db) {
	// USERS
	app.post('/users', cors(), (req, res) => {
	const user = { 
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		tos: req.body.tos,
		location: req.body.location
	};
		db.collection('Users').insertOne(user, (err, result) => {
				console.log('Object sent: ', result.ops);
				if (err) {
					res.send({ error: 'An error has ocurred' });
				} else {
					console.log('Server: POST taken');
					res.send(result.ops[0]);
				}
		});
	});
	app.get('/users', cors(), (req, res) => {
		console.log('Getting 200');
		res.send('Server: Im recieveng the GET hit');
	});
	//MEDS

	app.post('/meds', cors(), (req, res) => {
	const med = { 
		manufacturer: req.body.manufacturer,
		comercialName: req.body.comercialName,
		name: req.body.name,
		dosage: req.body.dosage,
		units: req.body.units,
		expiration: req.body.expiration,
		image: req.body.image,
		contact: req.body.contact,
	};
		db.collection('Meds').insertOne(med, (err, result) => {
				console.log('Object sent: ', result.ops);
				if (err) {
					res.send({ error: 'An error has ocurred' });
				} else {
					console.log('Server: POST taken');
					res.send(result.ops[0]);
				}
		});
	});
	app.get('/meds', cors(), (req, res) => {
			console.log('Getting 200');
			res.send('Made it, recieved the GET call');
	});
};
