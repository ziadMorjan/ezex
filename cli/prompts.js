const prompts = require('prompts');

exports.askProjectName = async () => {
	const { projectName } = await prompts({
		type: 'text',
		name: 'projectName',
		message: 'Enter project name or path (e.g., my-api or .):'
	});
	return projectName;
};

exports.askForFeatures = async () => {
	const { features } = await prompts([
		{
			type: 'multiselect',
			name: 'features',
			message: 'Select features to include:',
			choices: [
				{ title: 'MongoDB config', value: 'db', selected: true },
				{ title: 'CORS middleware', value: 'cors', selected: true },
				{ title: 'Morgan logging', value: 'morgan', selected: true },
				{ title: 'ESLint + Prettier', value: 'linting', selected: true },
				{ title: 'Initialize Git repo', value: 'git', selected: true }
			],
			hint: '- Space to select. Return to submit'
		}
	]);
	return {
		db: features.includes('db'),
		cors: features.includes('cors'),
		morgan: features.includes('morgan'),
		linting: features.includes('linting'),
		git: features.includes('git')
	};
}

exports.askTemplateChoice = async (type) => {
	const { templateType } = await prompts({
		type: 'select',
		name: 'templateType',
		message: `Choose a template for the new ${type}:`,
		choices: [
			{ title: 'Default (with boilerplate)', value: 'default' },
			{ title: 'Empty', value: 'empty' }
		],
		initial: 0
	});
	return templateType;
};

exports.askToOpen = async () => {
	const { open } = await prompts({
		type: 'toggle',
		name: 'open',
		message: 'Open project in VS Code?',
		initial: true,
		active: 'yes',
		inactive: 'no'
	});
	return open;
}
