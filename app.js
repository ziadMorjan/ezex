#!/usr/bin/env node
const minimist = require('minimist');
const { init } = require('./cli/index');
const { version } = require('./package.json'); // نقرأ الملف من هنا لأنه في نفس المجلد

// Parse arguments using minimist for better flag handling
const args = minimist(process.argv.slice(2), {
	string: ['c', 'controller', 'm', 'model', 'r', 'router', 'crud', 'i', 'install', 'd', 'dir', 'f', 'file'],
	boolean: ['all', 'help', 'version'],
	alias: {
		c: 'controller',
		m: 'model',
		r: 'router',
		i: 'install',
		d: 'dir',
		f: 'file'
	}
});

// نقوم بتمرير رقم الإصدار إلى دالة التهيئة
init(args, version);
