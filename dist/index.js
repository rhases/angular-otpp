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
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = 'otpp';


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var angularAnimate = __webpack_require__(4);
var formly = __webpack_require__(5);
var formlyTemplatesBootstrap = __webpack_require__(6);
var things_component_1 = __webpack_require__(7);
var tips_component_1 = __webpack_require__(10);
var things_service_1 = __webpack_require__(13);
var form_answer_service_1 = __webpack_require__(17);
var module_name_1 = __webpack_require__(2);
__webpack_require__(18);
exports.default = module_name_1.default;
var ngModule = angular.module(module_name_1.default, [
    angularAnimate,
    formly,
    formlyTemplatesBootstrap,
    things_component_1.default,
    tips_component_1.default
]);
ngModule.service('ThingsService', things_service_1.ThingsService);
ngModule.service('FormAnswerService', form_answer_service_1.FormAnswerService);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("angular-animate");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("angular-formly");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("angular-formly-templates-bootstrap");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var things_controller_1 = __webpack_require__(8);
var module_name_1 = __webpack_require__(2);
exports.default = angular.module(module_name_1.default + '.things', [])
    .directive('things', function () {
    return {
        template: __webpack_require__(9),
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
        controller: things_controller_1.default,
    };
})
    .name;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(1);
function ThingsController($scope, $timeout, $sce, $parse, ThingsService, FormAnswerService, $stateParams) {
    if (!$scope.transitions || !$scope.things)
        return;
    FormAnswerService.start($scope, 'model');
    ThingsService.load($scope.transitions, $scope.things, $stateParams.thingKey, $scope.onStart, $scope.onStartThing, $scope.onFinish, $scope.onFinishThing);
    $scope.current = ThingsService.getCurrentThing();
    $scope.current.scope = _.clone(FormAnswerService.get());
    $scope.currentTitle = getCurrentTitle($scope.current);
    $scope.next = function () {
        FormAnswerService.add($scope.current.scope);
        $timeout(function () {
            ThingsService.next();
        }, 50);
    };
    $timeout(function () {
        $scope.startedValid = $scope.thingForm && $scope.thingForm.$valid;
        if (!$scope.startedValid && $scope.current.immediate) {
            executeImmediate();
        }
    }, 250);
    function executeImmediate() {
        var checkIfCanPassDebounced = _.debounce(checkIfCanPass, 250, { 'maxWait': 1500 });
        $scope.$watch(function () { return $scope.thingForm.$invalid && $scope.thingForm.$pending; }, checkIfCanPassDebounced);
        function checkIfCanPass() {
            console.log('checkIfCanPass');
            if (!$scope.thingForm.$invalid && !$scope.thingForm.$pending) {
                $scope.next();
            }
        }
    }
    function getCurrentTitle(thing) {
        if (_.isObject(thing.title)) {
            for (var key in thing.title) {
                if ($parse(key)({ scope: thing.scope }))
                    return $sce.trustAsHtml(thing.title[key]);
            }
        }
        return $sce.trustAsHtml(thing.title);
    }
}
exports.default = ThingsController;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"things-box\"><div class=\"row\"><div class=\"col-sm-12\"><h2 class=\"thing-title\" ng-bind-html=\"currentTitle\"></h2><br class=\"hidden-xs\"/><br/><form class=\"form-horizontal\" name=\"thingForm\" novalidate=\"\"><div class=\"thing-form\"><formly-form model=\"current.scope\" fields=\"current.fields\"></formly-form><br class=\"hidden-xs\"/><tips tips=\"current.tips.values\" image=\"current.tips.image\" values=\"current.scope\"></tips><br class=\"hidden-xs\" ng-show=\"current.tips &amp;&amp; current.tips.values.length &gt; 0\"/></div><div class=\"thing-button\"><div class=\"text-right\" ng-hide=\"!startedValid &amp;&amp; current.immediate\"><button class=\"btn btn-primary btn-lg\" ng-click=\"next()\" ng-disabled=\"thingForm.$invalid || thingForm.$pending\"> Próximo</button></div></div></form></div></div></div>"

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var tips_controller_1 = __webpack_require__(11);
var module_name_1 = __webpack_require__(2);
exports.default = angular.module(module_name_1.default + '.tips', [])
    .directive('tips', function () {
    return {
        template: __webpack_require__(12),
        restrict: 'E',
        scope: {
            tips: '=',
            values: '=',
            image: '='
        },
        controller: tips_controller_1.default,
    };
})
    .name;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

TipsController.$inject = ["$scope", "$parse"];
Object.defineProperty(exports, "__esModule", { value: true });
function TipsController($scope, $parse) {
    'ngInject';
    if ($scope.tips) {
        $scope.tips.forEach(function (tip) {
            if (tip.condition) {
                var parser = $parse(tip.condition);
                tip.evaluateCondition = function () { return parser({ scope: $scope.values }); };
            }
            else {
                tip.evaluateCondition = function () { return true; };
            }
        });
    }
    $scope.hasAnyOneTipToShow = function () {
        if (!$scope.tips)
            return false;
        return $scope.tips.reduce(function (final, tip) {
            return final || tip.evaluateCondition();
        }, false);
    };
}
exports.default = TipsController;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tips-box\" ng-show=\"hasAnyOneTipToShow()\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"tip\"><img class=\"tip-image img-circle concierge-image\" ng-src=\"{{image}}\" ng-if=\"image\"/><div class=\"alert alert-info tip-message\"><span ng-hide=\"hasAnyOneTipToShow()\"><br/></span><span ng-repeat=\"tip in tips\" ng-show=\"tip.text &amp;&amp; tip.evaluateCondition()\">{{ tip.text }}</span></div></div></div></div></div>"

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var execution_service_1 = __webpack_require__(14);
var _ = __webpack_require__(1);
var ThingsService = (function () {
    function ThingsService($state, $stateParams, FormAnswerService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.FormAnswerService = FormAnswerService;
    }
    ThingsService.prototype.load = function (transitions, things, actualThingKey, onStart, onStartThing, onFinish, onFinishThing) {
        this.onFinish = onFinish;
        this.onFinishThing = onFinishThing;
        this.executionService = new execution_service_1.ExecutionService(transitions, things, this.FormAnswerService.get());
        if (actualThingKey) {
            this.executionService.go(actualThingKey);
        }
        else {
            actualThingKey = this.executionService.start();
            if (onStart) {
                onStart({ model: this.FormAnswerService.get() });
            }
        }
        var current = this.executionService.getCurrent();
        if (onStartThing) {
            onStartThing({ thing: current, model: this.FormAnswerService.get() });
        }
    };
    ThingsService.prototype.getCurrentThing = function () {
        return this.executionService.getCurrent();
    };
    ThingsService.prototype.next = function () {
        var current = this.executionService.getCurrent();
        if (this.onFinishThing) {
            this.onFinishThing({ thing: current, model: this.FormAnswerService.get() });
        }
        var nextThing = this.executionService.next();
        if (!nextThing) {
            if (this.onFinish) {
                this.onFinish({ model: this.FormAnswerService.get() });
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = __webpack_require__(15);
var transitions_service_1 = __webpack_require__(16);
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
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(1);
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
        function mergeUsingSourceArray(objValue, srcValue) {
            if (_.isArray(objValue)) {
                return srcValue;
            }
        }
        this.formAnswer = _.mergeWith(this.formAnswer, oneThingAnswer, mergeUsingSourceArray);
        this.scope[this.propName] = _.mergeWith(this.scope[this.propName], this.formAnswer, mergeUsingSourceArray);
    };
    return FormAnswerService;
}());
exports.FormAnswerService = FormAnswerService;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map