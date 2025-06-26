exports.routerTemplate = ({ lower, capitalized }) => 
`const express = require('express');
const router = express.Router();
const ${lower}Controller = require('../controllers/${lower}Controller');

// Create
router.post('/', ${lower}Controller.create);

// Read all
router.get('/', ${lower}Controller.getAll);

// Read one
router.get('/:id', ${lower}Controller.getOne);

// Update
router.put('/:id', ${lower}Controller.update);

// Delete
router.delete('/:id', ${lower}Controller.remove);

module.exports = router;
`;