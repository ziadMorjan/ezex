exports.generalControllerTemplate = `import CustomError from '../utils/CustomError.js';
import QueryManipulator from '../utils/QueryManipulator.js';
import { asyncErrorHandler } from '../middlewares/errorMiddleware.js';

/**
 * Generic function to get all documents from a model.
 */
export const getAll = (model) =>
	asyncErrorHandler(async (req, res) => {
		const qm = new QueryManipulator(req, model)
			.filter()
			.selectFields()
			.search()
			.sort()
			.paginate();

		const docs = await qm.query;

		res.status(200).json({
			status: 'success',
			count: docs.length,
			data: {
				docs,
			},
		});
	});

/**
 * Generic function to create a new document.
 */
export const createOne = (model) =>
	asyncErrorHandler(async (req, res) => {
		const newDoc = await model.create(req.body);

		res.status(201).json({
			status: 'success',
			data: {
				newDoc,
			},
		});
	});

/**
 * Generic function to get a single document by ID.
 */
export const getOne = (model, modelName = '') =>
	asyncErrorHandler(async (req, res) => {
		const doc = await model.findById(req.params.id);

		if (!doc) {
			throw new CustomError(\`No \${ modelName || 'document' } found with that ID\`, 404);
		}

		res.status(200).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

/**
 * Generic function to update a document by ID.
 */
export const updateOne = (model, modelName = '') =>
	asyncErrorHandler(async (req, res) => {
		const updatedDoc = await model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		if (!updatedDoc) {
			throw new CustomError(\`No \${ modelName || 'document' } found with that ID\`, 404);
		}

		res.status(200).json({
			status: 'success',
			data: {
				updatedDoc,
			},
		});
	});

/**
 * Generic function to delete a document by ID.
 */
export const deleteOne = (model, modelName = '') =>
	asyncErrorHandler(async (req, res) => {
		const deletedDoc = await model.findByIdAndDelete(req.params.id);

		if (!deletedDoc) {
			throw new CustomError(\`No \${ modelName || 'document' } found with that ID\`, 404);
		}

		res.status(204).json({
			status: 'success',
			data: null,
		});
	});
`;
