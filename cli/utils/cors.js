const { modifyApp } = require('../templates/modifyApp')

exports.cors = async (projectDir) => {
	modifyApp(projectDir, { cors: true })
}