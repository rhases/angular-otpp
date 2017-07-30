const angular = require('angular');
const formly = require('angular-formly');
const formlyBootstrapTemplates = require('angular-formly-templates-bootstrap');

import things from './directives/things'
import { thingsServiceFactory }  from './service/things.service'

export { Flow } from './components/flow/flow';
export { Thing } from './components/thing';

const ngModuleName = 'otpp'

export default ngModuleName



const ngModule = angular.module(ngModuleName, [
  formly,
  formlyBootstrapTemplates
])

//ngModule.constant('formlyVersion', VERSION) // <-- webpack variable

//ngModule.provider('formlyConfig', formlyConfig)

ngModule.factory('thingsService', thingsServiceFactory)


ngModule.directive('things', things)
//ngModule.controller('FormlyFormController', FormlyFormController)

//ngModule.run(formlyCustomTags)
