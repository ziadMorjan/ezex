const { spawn } = require('child_process');
const { logError } = require('./error');

const run = (cmd, args, cwd) =>
	new Promise((resolve, reject) => {
		console.log(`\n> Running: ${cmd} ${args.join(' ')}\n`);
		const child = spawn(cmd, args, { cwd, stdio: 'inherit' });
		child.on('error', reject);
		child.on('close', (code) =>
			code === 0 ? resolve() : reject(new Error(`${cmd} exited with code ${code}`))
		);
	});

exports.exe = async (commands, projectDir) => {
	for (const { cmd, args } of commands) {
		try {
			await run(cmd, args, projectDir);
		} catch (e) {
			logError(`Failed to run: ${cmd} ${args.join(' ')}`, e.message);
			throw e;
		}
	}
};
