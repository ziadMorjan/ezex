// This file contains a utility function to create multiple empty files within a project.

const fs = require('fs');
const path = require('path');
// Import the updated createFile utility
const { createFile } = require('./addFiles');

/**
 * Creates multiple files based on an array of file paths.
 * @param {string[]} filesArray - An array of file paths relative to the project directory.
 * @param {string} projectDir - The root directory of the project.
 */
exports.files = async (filesArray, projectDir) => {
    for (const file of filesArray) {
        // Use the new createFile function which handles directory creation and content
        // For general filesArray, we pass an empty string as content, as they are typically empty.
        await createFile(projectDir, file, "");
    }
    console.log("All specified files have been created.");
};
