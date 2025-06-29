const path = require("path")
const fs = require("fs")
exports.gitignore = (projectDir) => {
    const txt =
        `/node_modules/
config.env
`
    fs.writeFileSync(path.join(projectDir, ".gitignore"), txt)
}