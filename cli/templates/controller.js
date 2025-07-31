exports.controllerTemplate = (name) => {
	return `import ${name.capitalized} from '../models/${name.capitalized}.js';
import { getAll, createOne, getOne, updateOne, deleteOne } from './Controller.js'; 

/** * Controller for ${name.capitalized} model
 * This file contains CRUD operations for the ${name.capitalized} model.
 * It uses generic CRUD functions from the Controller.js file.
 */

export const getAll${name.capitalized}s = getAll(${name.capitalized});

export const create${name.capitalized} = createOne(${name.capitalized});

export const get${name.capitalized} = getOne(${name.capitalized}, '${name.capitalized}'); 

export const update${name.capitalized} = updateOne(${name.capitalized}, '${name.capitalized}'); 

export const delete${name.capitalized} = deleteOne(${name.capitalized}, '${name.capitalized}'); 
`;
};
