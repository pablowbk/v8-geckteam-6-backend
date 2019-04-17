import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'express-jwt';
// import { notFound, validationError, errorHandlerMiddleware } from './app/middleware/';
import routes from './app/routes';
import config from './app/config';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const unprotected = [
	{ url: '/users', method: 'POST' },
	{ url: '/meds', method: 'POST' }
];

app.use(
	jwt({ secret: config.jwt.secret })
		.unless({ path: unprotected, method: ['OPTIONS', 'HEAD'] })
	);

app.use('/', routes);

// app.use(notFound);
// app.use(validationError);
// app.use(errorHandlerMiddleware);

const startServer = () => {
	console.log('Starting Server up..');
	const server = app.listen(config.port, config.host, () => {
			console.log('Server is Up&Running on port %d', server.address().port);
	});
};

const connectDatabase = () => {
	console.log('Connecting to Mlab');
	return mongoose.connect(config.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true })
	.then(() => {
		console.log('Connected to %s', mongoose.connections[0].host);
	});
};

connectDatabase()
	.then(startServer)
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
