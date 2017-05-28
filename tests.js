/* License: MIT.
 * Copyright (C) 2017 Vincenzo Carrese.
 */

/* global describe, inject, module, beforeEach, it, expect */

'use strict';

describe('module angularDurationFormat', function () {

	var $filter;

	beforeEach(module('angularDurationFormat'));

	beforeEach(inject(function ($injector) {
		$filter = $injector.get('$filter');

	}));

	describe('amdCreate filter', function () {

		var amdCreate;

		beforeEach(function () {
			amdCreate = $filter('amdCreate');
		});

		it('should print empty duration', function () {
			var input = 0;
			expect(amdCreate(input, 'hour').toString()).toMatch(/^P0D$/);
		});

		it('should print 1ms duration', function () {
			var input = 1;
			expect(amdCreate(input).toString()).toMatch(/^PT0\.001S$/);
		});

		it('should print 1000ms duration', function () {
			var input = 1000;
			expect(amdCreate(input).toString()).toMatch(/^PT1S$/);
		});

		it('should show existing duration', function () {
			var input = moment.duration(1, 'm');
			expect(amdCreate(input).toString()).toMatch(/^PT1M$/);
		});

		it('should print 10 hours and 30 minutes duration (string creation)', function () {
			var input = '10:30';
			expect(amdCreate(input).toString()).toMatch(/^PT10H30M$/);
		});

		it('should print duration created using object', function () {
			var input = {months: 2, years: 1};
			expect(amdCreate(input).toString()).toMatch(/^P1Y2M$/);
		});

	});

	describe('amdHumanize filter', function () {
		var amdHumanize;

		beforeEach(function () {
			moment.locale('en');
			amdHumanize = $filter('amdHumanize');
		});

		it('should print a few seconds', function () {
			var input = moment.duration(1, 's');
			expect(amdHumanize(input).toString()).toMatch(/^a few seconds$/);
		});

		/* no 2 seconds */

		it('should print a minute', function () {
			var input = moment.duration(1, 'm');
			expect(amdHumanize(input).toString()).toMatch(/^a minute$/);
		});

		it('should print 2 minutes', function () {
			var input = moment.duration(2, 'm');
			expect(amdHumanize(input).toString()).toMatch(/^2 minutes$/);
		});

		it('should print an hour', function () {
			var input = moment.duration(1, 'h');
			expect(amdHumanize(input).toString()).toMatch(/^an hour$/);
		});

		it('should print 2 hours', function () {
			var input = moment.duration(2, 'h');
			expect(amdHumanize(input).toString()).toMatch(/^2 hours$/);
		});

		it('should print a day', function () {
			var input = moment.duration(1, 'd');
			expect(amdHumanize(input).toString()).toMatch(/^a day$/);
		});

		it('should print 2 days', function () {
			var input = moment.duration(2, 'd');
			expect(amdHumanize(input).toString()).toMatch(/^2 days$/);
		});

		it('should print a week', function () {
			var input = moment.duration(1, 'w');
			expect(amdHumanize(input).toString()).toMatch(/^7 days$/);
		});

		it('should print 2 weeks', function () {
			var input = moment.duration(2, 'w');
			expect(amdHumanize(input).toString()).toMatch(/^14 days$/);
		});

		it('should print a month', function () {
			var input = moment.duration(1, 'M');
			expect(amdHumanize(input).toString()).toMatch(/^a month$/);
		});

		it('should print 2 months', function () {
			var input = moment.duration(2, 'M');
			expect(amdHumanize(input).toString()).toMatch(/^2 months$/);
		});

		it('should print a year', function () {
			var input = moment.duration(1, 'y');
			expect(amdHumanize(input).toString()).toMatch(/^a year$/);
		});

		it('should print 2 years', function () {
			var input = moment.duration(2, 'y');
			expect(amdHumanize(input).toString()).toMatch(/^2 years$/);
		});

		it('should print Invalid Date (wrong input)', function () {
			var input = moment.duration.invalid();
			expect(amdHumanize(input).toString()).toMatch(/^Invalid Date$/i);
		});
	});

	describe('amdAdd filter', function () {
		var amdAdd;

		beforeEach(function () {
			amdAdd = $filter('amdAdd');
		});

		it('should add 1 day yo 10 days duration', function () {
			var input = moment.duration(10, 'd');
			var value = 1;
			var unit = 'd';
			expect(amdAdd(input, value, unit).toString()).toMatch(/^P11D$/);
		});
	});

	describe('amdSubtract filter', function () {
		var amdSubtract;

		beforeEach(function () {
			amdSubtract = $filter('amdSubtract');
		});

		it('should subtract 1 day yo 10 days duration', function () {
			var input = moment.duration(10, 'd');
			var value = 1;
			var unit = 'd';
			expect(amdSubtract(input, value, unit).toString()).toMatch(/^P9D$/);
		});
	});

	describe('amdFormat filter', function () {
		var amdFormat;

		beforeEach(function () {
			amdFormat = $filter('amdFormat');
		});

		it('should print empty string', function () {
			var input = '';
			expect(amdFormat(input).toString()).toMatch(/^$/);
		});

		it('should print 01:30', function () {
			var input = moment.duration({h: 1, m: 30});
			var template = 'HH:mm';
			expect(amdFormat(input, template).toString()).toMatch(/^01:30$/);
		});

		it('should print 3y 2mo 0w 2d 9h 46m 40s 13ms', function () {
			var input = moment.duration({y:3, M:2, d:2, h: 9, m:46, s:40,  ms:13});
			var template = 'y[y] M[mo] w[w] d[d] h[h] m[m] s[s] S[ms]';
			expect(amdFormat(input, template).toString()).toMatch(/^3y 2mo 0w 2d 9h 46m 40s 13ms$/);
		});

		it('should print 31536000000 (1 year as seconds)', function () {
			var input = moment.duration(1, "years");
			var template = 'S';
			expect(amdFormat(input, template).toString()).toMatch(/^31536000000$/);
		});

	});
});