import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './app/db/db';
// import jwt from 'express-jwt';
// import route from './app/routes';

import config from './app/config';

import * as user from './app/controllers/users.js';
import * as meds from './app/controllers/meds.js';
import * as auth from './app/controllers/auth.js';

const app = express();


app.use(cors());

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
//1
	app.get('/users', (req, res) => {
		res.send('Getting hit');
	});
//2
	app.post('/users', (req, res) => {
		console.log('request to the server: ', req.body);
			user.register(req, res);
	});
	app.post('/meds', (req, res) => {
		console.log('requested input med:', req);
		meds.addit(req, res);
	});
	app.post('/auth', (req, res) => {
		auth.login(req, res);
		res.send('Authorize this, maggot');
	});

 app.listen(config.port, () => {
			console.log('Server is Up&Running on port %d', config.port);
	});

// const connectDatabase = () => {
// 	console.log('Connecting to Mlab');
// 	return mongoose.connect(config.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true })
// 	.then(() => {
// 		console.log('Connected to %s', mongoose.connections[0].host);
// 	});

