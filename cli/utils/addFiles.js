// This file provides a utility function to create a new file at a specified path within a project.

const fs = require('fs');
const path = require('path');

/**
 * Creates a new file at the given filePath within the project directory.
 * If the parent directories do not exist, they will be created recursively.
 * If the file already exists, a message will be displayed, and the file will not be overwritten.
 *
 * @param {string} projectDir - The root directory of the project.
 * @param {string} filePath - The path to the file relative to the project directory (e.g., 'src/data/config.js').
 * @param {string} [content=""] - The content to write to the file. Defaults to an empty string.
 */
exports.createFile = async (projectDir, filePath, content = "") => {
    const projectExists = fs.existsSync(projectDir);
    if (!projectExists) {
        console.log("Error: Project directory does not exist.");
        return; // Exit if the project directory does not exist
    }

    const fullFilePath = path.join(projectDir, filePath);
    const dirName = path.dirname(fullFilePath);

    // Create parent directories if they don't exist
    if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName, { recursive: true });
    }

    // Check if the file already exists
    if (fs.existsSync(fullFilePath)) {
        console.log(`File already exists: ${fullFilePath}. Skipping creation.`);
    } else {
        // Write content to the file only if it does not exist
        fs.writeFileSync(fullFilePath, content);
        console.log(`File created: ${fullFilePath}`);
    }
};
