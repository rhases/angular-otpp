'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
import ThingsController from './things.controller'
import ngModuleName from '../module-name';

export default angular.module(ngModuleName + '.things', [])
  .directive('things', function() {
    return {
      template: require('./things.pug'),

      restrict: 'E',

      scope: {
        transitions: '=',
        things: '=',

        model: '=',
        thingKey: '=',

        onStart: '&',
        onStartThing: '&',

        onFinish: '&',
        onFinishThing: '&'
      },

      controller: ThingsController,
    }
  })
  .name;
