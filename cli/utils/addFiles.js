// This file provides a utility function to create a new file at a specified path within a project.

const fs = require('fs');
const path = require('path');

/**
 * Creates a new file at the given filePath within the project directory.
 * If the parent directories do not exist, they will be created recursively.
 * If the file already exists, it will be overwritten (unless content is provided).
 *
 * @param {string} projectDir - The root directory of the project.
 * @param {string} filePath - The path to the file relative to the project directory (e.g., 'src/data/config.js').
 * @param {string} [content=""] - The content to write to the file. Defaults to an empty string.
 */
exports.createFile = async (projectDir, filePath, content = "") => {
    const projectExists = fs.existsSync(projectDir);
    if (!projectExists) {
        console.log("There is no project with that name");
        return; // Exit if the project directory does not exist
    }

    const fullFilePath = path.join(projectDir, filePath);
    const dirName = path.dirname(fullFilePath);

    // Create parent directories if they don't exist
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    // Write content to the file. If file exists, its content will be replaced.
    fs.writeFileSync(fullFilePath, content);
    console.log(`File created: ${fullFilePath}`);
};
