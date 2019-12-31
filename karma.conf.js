'use strict';

module.exports = function (config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine'],
		logLevel: config.LOG_INFO,
		browsers: ['ChromeHeadless'],
		autoWatch: true,
		reporters: ['dots', 'coverage'],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/moment/moment.js',
			'node_modules/moment-duration-format/lib/moment-duration-format.js',
			'angular-moment-duration-format.js',

			// angular-mocks defines a global variable named 'module' which confuses moment-timezone.js.
			// Therefore, it must be included after moment-timezone.js.
			'node_modules/angular-mocks/angular-mocks.js',

			'tests.js'
		],
		preprocessors: {
			'angular-moment-duration-format.js': 'coverage'
		},
		coverageReporter: {
			type: 'lcov',
			dir: 'coverage/'
		},
		singleRun: true
	});
};