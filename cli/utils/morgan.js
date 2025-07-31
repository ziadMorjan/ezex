const { modifyApp } = require('../templates/modifyApp')

exports.morgan = async (projectDir) => {
	modifyApp(projectDir, { morgan: true })
}