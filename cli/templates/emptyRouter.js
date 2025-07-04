// This template is used to generate a basic router file when no corresponding controller is found.
// It includes essential Express router setup but no specific route definitions.

exports.emptyRouterTemplate = (name) => {
    return `const express = require('express');

const router = express.Router();

module.exports = router;
`;
};
