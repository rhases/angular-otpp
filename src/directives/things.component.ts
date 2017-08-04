'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
import ThingsController from './things.controller'
import ngModuleName from '../module-name';

export default angular.module(ngModuleName + '.things', [])
  .directive('things', function() {
    return {
      template: require('./things.html'),

      restrict: 'E',

      // replace: true,
      // transclude: true,

      scope: {
        transitions: '=',
        things: '=',

        model: '=',
        thingKey: '=',

        onFinish: '&',
        onFinishThing: '&'
      },

      controller: ThingsController,
    }
  })
  .name;
