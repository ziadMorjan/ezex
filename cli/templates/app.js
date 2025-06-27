const path = require("path")
const fs = require("fs")
exports.app = async (projectDir, more) => {
    const txt =
        `const express = require("express")

const app = express()


module.exports = app
`
    fs.writeFileSync(path.join(projectDir, "app.js"), txt)

}