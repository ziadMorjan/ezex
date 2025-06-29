// This file handles modifications to the main app.js file to include new features.

const fs = require("fs");
const path = require("path");

/**
 * Adds features (routers, CORS, error handling) to the app.js file.
 * @param {string} projectDir - The root directory of the project.
 * @param {object} more - An object containing features to add.
 * @param {object} [more.crudName] - Object with lower and capitalized names for CRUD module.
 * @param {boolean} [more.cors] - Whether to add CORS configuration.
 * @param {boolean} [more.error] - Whether to add global error handling.
 */
exports.addApp = (projectDir, more) => {
    const appPath = path.join(projectDir, "app.js");
    // If app.js doesn't exist, there's nothing to modify
    if (!fs.existsSync(appPath)) return;

    let content = fs.readFileSync(appPath, "utf-8");

    // Add router require/use only if more.crudName exists
    if (more.crudName) {
        const requireLine = `const ${more.crudName.lower}Router = require("./routers/${more.crudName.lower}Router")\n`;
        const useLine = `app.use('/api/v1/${more.crudName.lower}', ${more.crudName.lower}Router)\n`;

        // Add the require statement if it's not already present
        if (!content.includes(requireLine)) {
            const requireRegex = /(^const .+require\(.+\);?\s*)+/m;
            const match = content.match(requireRegex);
            if (match) {
                // Insert after the last existing require statement
                const lastRequire = match[0];
                content = content.replace(lastRequire, lastRequire + requireLine);
            } else {
                // If no require statements, add it at the beginning
                content = requireLine + content;
            }
        }

        // Add the app.use statement if it's not already present
        if (!content.includes(useLine)) {
            // If error handler is present, insert router use before it for correct middleware order
            const errorUse = `app.use(globalErrorHandler)\n`;
            if (content.includes(errorUse)) {
                content = content.replace(errorUse, useLine + errorUse);
            } else if (content.includes("module.exports = app")) {
                // Insert before module.exports
                content = content.replace("module.exports = app", useLine + "module.exports = app");
            } else {
                // Fallback: add at the end
                content += "\n" + useLine;
            }
        }
    }

    // Add CORS require/use only if more.cors is true
    if (more.cors) {
        const corsRequire = `const cors = require('cors');\n`;
        // Add the require statement if it's not already present
        if (!content.includes(corsRequire)) {
            const requireRegex = /(^const .+require\(.+\);?\s*)+/m;
            const match = content.match(requireRegex);
            if (match) {
                const lastRequire = match[0];
                content = content.replace(lastRequire, lastRequire + corsRequire);
            } else {
                content = corsRequire + content;
            }
        }

        const corsUse = `app.use(cors({\n  origin: '*',\n  methods: ['GET', 'POST'],\n  allowedHeaders: ['Content-Type', 'Authorization']\n}));\n`;
        // Add the app.use statement if it's not already present
        if (!content.includes(corsUse)) {
            // Insert after "const app = express()" if it exists
            const appInitRegex = /(const\s+app\s*=\s*express\s*\(\s*\)\s*;?\s*\n)/;
            if (appInitRegex.test(content)) {
                content = content.replace(appInitRegex, `$1${corsUse}`);
            } else {
                // fallback: after last require
                const requireRegex = /(^const .+require\(.+\);?\s*)+/m;
                const match = content.match(requireRegex);
                if (match) {
                    const lastRequire = match[0];
                    content = content.replace(lastRequire, lastRequire + corsUse);
                } else {
                    content = corsUse + content;
                }
            }
        }
    }

    // Add global error handling if more.error is true
    if (more.error) {
        // Updated path for globalErrorHandler
        const errorRequire = `const {globalErrorHandler}=require("./middlewares/errorMiddleware")\n`;
        // Add the require statement if it's not already present
        if (!content.includes(errorRequire)) {
            // Insert after last require
            const requireRegex = /(^const .+require\(.+\);?\s*)+/m;
            const match = content.match(requireRegex);
            if (match) {
                const lastRequire = match[0];
                content = content.replace(lastRequire, lastRequire + errorRequire);
            } else {
                content = errorRequire + content;
            }
        }

        const errorUse = `app.use(globalErrorHandler)\n`;
        // Add the app.use statement if it's not already present
        if (!content.includes(errorUse)) {
            // Insert just before module.exports = app
            if (content.includes("module.exports = app")) {
                content = content.replace("module.exports = app", errorUse + "module.exports = app");
            } else {
                // Fallback: add at the end
                content += "\n" + errorUse;
            }
        }
    }

    // Write the modified content back to app.js
    fs.writeFileSync(appPath, content);
};
