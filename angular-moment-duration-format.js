/* angular-moment-duration-format.js / v0.1.0 / (c) 2017 Vincenzo Carrese / MIT Licence */

'format amd';

/* global define */

(function () {
  'use strict';

  function requireMoment() {
    try {
      return require('moment'); // Using nw.js or browserify?
    } catch (e) {
      throw new Error('Please install moment via npm. Please reference to: https://github.com/vin-car/angular-moment-duration-format#Installation');
    }
  }
  

  function angularDurationFormat(angular, moment) {

    if(typeof moment === 'undefined') {
      if(typeof require === 'function') {
        moment = requireMoment();
      }else{
        throw new Error('Moment cannot be found by angular-moment! Please reference to: https://github.com/vin-car/angular-moment-duration-format#Installation');
      }
    }

    function createDuration(input, unit) {
      var duration;
      if( moment.isDuration(input) ){
        duration = input;
      } else {
        duration = moment.duration(input, unit);
      }
      return duration;
    }
    
    /**
     * @ngdoc overview
     * @name angularDurationFormat
     *
     * @description
     * angularDurationFormat module provides moment-duration-format functionality for angular.js apps.
     */
    angular.module('angularDurationFormat', [])

    .filter('amdCreate', function() {
      /**
       * @param {(number|Object|string)} input - value from wich create duration
       * @param {string} [unit] - unit of measurement for input parameter
       */
      return function(input, unit) {
        return createDuration(input, unit).toISOString();
      };
    })
    
    /**
     * @ngdoc filter
     * @name angularDurationFormat.filter:amdAdd
     * @module angularDurationFormat
     * @function
     */
    .filter('amdAdd', function() {
      /**
       * @param {(number|Object|string)} value - value to add to input duration
       * @param {string} [unit] - unit of measurement for value parameter
       */
      return function(input, value, unit) {
        var duration = createDuration(input);
        var out = duration.add(value, unit);
        return out.toISOString();
      };
    })
    
    /**
     * @ngdoc filter
     * @name angularDurationFormat.filter:amdSubtract
     * @module angularDurationFormat
     * @function
     */
    .filter('amdSubtract', function() {
      /**
       * @param {(number|Object|string)} value - value to subtract to input duration
       * @param {string} [unit] - unit of measurement for value parameter
       */
      return function(input, value, unit) {
        var duration = createDuration(input);
        var out = duration.subtract(value, unit);
        return out.toISOString();
      };
    })
    
    /**
     * @ngdoc filter
     * @name angularDurationFormat.filter:amdHumanize
     * @module angularDurationFormat
     * @function
     */
    .filter('amdHumanize', function() {
      /**
       * @param {string} [unit] - unit of measurement for input parameter
       */
      return function(input, unit) {
        var duration = createDuration(input, unit);
        var out = duration.humanize();
        return out;
      };
    })

    /**
     * @ngdoc filter
     * @name angularDurationFormat.filter:amdFormat
     * @module angularDurationFormat
     * @function
     */
    .filter('amdFormat', function() {
      /**
       * @param {string} [template] - Output template for duration
       * @param {number} [precision] - number of decimal digits to include after the decimal point
       * @param {Object} [settings] - settings object
       * template optional
       */
      return function(input, template, precision, settings) {
        var out = '';
        if( !input ){
          return out;
        }
        var duration = createDuration(input);
        out = duration.format(template, precision, settings);
        return out;
      };
    });

    return 'angularDurationFormat';
  }

  var isElectron = window && window.process && window.process.type;
  if (typeof define === 'function' && define.amd) {
    define(['angular', 'moment'], angularDurationFormat);
  } else if (typeof module !== 'undefined' && module && module.exports && (typeof require === 'function') && !isElectron) {
    module.exports = angularDurationFormat(require('angular'), require('moment'));
  } else {
    angularDurationFormat(angular, (typeof global !== 'undefined' ? global : window).moment);
  }
})();