const { createController } = require('./utils/crud/createController');
const { createRouter } = require('./utils/crud/createRouter');
const { createModel } = require('./utils/crud/createModel');
const { modifyApp } = require('./templates/modifyApp')
const { name } = require('./utils/naming')

exports.createCRUD = async (projectDir, crudName) => {
	const parsedName = name(crudName)
	await createModel(projectDir, parsedName)
	await createController(projectDir, parsedName)
	await createRouter(projectDir, parsedName)
	modifyApp(projectDir, { crudName: parsedName })
}
