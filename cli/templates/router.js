exports.routerTemplate = ({ lower, capitalized }) =>
    `const express = require('express');
const router = express.Router();
const ${lower}Controller = require('../controllers/${lower}Controller');

router.route('/')
    .get(${lower}Controller.getAll${capitalized}s)
    .post(${lower}Controller.create${capitalized});


router.route('/:id')
    .get(${lower}Controller.get${capitalized})
    .patch(${lower}Controller.update${capitalized})
    .delete(${lower}Controller.delete${capitalized});
    
module.exports = router;
`;