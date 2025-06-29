// This file contains the template for the error handling middleware and the async error handler utility.

exports.errorTemplate = () =>
    `const devError = (err, res) =>
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            error: err
        });

    const prodError = (err, res) => {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!',
            });
        }
    }

    const globalErrorHandler = (err, req, res, next) => {
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error';
        err.message = err.message || 'Something went wrong';

        if (process.env.NODE_ENV === 'development') {
            devError(err, res);
        }
        if (process.env.NODE_ENV === 'production') {
            prodError(err, res);
        }
    }
    
    const asyncErrorHandler = (fn) =>
    (req, res, next) =>
        fn(req, res, next).catch(err => next(err));
    
    module.exports = {
        globalErrorHandler,
        asyncErrorHandler
    }
    `;
