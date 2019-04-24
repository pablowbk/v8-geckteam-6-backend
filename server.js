import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/db/db';
// import jwt from 'express-jwt';
// import route from './app/routes';

import config from './app/config';

import * as user from './app/controllers/users.js';

const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({
	extended: true
}));


//1
	app.get('/users', cors(), (req, res) => {
			res.send('Getting hit');
	});
//2
	app.post('/users', cors(), (req, res) => {
		user.register(req, res);
		res.send('done');
	});
			// db.collection('Users').insertOne(nuser, (err, result) => {
			// 		if (err) {
			// 			res.send({ error: 'There was an error' });
			// 		} else {
			// 			res.send(result.ops[0]);
			// 		}
			// 	});
			// res.send(user);
		// 	console.log('userUP', nuser);	
		// });


// app.use('/users', cors(), (req, res, next) => {
// 	console.log('Request Type: ', req.method);
// 	next();
// });
 app.listen(config.port, () => {
			console.log('Server is Up&Running on port %d', config.port);
	});

// const connectDatabase = () => {
// 	console.log('Connecting to Mlab');
// 	return mongoose.connect(config.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true })
// 	.then(() => {
// 		console.log('Connected to %s', mongoose.connections[0].host);
// 	});

