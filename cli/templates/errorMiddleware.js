exports.errorTemplate = () =>
	`const devError = (err, res) =>
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message,
		stack: err.stack,
		error: err,
	});

const prodError = (err, res) => {
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		console.error('ERROR ', err);
		res.status(500).json({
			status: 'error',
			message: 'Something went very wrong!',
		});
	}
};

export const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';

	if (process.env.NODE_ENV === 'development') {
		devError(err, res);
	} else if (process.env.NODE_ENV === 'production') {
		prodError(err, res);
	}
};

export const asyncErrorHandler = (fn) => (req, res, next) => {
	fn(req, res, next).catch((err) => next(err));
};
`