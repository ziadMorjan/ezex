
const path = require('path')
const fs = require('fs')
exports.server = async (projectDir) => {
	const txt =
		`import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

import { dbConnect } from './config/db.js';
import app from './app.js';

const port = process.env.PORT || 8000;
const environment = process.env.NODE_ENV || 'development';
const uri = process.env.MONGO_URI;

const server = app.listen(port, () => {
    console.log(\` Server running in \${environment} mode on port \${port}\`);
});

if (uri) {
    dbConnect(uri);
} else {
    console.warn('MONGO_URI not found in config.env. Database not connected.');
}

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
`
	fs.writeFileSync(path.join(projectDir, 'server.js'), txt)
}
