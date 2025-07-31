exports.modelTemplate = ({ lower, capitalized }) =>
	`import mongoose from 'mongoose';

const ${lower}Schema = new mongoose.Schema({
    // TODO: define more schema fields
}, {
    timestamps: true
});

const ${capitalized} = mongoose.model('${capitalized}', ${lower}Schema);

export default ${capitalized};
`
