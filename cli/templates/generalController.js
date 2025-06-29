// This file contains a generic controller template with common CRUD operations.
// It leverages QueryManipulator for advanced querying, CustomError for consistent error handling,
// and asyncErrorHandler for simplifying async middleware.

exports.generalControllerTemplate = `const QueryManipulator = require("../utils/QueryManipulator"); // Corrected spelling
const CustomError = require("../utils/CustomError");
const { asyncErrorHandler } = require("../middlewares/errorMiddleware");

/**
 * Generic function to get all documents from a model with filtering, selection, search, sorting, and pagination.
 * @param {mongoose.Model} model - The Mongoose model to query.
 * @returns {Function} An async Express middleware function.
 */
const getAll = (model) => asyncErrorHandler(async function (req, res) {
    let qm = new QueryManipulator(req, model)
        .filter()     
        .selectFields() 
        .search()     
        .sort()       
        .paginate();  

    let docs = await qm.query;


    res.status(200).json({
        status: "success",
        count: docs.length, 
        data: {
            docs 
        },
    });
});

/**
 * Generic function to create a new document in a model.
 * Automatically generates a slug if 'name' field is present in the request body.
 * @param {mongoose.Model} model - The Mongoose model to create a document in.
 * @returns {Function} An async Express middleware function.
 */
const createOne = (model) => asyncErrorHandler(async function (req, res) {
    let newDoc = await model.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            newDoc 
        },
    });
});

/**
 * Generic function to get a single document by ID from a model.
 * Throws a CustomError if the document is not found.
 * @param {mongoose.Model} model - The Mongoose model to query.
 * @param {string} [modelName=""] - The name of the model for error messages (e.g., "User", "Product").
 * @returns {Function} An async Express middleware function.
 */
const getOne = (model, modelName = "") => asyncErrorHandler(async function (req, res) {
    let doc = await model.findById(req.params.id);

    if (!doc) {
        throw new CustomError(\`\${ modelName || 'Document' } not found\`, 404);
    }

    res.status(200).json({
        status: "success",
        data: {
            doc, 
        },
    });
});

/**
 * Generic function to update a single document by ID in a model.
 * Automatically generates/updates a slug if 'name' field is present.
 * Throws a CustomError if the document to update is not found.
 * @param {mongoose.Model} model - The Mongoose model to update.
 * @param {string} [modelName=""] - The name of the model for error messages.
 * @returns {Function} An async Express middleware function.
 */
let updateOne = (model, modelName = "") => asyncErrorHandler(async function (req, res) {
    let updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updatedDoc) {
        throw new CustomError(\`\${ modelName || 'Document' } not found\`, 404);
    }

    res.status(200).json({
        status: "success",
        data: {
            updatedDoc,
        },
    });
});

/**
 * Generic function to delete a single document by ID from a model.
 * Throws a CustomError if the document to delete is not found.
 * @param {mongoose.Model} model - The Mongoose model to delete from.
 * @param {string} [modelName=""] - The name of the model for error messages.
 * @returns {Function} An async Express middleware function.
 */
let deleteOne = (model, modelName = "") => asyncErrorHandler(async function (req, res) {
    let deletedDoc = await model.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
        throw new CustomError(\`\${ modelName || 'Document' } not found\`, 404);
    }

    res.status(204).send();
});

module.exports = {
    getAll,
    createOne,
    getOne,
    updateOne,
    deleteOne
};
`;
