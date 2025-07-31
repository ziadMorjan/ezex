
exports.emptyControllerTemplate = (name) => {
	return `import CustomError from '../utils/CustomError.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

// Your controller logic here for ${name.capitalized}
`;
};
