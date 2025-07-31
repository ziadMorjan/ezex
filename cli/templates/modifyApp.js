// هذا الملف هو البديل المحدث لـ addToApp.js
// يعالج تعديل ملف app.js مع ضمان الترتيب الصحيح للـ middleware.

const fs = require('fs');
const path = require('path');
const { logError } = require('../utils/error');

/**
 * يعدل ملف app.js لإضافة ميزات (routers, CORS, morgan, error handling).
 * @param {string} projectDir - المجلد الرئيسي للمشروع.
 * @param {object} more - كائن يحتوي على الميزات المراد إضافتها.
 */
exports.modifyApp = (projectDir, more) => {
	const appPath = path.join(projectDir, 'app.js');
	if (!fs.existsSync(appPath)) {
		logError('الملف app.js غير موجود. لا يمكن تعديله.');
		return;
	}

	let content = fs.readFileSync(appPath, 'utf-8');

	// --- الخطوة 1: إضافة كل استيرادات (imports) اللازمة ---
	if (more.crudName) {
		content = addImport(content, `import ${more.crudName.lower}Router from './routers/${more.crudName.lower}Router.js';\n`);
	}
	if (more.cors) {
		content = addImport(content, `import cors from 'cors';\n`);
	}
	if (more.morgan) {
		content = addImport(content, `import morgan from 'morgan';\n`);
	}
	if (more.error) {
		content = addImport(content, `import { globalErrorHandler } from './middlewares/errorMiddleware.js';\n`);
	}

	// --- الخطوة 2: إضافة استدعاءات (app.use) بالترتيب الصحيح ---
	if (more.cors) {
		const useLine = `app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));\n`;
		if (!content.includes('app.use(cors(')) {
			content = addUse(content, useLine, true); // الإضافة في البداية
		}
	}
	if (more.morgan) {
		const useLine = `if (process.env.NODE_ENV === 'development') {\n  app.use(morgan('dev'));\n}\n`;
		if (!content.includes('app.use(morgan(\'dev\'))')) {
			content = addUse(content, useLine, true); // الإضافة في البداية
		}
	}
	if (more.crudName) {
		const useLine = `app.use('/api/v1/${more.crudName.lower}s', ${more.crudName.lower}Router);\n`;
		if (!content.includes(useLine)) {
			content = addUse(content, useLine); // الإضافة قبل معالج الأخطاء
		}
	}

	// --- الخطوة 3: التأكد من أن معالج الأخطاء هو الأخير ---
	if (more.error) {
		const useLine = `app.use(globalErrorHandler);\n`;
		if (!content.includes('app.use(globalErrorHandler)')) {
			// الإضافة في النهاية، مباشرة قبل تصدير التطبيق
			content = content.replace('export default app;', `${useLine}\nexport default app;`);
		}
	}

	fs.writeFileSync(appPath, content);
};

// دالة مساعدة لإضافة import في أعلى الملف
function addImport(content, importLine) {
	if (content.includes(importLine.trim())) return content;

	const lastImportMatch = content.match(/^(import .+ from .+;?\s*)+/m);
	if (lastImportMatch) {
		const lastImport = lastImportMatch[0];
		return content.replace(lastImport, lastImport + importLine);
	}
	return importLine + content;
}

// دالة مساعدة ذكية لإضافة app.use
function addUse(content, useLine, atBeginning = false) {
	if (content.includes(useLine.trim())) return content;

	const appInit = 'const app = express();';
	const globalErrorHandler = 'app.use(globalErrorHandler);';
	const exportDefault = 'export default app;';

	if (atBeginning) {
		// الإضافة مباشرة بعد `const app = express();`
		return content.replace(appInit, `${appInit}\n${useLine}`);
	}

	// الأولوية هي الإضافة قبل معالج الأخطاء العام إذا كان موجوداً
	if (content.includes(globalErrorHandler)) {
		return content.replace(globalErrorHandler, `${useLine}${globalErrorHandler}`);
	}

	// إذا لم يكن معالج الأخطاء موجوداً بعد، أضف قبل التصدير النهائي
	if (content.includes(exportDefault)) {
		return content.replace(exportDefault, `${useLine}${exportDefault}`);
	}

	// كحل أخير
	return content + '\n' + useLine;
}
