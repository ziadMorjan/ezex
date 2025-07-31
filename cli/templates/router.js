// استخدام ESM

exports.routerTemplate = ({ lower, capitalized }) =>
	`import express from 'express';
import {
	getAll${capitalized}s,
	create${capitalized},
	get${capitalized},
	update${capitalized},
	delete${capitalized},
} from '../controllers/${lower}Controller.js';

const router = express.Router();

router.route('/')
    .get(getAll${capitalized}s)
    .post(create${capitalized});

router.route('/:id')
    .get(get${capitalized})
    .patch(update${capitalized})
    .delete(delete${capitalized});
    
export default router;
`;