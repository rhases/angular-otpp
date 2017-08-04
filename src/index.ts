const angular = require('angular');
const formly = require('angular-formly');

import things from './directives/things.component'

import { ThingsService }  from './services/things.service'
import { FormAnswerService } from './services/form-answer.service';

import ngModuleName from './module-name';

export default ngModuleName

const ngModule = angular.module(ngModuleName, [
  formly,
  things
])

//ngModule.constant('formlyVersion', VERSION) // <-- webpack variable
//ngModule.provider('formlyConfig', formlyConfig)

ngModule.service('ThingsService', ThingsService)
ngModule.service('FormAnswerService', FormAnswerService)

//ngModule.run(formlyCustomTags)
