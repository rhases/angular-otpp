module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("angular");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 'otpp';


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var formly = __webpack_require__(4);
var things_component_1 = __webpack_require__(5);
var things_service_1 = __webpack_require__(8);
var form_answer_service_1 = __webpack_require__(12);
var module_name_1 = __webpack_require__(1);
exports.default = module_name_1.default;
var ngModule = angular.module(module_name_1.default, [
    formly,
    things_component_1.default
]);
ngModule.service('ThingsService', things_service_1.ThingsService);
ngModule.service('FormAnswerService', form_answer_service_1.FormAnswerService);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("angular-formly");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var things_controller_1 = __webpack_require__(6);
var module_name_1 = __webpack_require__(1);
exports.default = angular.module(module_name_1.default + '.things', [])
    .directive('things', function () {
    return {
        template: __webpack_require__(7),
        restrict: 'E',
        scope: {
            transitions: '=',
            things: '=',
            model: '=',
            thingKey: '=',
            onFinish: '&',
            onFinishThing: '&'
        },
        controller: things_controller_1.default,
    };
})
    .name;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function ThingsController($scope, ThingsService, FormAnswerService, $stateParams) {
    if (!$scope.transitions || !$scope.things)
        return;
    FormAnswerService.start($scope, 'model');
    ThingsService.load($scope.transitions, $scope.things, $stateParams.thingKey, $scope.onFinish);
    $scope.current = ThingsService.getCurrentThing();
    $scope.next = function () {
        if ($scope.onFinishThing) {
            $scope.onFinishThing({ thing: $scope.current, model: FormAnswerService.get() });
        }
        ThingsService.next();
    };
}
exports.default = ThingsController;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div class=\"things-box\">\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n\n      <h2> {{current.title }} </h2>\n\n      <br class=\"hidden-xs\"></br>\n      <br class=\"hidden-xs hidden-sm\"></br>\n\n      <form name=\"thingForm\" novalidate class=\"form-horizontal\">\n\n        <formly-form model=\"current.scope\" fields=\"current.fields\"></formly-form>\n\n        <br class=\"hidden-xs\"></br>\n        <br class=\"hidden-xs hidden-sm\"></br>\n\n        <div class=\"text-right\">\n          <button class=\"btn btn-primary btn-lg\" ng-click=\"next()\" ng-disabled=\"thingForm.$invalid\"> Próximo </button>\n        </div>\n\n      </form>\n\n    </div>\n  </div>\n</div>\n"

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var execution_service_1 = __webpack_require__(9);
var _ = __webpack_require__(2);
var ThingsService = (function () {
    function ThingsService($state, $stateParams, FormAnswerService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.FormAnswerService = FormAnswerService;
    }
    ThingsService.prototype.load = function (transitions, things, actualThingKey, onFinish) {
        this.executionService = new execution_service_1.ExecutionService(transitions, things, this.FormAnswerService.get());
        if (actualThingKey) {
            this.executionService.go(actualThingKey);
        }
        else {
            this.executionService.start();
        }
        this.onFinish = onFinish;
    };
    ThingsService.prototype.getCurrentThing = function () {
        return this.executionService.getCurrent();
    };
    ThingsService.prototype.next = function () {
        var current = this.executionService.getCurrent();
        this.FormAnswerService.add(current.scope);
        var nextThing = this.executionService.next();
        if (!nextThing) {
            if (this.onFinish) {
                this.onFinish(this.FormAnswerService.get());
            }
        }
        else {
            var stateParams = _.merge(this.$stateParams, { thingKey: nextThing.key });
            this.$state.go(this.$state.current.name, stateParams);
        }
    };
    return ThingsService;
}());
exports.ThingsService = ThingsService;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = __webpack_require__(10);
var transitions_service_1 = __webpack_require__(11);
var ExecutionService = (function () {
    function ExecutionService(transitions, things, scope) {
        this.transitions = transitions;
        this.scope = scope;
        this.things = things;
        this.createMap(things);
        this.transitionService = new transitions_service_1.TransitionsService(transitions, scope);
    }
    ExecutionService.prototype.createMap = function (things) {
        var _this = this;
        this.thingsMap = { "start": new thing_1.Thing() };
        things.forEach(function (thing) {
            if (_this.thingsMap[thing.key]) {
                throw Error('Error inializing otpp execution. Multiple things with the same key');
            }
            _this.thingsMap[thing.key] = thing;
        });
    };
    ExecutionService.prototype.start = function () {
        var state = this.transitionService.getStartThing();
        return this.getThing(state);
    };
    ExecutionService.prototype.next = function () {
        var state = this.transitionService.getNextThing();
        if (state == 'end')
            return undefined;
        return this.getThing(state);
    };
    ExecutionService.prototype.go = function (actualThingKey) {
        this.transitionService.go(actualThingKey);
        return this.getThing(actualThingKey);
    };
    ExecutionService.prototype.getCurrent = function () {
        return this.getThing(this.transitionService.current);
    };
    ExecutionService.prototype.getThing = function (state) {
        var thing = this.thingsMap[state];
        if (!thing)
            throw Error('OTPP: no "Thing" found for state "' + state + '"');
        return thing;
    };
    return ExecutionService;
}());
exports.ExecutionService = ExecutionService;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Thing = (function () {
    function Thing() {
    }
    return Thing;
}());
exports.Thing = Thing;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransitionsService = (function () {
    function TransitionsService(transitions, scope) {
        this.transitions = transitions;
        this.scope = scope;
    }
    TransitionsService.prototype.getStartThing = function () {
        return this.nextThingFromCurrentKey("start");
    };
    TransitionsService.prototype.getNextThing = function () {
        return this.nextThingFromCurrentKey(this.current);
    };
    TransitionsService.prototype.nextThingFromCurrentKey = function (currentKey) {
        var _this = this;
        var nextArr = this.transitions
            .filter(function (transition) {
            return (transition.from === currentKey);
        })
            .filter(function (transition) {
            if (!transition.condition) {
                return true;
            }
            else {
                return _this.evaluate(_this.scope, transition.condition);
            }
        });
        if (nextArr.length === 0) {
            throw Error('no destination state found from "' + currentKey + '" state');
        }
        if (nextArr.length > 1) {
            throw Error('more then one destination state found from "' + currentKey + '" state');
        }
        this.current = nextArr[0].to;
        return this.current;
    };
    TransitionsService.prototype.go = function (thingKey) {
        this.current = thingKey;
        return thingKey;
    };
    TransitionsService.prototype.evaluate = function (scope, condition) {
        var result = false;
        try {
            result = function (scope) {
                result = eval('(' + condition + ')');
                return result;
            }(this.scope);
        }
        catch (err) {
            console.log('undefined variable when evaluating condition');
        }
        return result;
    };
    return TransitionsService;
}());
exports.TransitionsService = TransitionsService;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(2);
var FormAnswerService = (function () {
    function FormAnswerService() {
        this.formAnswer = {};
    }
    FormAnswerService.prototype.start = function (scope, propName) {
        this.scope = scope;
        this.propName = propName;
        this.scope[this.propName] = _.merge(this.scope[this.propName], this.formAnswer);
    };
    FormAnswerService.prototype.get = function () {
        return this.scope[this.propName];
    };
    FormAnswerService.prototype.add = function (oneThingAnswer) {
        this.formAnswer = _.merge(this.formAnswer, oneThingAnswer);
        this.scope[this.propName] = _.merge(this.scope[this.propName], this.formAnswer);
    };
    return FormAnswerService;
}());
exports.FormAnswerService = FormAnswerService;


/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map