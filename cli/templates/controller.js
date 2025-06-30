// This template is used to generate specific controller files (e.g., userController.js).
// It imports generic CRUD functions from the central 'Controller.js' and applies them to a specific model.

exports.controllerTemplate = (name) => {
    return `const ${name.capitalized} = require("../models/${name.capitalized}");
const { getAll, createOne, getOne, updateOne, deleteOne } = require("./Controller"); 

/** * Controller for ${name.capitalized} model
 * This file contains CRUD operations for the ${name.capitalized} model.
 * It uses generic CRUD functions from the Controller.js file.
 */

exports.getAll${name.capitalized}s = getAll(${name.capitalized});

exports.create${name.capitalized} = createOne(${name.capitalized});

exports.get${name.capitalized} = getOne(${name.capitalized}, "${name.capitalized}"); 

exports.update${name.capitalized} = updateOne(${name.capitalized}, "${name.capitalized}"); 

exports.delete${name.capitalized} = deleteOne(${name.capitalized}, "${name.capitalized}"); 
`;
};

