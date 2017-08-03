const angular = require('angular');
const formly = require('angular-formly');
const formlyBootstrapTemplates = require('angular-formly-templates-bootstrap');

import things from './directives/things'
import ThingsController from './directives/things.controller'

import { ThingsService }  from './service/things.service'

export { Transition } from './components/transition';
export { Thing } from './components/thing';

const ngModuleName = 'otpp'

export default ngModuleName



const ngModule = angular.module(ngModuleName, [
  formly,
  formlyBootstrapTemplates
])

//ngModule.constant('formlyVersion', VERSION) // <-- webpack variable

//ngModule.provider('formlyConfig', formlyConfig)

ngModule.service('thingsService', ThingsService)
ngModule.controller('ThingsController', ThingsController)
ngModule.directive('things', things)

//ngModule.run(formlyCustomTags)
