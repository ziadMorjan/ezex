const { addApp } = require("../templates/addToApp")

exports.morgan = async (projectDir) => {
    addApp(projectDir, { morgan: true })
}