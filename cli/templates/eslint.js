// هذا الملف يحتوي على القالب الخاص بإعدادات ESLint
// تم تحديث المحتوى بناءً على طلبك.

exports.eslintTemplate = `{
	"env": {
		"node": true,
		"es2021": true
	},
	"parserOptions": {
		"ecmaVersion": 12,
		"sourceType": "module"
	},
	"extends": ["eslint:recommended", "plugin:prettier/recommended", "plugin:node/recommended"],
	"plugins": ["node", "prettier"],
	"rules": {
		"prettier/prettier": "error",
		"semi": ["error", "always"],
		"quotes": ["error", "single"],
		"indent": ["error", "tab"],
		"no-console": "off",
		"no-unused-vars": [
			"warn",
			{
				"argsIgnorePattern": "next|req|res|err"
			}
		],
		"callback-return": ["error", ["done", "next"]],
		"prefer-arrow-callback": "error",
		"func-style": ["error", "expression"],
		"handle-callback-err": ["error", "^(err|error)$"],
		"no-process-exit": "off",
		"no-path-concat": "error",
		"require-await": "warn",
		"dot-notation": "warn",
		"eqeqeq": ["warn", "always"],
		"no-throw-literal": "error",
		"prefer-const": "warn",
		"node/no-unsupported-features/es-syntax": "off",
		"node/no-missing-import": "off"
	}
}
`;