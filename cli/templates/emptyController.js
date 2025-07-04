// This template is used to generate a basic controller file when no corresponding model is found.
// It includes essential imports like asyncErrorHandler and CustomError, but no model-specific CRUD logic.

exports.emptyControllerTemplate = (name) => {
    return `const CustomError = require("../utils/CustomError");
const { asyncErrorHandler } = require("../middlewares/errorMiddleware");

`;
};
