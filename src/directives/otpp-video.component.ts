'use strict';
/* eslint no-sync: 0 */
const angular = require('angular');
import OtppVideoController from './otpp-video.controller'
import ngModuleName from '../module-name';
const ngSanitize = require('angular-sanitize');


const videogular = require('videogular/dist/videogular/videogular');

export default angular.module(ngModuleName + '.video', [
  ngSanitize,
  "com.2fdevs.videogular"
])
  .directive('otppVideo', function() {
    return {
      template: require('./otpp-video.pug'),

      restrict: 'E',

      scope: {
        videoConfig: '=',
      },

      controller: OtppVideoController,
    }
  })
  .name;
