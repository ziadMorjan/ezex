const fs = require('fs');
const path = require('path');

exports.safeWrite = (absPath, content, { force = false, dryRun = false } = {}) => {
	if (fs.existsSync(absPath) && !force) {
		console.log(`⚠️  Exists, skipping: ${path.basename(absPath)} (use --force to overwrite)`);
		return false;
	}
	if (dryRun) {
		console.log(`ℹ️  Dry run: would write ${absPath}`);
		return true;
	}
	fs.mkdirSync(path.dirname(absPath), { recursive: true });
	fs.writeFileSync(absPath, content);
	console.log(`✅ File written: ${absPath}`);
	return true;
};
