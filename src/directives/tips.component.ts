'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
import TipsController from './tips.controller'
import ngModuleName from '../module-name';

export default angular.module(ngModuleName + '.tips', [])
  .directive('tips', function() {
    return {
      template: require('./tips.pug'),

      restrict: 'E',

      scope: {
        tips: '=',
        values: '=',
        image: '='
      },

      controller: TipsController,
    }
  })
  .name;
