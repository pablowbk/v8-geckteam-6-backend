import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import cors from 'cors';
import db from './app/db/db';
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
const unprotected = [
  { url: '/auth', method: 'POST' },
  { url: '/users', method: 'POST' },
  { url: '/meds', method: 'POST' },
];
app.use(
  jwt({ secret: config.jwt.secret })
    .unless({ path: unprotected, method: ['OPTIONS', 'HEAD'] })
);
//1
	app.get('/meds', (req, res) => {
		meds.list(req, res)
		.then(response => res.send(response));
	});
	app.get('/users/:uid', (req, res) => {
		user.load(req, res, req.params.uid);
		console.log('userLoadedFromBackEnd', req.user);
	});
//2
	app.post('/users', (req, res) => {
		// console.log('request to the server: ', req.body);
			user.register(req, res);
	});
	app.post('/meds', (req, res) => {
		meds.addit(req, res);
	});
	app.post('/auth', (req, res) => {
		// console.log('Asking for the Authorization: ', req.body);
		auth.login(req, res);
	});

 app.listen(config.port, (err) => {
			if (err) throw err;
			console.log('Server is Up&Running on port %d', config.port);
	});

