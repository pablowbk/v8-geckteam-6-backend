const express = require('express');

const MongoClient = require('mongodb').MongoClient;

const notFoundMiddleware = require('./app/middleware/notFound');
const errorHandlerMiddleware = require('./app/middleware/errorHandler');

const bodyParser = require('body-parser');

const port = 7600;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(notFoundMiddleware);
// app.use(errorHandlerMiddleware);
	

MongoClient.connect('mongodb://frank:frank123@ds117101.mlab.com:17101/mhub', { useNewUrlParser: true }, (err, db) => {
		const datab = db.db('mhub');
	if (err) {
		console.log(err);
	} else {
		require('./app/routes/')(app, datab);
	}
});
app.listen(port, () => {
	console.log(`We are live, from Port: ${port}`);
});
