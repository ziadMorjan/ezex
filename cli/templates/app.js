const path = require('path')
const fs = require('fs')
exports.app = async (projectDir, more) => {
	const txt =
		`import express from 'express';

const app = express();

// Middlewares
app.use(express.json());

export default app;
`
	fs.writeFileSync(path.join(projectDir, 'app.js'), txt)
}
