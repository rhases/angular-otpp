'use strict';
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const uiBootstrap = require('angular-ui-bootstrap');

const otpp = require('angular-otpp');


import { MainController } from './app.component';

console.log('Hello World!')

var app = angular.module('angularOtppDemoApp', [
  'otpp',
  uiRouter,
  uiBootstrap])
.config(routeConfig)
.config(routing)

app.controller('MainController', MainController);

app.component('main', {
  template: require('./app.component.html'),
  controller: 'MainController'
})

angular
  .element(document)
  .ready(() => {
    angular.bootstrap(document, ['angularOtppDemoApp'], {
      strictDi: false
    });
  });

function routing($stateProvider) {
  'ngInject';
  $stateProvider
    .state('main', {
      url: '/?state',
      template: '<main></main>'
    });
};

function routeConfig($urlRouterProvider, $locationProvider) {
  'ngInject';

  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
}

export default app;
