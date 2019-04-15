const validationError = (err, req, res, next) => {
	if (err.name === 'ValidationError') {
		const errors = Object.keys(err.errors).reduce((aacum, key) => {
			return { ...aacum, [key]: err.errors[key].message };
		}, {});
		return res.status(400).send({
			message: 'Validation Error',
			errors
		});
	}
	next(err);
};

export default validationError;
