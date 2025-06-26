const fs = require("fs");
const path = require("path");

exports.addApp = (projectDir, more) => {
    const appPath = path.join(projectDir, "app.js");
    if(!fs.existsSync(appPath))return
    let content = fs.readFileSync(appPath, "utf-8");

    // Add router require/use only if more.crudName exists
    if (more.crudName) {
        const requireLine = `const ${more.crudName.lower}Router = require("./routers/${more.crudName.lower}Router")\n`;
        const useLine = `app.use('/${more.crudName.lower}', ${more.crudName.lower}Router)\n`;

        if (!content.includes(requireLine)) {
            const requireRegex = /(^const .+require\(.+\);?\s*)+/m;
            const match = content.match(requireRegex);
            if (match) {
                const lastRequire = match[0];
                content = content.replace(lastRequire, lastRequire + requireLine);
            } else {
                content = requireLine + content;
            }
        }

        if (!content.includes(useLine)) {
            // If error handler is present, insert router use before it
            const errorUse = `app.use(globalErrorHandler)\n`;
            if (content.includes(errorUse)) {
                content = content.replace(errorUse, useLine + errorUse);
            } else if (content.includes("exports.app=app")) {
                content = content.replace("exports.app=app", useLine + "exports.app=app");
            } else {
                content += "\n" + useLine;
            }
        }
    }

    // Add CORS require/use only if more.cors is true
    if (more.cors) {
        const corsRequire = `const cors = require('cors');\n`;
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
    if (more.error) {
        const errorRequire = `const {globalErrorHandler}=require("./middlewares/globalErrorHandler")\n`;
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
        if (!content.includes(errorUse)) {
            // Insert just before exports.app=app
            if (content.includes("exports.app=app")) {
                content = content.replace("exports.app=app", errorUse + "exports.app=app");
            } else {
                content += "\n" + errorUse;
            }
        }
    }
    fs.writeFileSync(appPath, content);
};