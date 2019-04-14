const errorHandlerMiddleware = (err, req, res) => {
	const message = err.message || 'Error';
	res.status(err.status || 500);
	if (req.accepts('json')) {
		res.json({ message });
	} else {
		res.send(message);
	}
};
module.exports = errorHandlerMiddleware;
