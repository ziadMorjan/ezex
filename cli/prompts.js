const prompts = require('prompts');

exports.askProjectName = async () => {
  const { projectName } = await prompts({
    type: 'text',
    name: 'projectName',
    message: 'Project name or full path:'
  });
  return projectName;
};

exports.askAddMoreFeatures = async () => {
  const { addMore } = await prompts({
    type: 'toggle',
    name: 'addMore',
    message: 'Do you want to add more features?',
    active: 'yes',
    inactive: 'no'
  });
  const { addgit } = await prompts({
    type: 'toggle',
    name: 'addgit',
    message: 'Do you want to initializes a GitHub repository?',
    active: 'yes',
    inactive: 'no'
  });
  return { addMore, addgit };
}

exports.askOptionalFeatures = async () => {
  const { addDatabase } = await prompts({
    type: 'toggle',
    name: 'addDatabase',
    message: 'Do you want to add a mongo database config file?',
    active: 'yes',
    inactive: 'no'
  });

  const { appfile } = await prompts({
    type: 'toggle',
    name: 'appfile',
    message: 'Do you want to add the default app.js & server.js files?',
    active: 'yes',
    inactive: 'no'
  });
  const { cors } = await prompts({
    type: 'toggle',
    name: 'cors',
    message: 'Do you want to add the cors configuration?',
    active: 'yes',
    inactive: 'no'
  });
  const { morgan } = await prompts({
    type: 'toggle',
    name: 'morgan',
    message: 'Do you want to add the morgan configuration?',
    active: 'yes',
    inactive: 'no'
  });
  const { globalError } = await prompts({
    type: 'toggle',
    name: 'globalError',
    message: 'Do you want to add Global error hanling ?',
    active: 'yes',
    inactive: 'no'
  });

  return { addDatabase, appfile, cors, morgan, globalError };
}
exports.askToOpen = async () => {
  const { askToOpen } = await prompts({
    type: 'toggle',
    name: 'askToOpen',
    message: 'Do you want to open the project in vscode window?',
    active: 'yes',
    inactive: 'no'
  })
  return askToOpen
}