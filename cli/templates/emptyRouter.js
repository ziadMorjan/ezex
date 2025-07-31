exports.emptyRouterTemplate = (name) => {
	return `import express from 'express';

const router = express.Router();

// Define routes for ${name.capitalized} here

export default router;
`;
};