// This template file defines the content for the CustomError class.

exports.customErrorTemplate = `module.exports = class CustomError extends Error {
        constructor(message, statusCode) {
            super(message);
            this.statusCode = statusCode;
            this.status = \`\${statusCode}\`.startsWith('4') ? 'fail' : 'error';
            this.isOperational = true;
            Error.captureStackTrace(this, this.constructor);
        }
    }
    `;
