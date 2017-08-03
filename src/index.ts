const angular = require('angular');
const formly = require('angular-formly');
const formlyBootstrapTemplates = require('angular-formly-templates-bootstrap');

import things from './directives/things'

import { ThingsService }  from './services/things.service'
import { FormAnswerService } from './services/form-answer.service';

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

ngModule.service('ThingsService', ThingsService)
ngModule.service('FormAnswerService', FormAnswerService)

ngModule.directive('things', things)

//ngModule.run(formlyCustomTags)
