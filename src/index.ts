const angular = require('angular');
const angularAnimate = require('angular-animate');
const formly = require('angular-formly');
const formlyTemplatesBootstrap = require('angular-formly-templates-bootstrap');

import things from './directives/things.component'
import tips from './directives/tips.component'

import { ThingsService }  from './services/things.service'
import { FormAnswerService } from './services/form-answer.service';

import ngModuleName from './module-name';

import './index.scss';

export default ngModuleName

const ngModule = angular.module(ngModuleName, [
  angularAnimate,
  formly,
  formlyTemplatesBootstrap,
  things,
  tips
])

//ngModule.constant('formlyVersion', VERSION) // <-- webpack variable
//ngModule.provider('formlyConfig', formlyConfig)

ngModule.service('ThingsService', ThingsService)
ngModule.service('FormAnswerService', FormAnswerService)

//ngModule.run(formlyCustomTags)
