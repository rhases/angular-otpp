'use strict';
/* eslint no-sync: 0 */

const videogular = require('videogular/dist/videogular/videogular');
const videogularControls = require('videogular/dist/controls/vg-controls');

const angular = require('angular');
const ngSanitize = require('angular-sanitize');

import OtppVideoController from './otpp-video.controller'
import ngModuleName from '../module-name';

export default angular.module(ngModuleName + '.video', [
  ngSanitize,
  "com.2fdevs.videogular",
  "com.2fdevs.videogular.plugins.controls"
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
