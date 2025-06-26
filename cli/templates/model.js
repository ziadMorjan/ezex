exports.modelTemplate = ({ lower, capitalized }) =>
`const mongoose = require('mongoose');

const ${lower}Schema = new mongoose.Schema({
    // TODO: define schema fields
});
module.exports = mongoose.model('${capitalized}', ${lower}Schema);
`