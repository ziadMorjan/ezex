const { exec } = require('child_process');
const runCommand=(command, cwd)=>{
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}
exports.exe = async (commandsArray, projectDir) => {
    for (const command of commandsArray) {
        try {
            console.log(`Running: ${command}`);
            await runCommand(command, projectDir);
        } catch (error) {
            console.error('Error running command:', error);
        }
    }
};