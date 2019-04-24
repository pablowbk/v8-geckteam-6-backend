import mongoose from 'mongoose';
import config from '../config';

mongoose.connect(config.mongodb.uri, { useCreateIndex: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('We are connected to the DB');
});


module.exports = db;
