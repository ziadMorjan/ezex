
const { exec } = require('child_process');
const { logError } = require('./error');

const runCommand = (command, cwd) => {
	return new Promise((resolve, reject) => {
		console.log(`\n> Running: ${command}\n`);
		const process = exec(command, { cwd }, (error, stdout, stderr) => {
			if (error) {
				reject({ error, stderr });
				return;
			}
			resolve({ stdout, stderr });
		});
		process.stdout.pipe(process.stdout);
		process.stderr.pipe(process.stderr);
	});
}

exports.exe = async (commandsArray, projectDir) => {
	for (const command of commandsArray) {
		try {
			await runCommand(command, projectDir);
		} catch (e) {
			logError(`Failed to run command: '${command}'`, e.stderr || e.error.message);
			// تتوقف العملية عند فشل أمر حاسم مثل npm install
			throw new Error('Command execution failed.');
		}
	}
};
