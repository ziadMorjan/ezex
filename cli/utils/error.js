exports.logError = (message, details = '') => {
	console.error(`Error: ${message}`);
	if (details) {
		console.error(`Details: ${details}`);
	}
};

exports.logInfo = (message) => console.log(message);

exports.logSuccess = (message) => console.log(message);