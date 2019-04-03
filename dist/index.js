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
var angularAnimate = __webpack_require__(4);
var formly = __webpack_require__(5);
var formlyTemplatesBootstrap = __webpack_require__(6);
var things_component_1 = __webpack_require__(7);
var otpp_video_component_1 = __webpack_require__(10);
var tips_component_1 = __webpack_require__(18);
var things_service_1 = __webpack_require__(21);
var form_answer_service_1 = __webpack_require__(25);
var module_name_1 = __webpack_require__(1);
__webpack_require__(26);
exports.default = module_name_1.default;
var ngModule = angular.module(module_name_1.default, [
    angularAnimate,
    formly,
    formlyTemplatesBootstrap,
    things_component_1.default,
    tips_component_1.default,
    otpp_video_component_1.default
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
var module_name_1 = __webpack_require__(1);
exports.default = angular.module(module_name_1.default + '.things', [])
    .directive('things', function () {
    return {
        template: __webpack_require__(9),
        restrict: 'E',
        scope: {
            transitions: '=',
            things: '=',
            enableBackButton: '=',
            model: '=',
            form: '=',
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

ThingsController.$inject = ["$scope", "$timeout", "$sce", "$parse", "$window", "$filter", "ThingsService", "FormAnswerService", "$stateParams", "$log"];
Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(2);
function ThingsController($scope, $timeout, $sce, $parse, $window, $filter, ThingsService, FormAnswerService, $stateParams, $log) {
    'ngInject';
    if (!$scope.transitions || !$scope.things)
        return;
    FormAnswerService.start($scope, 'model');
    ThingsService.load($scope.transitions, $scope.things, $scope.thingKey, $scope.onStart, $scope.onStartThing, $scope.onFinish, $scope.onFinishThing);
    $scope.current = ThingsService.getCurrentThing();
    $scope.current.scope = _.clone(FormAnswerService.get());
    $scope.current.scope.form = $scope.form;
    $scope.currentTitle = resolve($scope.current, $scope.current.title);
    $scope.currentSubtitle = resolve($scope.current, $scope.current.subtitle);
    $scope.currentText = resolve($scope.current, $scope.current.text);
    $scope.next = function () {
        FormAnswerService.add($scope.current.scope);
        $timeout(function () {
            ThingsService.next();
        }, 50);
    };
    $scope.back = function () {
        ThingsService.back();
    };
    this.$onInit = function () {
        $timeout(function () {
            $scope.startedValid = $scope.thingForm && $scope.thingForm.$valid;
            if ($scope.current.immediate
                && (!$scope.startedValid || _.isEmpty($scope.current.fields))) {
                executeImmediate();
            }
        }, 250);
    };
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
    function resolve(thing, expression) {
        var value;
        if (_.isObject(expression)) {
            for (var key in expression) {
                if ($parse(key)({ scope: thing.scope })) {
                    value = expression[key];
                }
            }
        }
        else {
            value = expression;
        }
        if (value && value.charAt(0) == '`') {
            var formatCurrency = $filter('currency');
            var scope = thing.scope;
            try {
                eval("value = " + value);
            }
            catch (err) {
                $log.error(err);
            }
        }
        return $sce.trustAsHtml(value);
    }
}
exports.default = ThingsController;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "<div class=\"things-box\" ng-class=\"current.thingClass\"><div class=\"row\"><div class=\"col-sm-12\"><h2 class=\"thing-title\" ng-bind-html=\"currentTitle\" ng-if=\"!!currentTitle\"></h2><h2 class=\"thing-title\" ng-bind-html=\"currentSubtitle\" ng-if=\"!!currentSubtitle\"></h2><p class=\"thing-text\" ng-bind-html=\"currentText\" ng-if=\"!!currentText\" ng-class=\"current.textClass\"></p><div class=\"thing-images\" ng-repeat=\"image in current.images\" ng-if=\"!!current.images\"><img class=\"thing-image\" ng-src=\"{{image.src}}\" alt=\"{{image.alt}}\" ng-class=\"image.class\"/></div><br class=\"hidden-xs\"/><span ng-if=\"!!current.video\"><otpp-video video-config=\"current.video\"></otpp-video></span><form class=\"form-vertical\" name=\"thingForm\" novalidate=\"\" ng-class=\"current.formClass\"><div class=\"thing-form\"><formly-form model=\"current.scope\" fields=\"current.fields\"></formly-form><br class=\"hidden-xs\"/><tips tips=\"current.tips.values\" image=\"current.tips.image\" values=\"current.scope\"></tips><br class=\"hidden-xs\" ng-show=\"current.tips &amp;&amp; current.tips.values.length &gt; 0\"/></div><div class=\"thing-button\"><div class=\"text-righ\"><div class=\"btn-group\" ng-hide=\"!startedValid &amp;&amp; current.immediate\" role=\"group\"><button class=\"pull-right btn btn-primary btn-lg\" ng-click=\"next()\" ng-disabled=\"thingForm.$invalid || thingForm.$pending\" ng-hide=\"current.disableNextButton\"> Próximo<span ng-hide=\"!enableBackButton || current.disableBackButton\">&nbsp;&nbsp;<i class=\"fa fa-caret-right\"></i></span></button><button class=\"pull-left btn btn-secondary btn-lg\" ng-click=\"back()\" ng-hide=\"!enableBackButton || current.disableBackButton\"> <i class=\"fa fa-caret-left\"></i></button></div></div></div></form></div></div></div>"

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var videogular = __webpack_require__(11);
var videogularControls = __webpack_require__(12);
var angular = __webpack_require__(0);
var ngSanitize = __webpack_require__(13);
var otpp_video_controller_1 = __webpack_require__(15);
var module_name_1 = __webpack_require__(1);
exports.default = angular.module(module_name_1.default + '.video', [
    ngSanitize,
    "com.2fdevs.videogular",
    "com.2fdevs.videogular.plugins.controls"
])
    .directive('otppVideo', function () {
    return {
        template: __webpack_require__(17),
        restrict: 'E',
        scope: {
            videoConfig: '=',
        },
        controller: otpp_video_controller_1.default,
    };
})
    .name;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license videogular v1.4.4 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */

angular.module("com.2fdevs.videogular", ["ngSanitize"])
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-media-video", "<video></video>");
        $templateCache.put("vg-templates/vg-media-audio", "<audio></audio>");

        // Support for browsers that doesn't have .bind()
        if (!Function.prototype.bind) {
            Function.prototype.bind = function (oThis) {
                if (typeof this !== 'function') {
                    // closest thing possible to the ECMAScript 5
                    // internal IsCallable function
                    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                    fToBind = this,
                    fNOP = function () {
                    },
                    fBound = function () {
                        return fToBind.apply(this instanceof fNOP
                                ? this
                                : oThis,
                            aArgs.concat(Array.prototype.slice.call(arguments)));
                    };

                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }
    }]
);

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.constant:VG_STATES
 *
 * @description
 * Possible video states:
 *  - VG_STATES.PLAY: "play"
 *  - VG_STATES.PAUSE: "pause"
 *  - VG_STATES.STOP: "stop"
 **/
/**
 * @ngdoc service
 * @name com.2fdevs.videogular.constant:VG_VOLUME_KEY
 *
 * @description localStorage key name for persistent video play volume on a domain.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
    .constant("VG_STATES", {
        PLAY: "play",
        PAUSE: "pause",
        STOP: "stop"
    })
    .constant("VG_VOLUME_KEY", "videogularVolume");

"use strict";
/**
 * @ngdoc controller
 * @name com.2fdevs.videogular.controller:vgController
 * @description
 * Videogular controller.
 * This controller offers a public API:
 *
 * Methods
 * - play(): Plays media.
 * - pause(): Pause media.
 * - stop(): Stops media.
 * - playPause(): Toggles play and pause.
 * - seekTime(value, byPercent): Seeks to a specified time position. Param value must be an integer representing the target position in seconds or a percentage. By default seekTime seeks by seconds, if you want to seek by percentage just pass byPercent to true.
 * - setVolume(volume): Sets volume. Param volume must be a float number with a value between 0 and 1.
 * - setPlayback(playback): Sets playback. Param plaback must be a float number with a value between 0 and 2.
 * - setState(state): Sets a new state. Param state mus be an string with 'play', 'pause' or 'stop'. This method only changes the state of the player, but doesn't plays, pauses or stops the media file.
 * - toggleFullScreen(): Toggles between fullscreen and normal mode.
 * - updateTheme(css-url): Removes previous CSS theme and sets a new one.
 * - clearMedia(): Cleans the current media file.
 * - changeSource(array): Updates current media source. Param `array` must be an array of media source objects.
 * A media source is an object with two properties `src` and `type`. The `src` property must contains a trustful url resource. You may explicitly supply an `isLive` flag to override automatic detection.
 * <pre>{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"}</pre>
 *
 * Properties
 * - config: String with a url to JSON config file.
 * - isReady: Boolean value with current player initialization state.
 * - isBuffering: Boolean value to know if player is buffering media.
 * - isCompleted: Boolean value to know if current media file has been completed.
 * - isLive: Boolean value to know if current media file is a Live Streaming.
 * - playsInline: Boolean value to know if Videogular is using inline playing or not.
 * - nativeFullscreen: Boolean value to know if Videogular if fullscreen mode will use native mode or emulated mode.
 * - mediaElement: Reference to video/audio object.
 * - videogularElement: Reference to videogular tag.
 * - sources: Array with current sources.
 * - activeSource: The source presently applied to the media element.
 * - tracks: Array with current tracks.
 * - cuePoints: Object containing a list of timelines with cue points. Each property in the object represents a timeline, which is an Array of objects with the next definition:
 * <pre>{
 *    timeLapse:{
 *      start: 0,
 *      end: 10
 *    },
 *    onEnter: callback(currentTime, timeLapse, params),
 *    onLeave: callback(currentTime, timeLapse, params),
 *    onUpdate: callback(currentTime, timeLapse, params),
 *    onComplete: callback(currentTime, timeLapse, params),
 *    params: {
 *      // Custom object with desired structure and data
 *    }
 * }</pre>
 *
 *    * **timeLapse:** Object with start and end properties to define in seconds when this timeline is active.\n
 *    * **onEnter:** Callback function that will be called when progress reaches a cue point or being outside a cue point user seeks to a cue point manually.
 *    * **onLeave:** Callback function that will be called when user seeks and the new time doesn't reach to the timeLapse.start property.
 *    * **onUpdate:** Callback function that will be called when the progress is in the middle of timeLapse.start and timeLapse.end.
 *    * **onComplete:** Callback function that will be called when the progress is bigger than timeLapse.end.
 *    * **params:** Custom object with data to pass to the callbacks.
 *
 * - isFullScreen: Boolean value to know if we’re in fullscreen mode.
 * - currentState: String value with “play”, “pause” or “stop”.
 * - currentTime: Number value with current media time progress.
 * - totalTime: Number value with total media time.
 * - timeLeft: Number value with current media time left.
 * - volume: Number value with current volume between 0 and 1.
 * - playback: Number value with current playback between 0 and 2.
 * - bufferEnd: Number value with latest buffer point in milliseconds.
 * - buffered: Array of TimeRanges objects that represents current buffer state.
 *
 */
angular.module("com.2fdevs.videogular")
    .controller("vgController",
    ['$scope', '$window', 'vgConfigLoader', 'vgFullscreen', 'VG_UTILS', 'VG_STATES', 'VG_VOLUME_KEY', function ($scope, $window, vgConfigLoader, vgFullscreen, VG_UTILS, VG_STATES, VG_VOLUME_KEY) {
        var currentTheme = null;
        var isFullScreenPressed = false;
        var isMetaDataLoaded = false;
        var hasStartTimePlayed = false;
        var isVirtualClip = false;
        var playPromise = null;

        // PUBLIC $API
        this.videogularElement = null;

        this.clearMedia = function () {
            this.mediaElement[0].src = '';
            this.mediaElement[0].removeEventListener("canplay", this.onCanPlay.bind(this), false);
            this.mediaElement[0].removeEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            this.mediaElement[0].removeEventListener("waiting", this.onStartBuffering.bind(this), false);
            this.mediaElement[0].removeEventListener("ended", this.onComplete.bind(this), false);
            this.mediaElement[0].removeEventListener("playing", this.onStartPlaying.bind(this), false);
            this.mediaElement[0].removeEventListener("play", this.onPlay.bind(this), false);
            this.mediaElement[0].removeEventListener("pause", this.onPause.bind(this), false);
            this.mediaElement[0].removeEventListener("volumechange", this.onVolumeChange.bind(this), false);
            this.mediaElement[0].removeEventListener("playbackchange", this.onPlaybackChange.bind(this), false);
            this.mediaElement[0].removeEventListener("timeupdate", this.onUpdateTime.bind(this), false);
            this.mediaElement[0].removeEventListener("progress", this.onProgress.bind(this), false);
            this.mediaElement[0].removeEventListener("seeking", this.onSeeking.bind(this), false);
            this.mediaElement[0].removeEventListener("seeked", this.onSeeked.bind(this), false);
            this.mediaElement[0].removeEventListener("error", this.onVideoError.bind(this), false);
        };

        this.onRouteChange = function() {
            if (this.clearMediaOnNavigate === undefined || this.clearMediaOnNavigate === true) {
                this.clearMedia();
            }
        };

        this.onCanPlay = function (evt) {
            this.isBuffering = false;
            $scope.$parent.$digest($scope.vgCanPlay({$event: evt}));

            if (!hasStartTimePlayed && (this.startTime > 0 || this.startTime === 0)) {
                this.seekTime(this.startTime);
                hasStartTimePlayed = true;
            }
        };

        this.onVideoReady = function () {
            this.isReady = true;
            this.autoPlay = $scope.vgAutoPlay;
            this.playsInline = $scope.vgPlaysInline;
            this.nativeFullscreen = normalizeBooleanValue($scope.vgNativeFullscreen, true);
            this.cuePoints = $scope.vgCuePoints;
            this.startTime = $scope.vgStartTime;
            this.virtualClipDuration = $scope.vgVirtualClipDuration;
            this.clearMediaOnNavigate = normalizeBooleanValue($scope.vgClearMediaOnNavigate, true);
            this.currentState = VG_STATES.STOP;

            isMetaDataLoaded = true;
            isVirtualClip = this.startTime >= 0 && this.virtualClipDuration > 0;

            //Set media volume from localStorage if available
            if (VG_UTILS.supportsLocalStorage()) {
                //Default to 100% volume if local storage setting does not exist.
                this.setVolume(parseFloat($window.localStorage.getItem(VG_VOLUME_KEY) || '1'));
            }

            if ($scope.vgConfig) {
                vgConfigLoader.loadConfig($scope.vgConfig).then(
                    this.onLoadConfig.bind(this)
                );
            }
            else {
                $scope.vgPlayerReady({$API: this});
            }
        };

        this.onLoadConfig = function (config) {
            this.config = config;

            $scope.vgTheme = this.config.theme;
            $scope.vgAutoPlay = this.config.autoPlay;
            $scope.vgPlaysInline = this.config.playsInline;
            $scope.vgNativeFullscreen = this.config.nativeFullscreen;
            $scope.vgCuePoints = this.config.cuePoints;
            $scope.vgClearMediaOnNavigate = this.config.clearMediaOnNavigate;
            $scope.vgStartTime = this.config.startTime;
            $scope.vgVirtualClipDuration = this.config.virtualClipDuration;
            isVirtualClip = $scope.vgStartTime >= 0 && $scope.vgVirtualClipDuration > 0;

            $scope.vgPlayerReady({$API: this});
        };

        this.onLoadMetaData = function (evt) {
            this.isBuffering = false;
            this.onUpdateTime(evt);
        };

        this.onProgress = function (event) {
            this.updateBuffer(event);

            $scope.$parent.$digest();
        };

        this.updateBuffer = function getBuffer(event) {
            var buffered = event.target.buffered;

            if (buffered && buffered.length) {
                this.buffered = buffered;
                this.bufferEnd = 1000 * buffered.end(buffered.length - 1);

                // Avoid bufferEnd overflow by virtual clips
                if (this.bufferEnd > this.totalTime) this.bufferEnd = this.totalTime;
            }
        };

        this.onUpdateTime = function (event) {
            var targetTime = 1000 * event.target.currentTime;
            var isLiveSourceOverride = this.activeSource && angular.isDefined(this.activeSource.isLive);

            this.updateBuffer(event);

            if (event.target.duration != Infinity && event.target.duration != null && event.target.duration != undefined && event.target.duration != 1.7976931348623157e+308) {
                // Fake the duration and current time for virtual clips
                if (isVirtualClip) {
                    if (hasStartTimePlayed && (event.target.currentTime < this.startTime || event.target.currentTime - this.startTime > this.virtualClipDuration)) {
                        this.onComplete();
                    }
                    else {
                        this.currentTime = Math.max(0, targetTime - (1000 * this.startTime));
                        this.totalTime = 1000 * this.virtualClipDuration;
                        this.timeLeft = (1000 * this.virtualClipDuration) - this.currentTime;
                    }
                }
                else {
                    this.currentTime = targetTime;
                    this.totalTime = 1000 * event.target.duration;
                    this.timeLeft = 1000 * (event.target.duration - event.target.currentTime);
                }

                this.isLive = false;
            }
            else {
                // It's a live streaming without and end
                this.currentTime = targetTime;
                this.isLive = true;
            }

            // allow for the user to override the built in live detection for cases where it doesn't work as desired
            if (isLiveSourceOverride) {
                this.isLive = !!this.activeSource.isLive;
            }

            var targetSeconds = isVirtualClip ? this.currentTime / 1000 : event.target.currentTime;
            var targetDuration = isVirtualClip ? this.totalTime / 1000 : event.target.duration;

            if (this.cuePoints) {
                this.checkCuePoints(targetSeconds);
            }

            $scope.vgUpdateTime({$currentTime: targetSeconds, $duration: targetDuration});

            // Safe apply just in case we're calling from a non-event
            if ($scope.$$phase != '$apply' && $scope.$$phase != '$digest') {
                $scope.$parent.$digest();
            }
        };

        this.checkCuePoints = function checkCuePoints(currentTime) {
            for (var tl in this.cuePoints) {
                for (var i = 0, l = this.cuePoints[tl].length; i < l; i++) {
                    var cp = this.cuePoints[tl][i];
                    var currentSecond = parseInt(currentTime, 10);
                    var start = parseInt(cp.timeLapse.start, 10);

                    // If timeLapse.end is not defined we set it as 1 second length
                    if (!cp.timeLapse.end) cp.timeLapse.end = cp.timeLapse.start + 1;

                    if (currentTime < cp.timeLapse.end) cp.$$isCompleted = false;

                    // Fire the onEnter event once reach to the cue point
                    if(!cp.$$isDirty && currentSecond === start && (typeof cp.onEnter == 'function')) {
                        cp.onEnter(currentTime, cp.timeLapse, cp.params);
                        cp.$$isDirty = true;
                    }

                    // Check if we've been reached to the cue point
                    if (currentTime > cp.timeLapse.start) {
                        // We're in the timelapse
                        if (currentTime < cp.timeLapse.end) {
                            // Trigger onUpdate each time we enter here
                            if (cp.onUpdate) cp.onUpdate(currentTime, cp.timeLapse, cp.params);

                            // Trigger onEnter if we enter on the cue point by manually seeking
                            if (!cp.$$isDirty && (typeof cp.onEnter === 'function')) {
                                cp.onEnter(currentTime, cp.timeLapse, cp.params);
                            }
                        }

                        // We've been passed the cue point
                        if (currentTime >= cp.timeLapse.end) {
                            if (cp.onComplete && !cp.$$isCompleted) {
                                cp.$$isCompleted = true;
                                cp.onComplete(currentTime, cp.timeLapse, cp.params);
                            }
                        }

                        cp.$$isDirty = true;
                    }
                    else {
                        if (cp.onLeave && cp.$$isDirty) {
                            cp.onLeave(currentTime, cp.timeLapse, cp.params);
                        }

                        cp.$$isDirty = false;
                    }
                }
            }
        };

        this.onPlay = function () {
            this.setState(VG_STATES.PLAY);
            $scope.$parent.$digest();
        };

        this.onPause = function () {
            var currentTime = isVirtualClip ? this.currentTime : this.mediaElement[0].currentTime;

            if (currentTime == 0) {
                this.setState(VG_STATES.STOP);
            }
            else {
                this.setState(VG_STATES.PAUSE);
            }

            $scope.$parent.$digest();
        };

        this.onVolumeChange = function () {
            this.volume = this.mediaElement[0].volume;
            $scope.$parent.$digest();
        };

        this.onPlaybackChange = function () {
            this.playback = this.mediaElement[0].playbackRate;
            $scope.$parent.$digest();
        };

        this.onSeeking = function (event) {
            $scope.vgSeeking({$currentTime: event.target.currentTime, $duration: event.target.duration});
        };

        this.onSeeked = function (event) {
            $scope.vgSeeked({$currentTime: event.target.currentTime, $duration: event.target.duration});
        };

        this.seekTime = function (value, byPercent) {
            if (!Number.isFinite(value)) {
                throw new TypeError('Expecting a finite number value.');
            }

            var second;
            if (byPercent) {
                if (isVirtualClip) {
                    value = Math.max(0, Math.min(value, 100));
                    second = (value * this.virtualClipDuration / 100);
                    this.mediaElement[0].currentTime = this.startTime + second;
                }
                else {
                    second = value * this.mediaElement[0].duration / 100;
                    this.mediaElement[0].currentTime = second;
                }
            }
            else {
                if (isVirtualClip) {
                    var durationPercent = value/this.mediaElement[0].duration;
                    second = !hasStartTimePlayed ? 0 : this.virtualClipDuration * durationPercent;
                    this.mediaElement[0].currentTime = !hasStartTimePlayed ? this.startTime : this.startTime + second;
                }
                else {
                    second = value;
                    this.mediaElement[0].currentTime = second;
                }
            }

            this.currentTime = 1000 * second;
        };

        this.playPause = function () {
            if (this.mediaElement[0].paused) {
                this.play();
            }
            else {
                this.pause();
            }
        };

        this.setState = function (newState) {
            if (newState && newState != this.currentState) {
                $scope.vgUpdateState({$state: newState});

                this.currentState = newState;
            }

            return this.currentState;
        };

        this.play = function () {
            var mediaElement = this.mediaElement[0];

            // short-circuit if already playing
            if (playPromise || !mediaElement.paused) {
                return;
            }

            playPromise = mediaElement.play();

            if (playPromise && playPromise.then && playPromise.catch) { // browser has async play promise
                playPromise
                    .then(function() {
                        playPromise = null;
                    })
                    .catch(function() {
                        // deliberately empty for the sake of eating console noise
                    });
            }

            this.setState(VG_STATES.PLAY);
        };

        this.pause = function () {
            var mediaElement = this.mediaElement[0];
            
            if (playPromise) { // browser has async play promise
                playPromise.then(function() {
                    mediaElement.pause();
                });
            } else {
                mediaElement.pause()
            }
            
            this.setState(VG_STATES.PAUSE);
        };

        this.stop = function () {
            try {
                this.mediaElement[0].pause();

                var targetTime = isVirtualClip ? this.startTime : 0;
                this.mediaElement[0].currentTime = targetTime;

                this.currentTime = targetTime;
                this.buffered = [];
                this.bufferEnd = 0;
                this.setState(VG_STATES.STOP);
            }
            catch (e) {
                return e;
            }
        };

        this.toggleFullScreen = function () {
            // There is no native full screen support or we want to play inline
            if (!vgFullscreen.isAvailable || !this.nativeFullscreen) {
                if (this.isFullScreen) {
                    this.videogularElement.removeClass("fullscreen");
                    this.videogularElement.css("z-index", "auto");
                }
                else {
                    this.videogularElement.addClass("fullscreen");
                    this.videogularElement.css("z-index", VG_UTILS.getZIndex());
                }

                this.isFullScreen = !this.isFullScreen;
            }
            // Perform native full screen support
            else {
                if (this.isFullScreen) {
                    if (!VG_UTILS.isMobileDevice()) {
                        vgFullscreen.exit();
                    }
                }
                else {
                    // On mobile devices we should make fullscreen only the video object
                    if (VG_UTILS.isMobileDevice()) {
                        // On iOS we should check if user pressed before fullscreen button
                        // and also if metadata is loaded
                        if (VG_UTILS.isiOSDevice()) {
                            if (isMetaDataLoaded) {
                                this.enterElementInFullScreen(this.mediaElement[0]);
                            }
                            else {
                                isFullScreenPressed = true;
                                this.play();
                            }
                        }
                        else {
                            this.enterElementInFullScreen(this.mediaElement[0]);
                        }
                    }
                    else {
                        this.enterElementInFullScreen(this.videogularElement[0]);
                    }
                }
            }
        };

        this.enterElementInFullScreen = function (element) {
            vgFullscreen.request(element);
        };

        this.changeSource = function (newValue) {
            this.activeSource = newValue;

            if (angular.isDefined(newValue.isLive)) {
                this.isLive = !!newValue.isLive;
            }

            $scope.vgChangeSource({$source: newValue});
        };

        this.setVolume = function (newVolume) {
            newVolume = Math.max(Math.min(newVolume, 1), 0);
            $scope.vgUpdateVolume({$volume: newVolume});

            this.mediaElement[0].volume = newVolume;
            this.volume = newVolume;

            //Push volume updates to localStorage so that future instances resume volume
            if (VG_UTILS.supportsLocalStorage()) {
                //TODO: Improvement: concat key with current page or "video player id" to create separate stored volumes.
                $window.localStorage.setItem(VG_VOLUME_KEY, newVolume.toString());
            }
        };

        this.setPlayback = function (newPlayback) {
            $scope.vgUpdatePlayback({$playBack: newPlayback});

            this.mediaElement[0].playbackRate = newPlayback;
            this.playback = newPlayback;
        };

        this.updateTheme = function (value) {
            var links = document.getElementsByTagName("link");
            var i;
            var l;

            // Remove previous theme
            if (currentTheme) {
                for (i = 0, l = links.length; i < l; i++) {
                    if (links[i].outerHTML.indexOf(currentTheme) >= 0) {

                        links[i].parentNode.removeChild(links[i]);
                        break;
                    }
                }
            }

            if (value) {
                var headElem = angular.element(document).find("head");
                var exists = false;

                // Look if theme already exists
                for (i = 0, l = links.length; i < l; i++) {
                    exists = (links[i].outerHTML.indexOf(value) >= 0);
                    if (exists) break;
                }

                if (!exists) {
                    headElem.append("<link rel='stylesheet' href='" + value + "'>");
                }

                currentTheme = value;
            }
        };

        this.onStartBuffering = function (event) {
            this.isBuffering = true;
            $scope.$parent.$digest();
        };

        this.onStartPlaying = function (event) {
            this.isBuffering = false;
            $scope.$parent.$digest();
        };

        this.onComplete = function (event) {
            $scope.vgComplete();

            this.setState(VG_STATES.STOP);
            this.isCompleted = true;

            if (isVirtualClip) {
                this.stop()
            }

            $scope.$parent.$digest();
        };

        this.onVideoError = function (event) {
            $scope.vgError({$event: event});
        };

        this.addListeners = function () {
            this.mediaElement[0].addEventListener("canplay", this.onCanPlay.bind(this), false);
            this.mediaElement[0].addEventListener("loadedmetadata", this.onLoadMetaData.bind(this), false);
            this.mediaElement[0].addEventListener("waiting", this.onStartBuffering.bind(this), false);
            this.mediaElement[0].addEventListener("ended", this.onComplete.bind(this), false);
            this.mediaElement[0].addEventListener("playing", this.onStartPlaying.bind(this), false);
            this.mediaElement[0].addEventListener("play", this.onPlay.bind(this), false);
            this.mediaElement[0].addEventListener("pause", this.onPause.bind(this), false);
            this.mediaElement[0].addEventListener("volumechange", this.onVolumeChange.bind(this), false);
            this.mediaElement[0].addEventListener("playbackchange", this.onPlaybackChange.bind(this), false);
            this.mediaElement[0].addEventListener("timeupdate", this.onUpdateTime.bind(this), false);
            this.mediaElement[0].addEventListener("progress", this.onProgress.bind(this), false);
            this.mediaElement[0].addEventListener("seeking", this.onSeeking.bind(this), false);
            this.mediaElement[0].addEventListener("seeked", this.onSeeked.bind(this), false);
            this.mediaElement[0].addEventListener("error", this.onVideoError.bind(this), false);
        };

        this.init = function () {
            this.isReady = false;
            this.isCompleted = false;
            this.buffered = [];
            this.bufferEnd = 0;
            this.currentTime = 0;
            this.totalTime = 0;
            this.timeLeft = 0;
            this.isLive = false;
            this.isFullScreen = false;
            this.playback = 1;
            this.isConfig = ($scope.vgConfig != undefined);
            this.mediaElement = [{play:function(){}, pause:function(){}, stop:function(){}, addEventListener:function(){}, removeEventListener: function(){}}];

            if (vgFullscreen.isAvailable) {
                this.isFullScreen = vgFullscreen.isFullScreen();
            }

            this.updateTheme($scope.vgTheme);
            this.addBindings();

            if (vgFullscreen.isAvailable) {
                document.addEventListener(vgFullscreen.onchange, this.onFullScreenChange.bind(this));
            }
        };

        this.onUpdateTheme = function onUpdateTheme(newValue) {
            this.updateTheme(newValue);
        };

        this.onUpdateAutoPlay = function onUpdateAutoPlay(newValue) {
            if (newValue && !this.autoPlay) {
                this.autoPlay = newValue;
                this.play(this);
            }
        };

        this.onUpdateStartTime = function onUpdateStartTime(newValue) {
            if (newValue && (newValue != this.startTime)) {
                this.mediaElement[0].currentTime = newValue;
                this.startTime = newValue;
                isVirtualClip = this.startTime >= 0 && this.virtualClipDuration > 0;

                var fakeEvent = {
                    target: this.mediaElement[0]
                };
                this.onUpdateTime(fakeEvent, true);
            }
        };

        this.onUpdateVirtualClipDuration = function onUpdateVirtualClipDuration(newValue) {
            if (newValue && (newValue != this.virtualClipDuration)) {
                this.virtualClipDuration = newValue;
                isVirtualClip = this.startTime >= 0 && this.virtualClipDuration > 0;

                var fakeEvent = {
                    target: this.mediaElement[0]
                };
                this.onUpdateTime(fakeEvent, true);
            }
        };

        this.onUpdatePlaysInline = function onUpdatePlaysInline(newValue) {
            this.playsInline = newValue;
        };

        this.onUpdateNativeFullscreen = function onUpdateNativeFullscreen(newValue) {
            this.nativeFullscreen = normalizeBooleanValue(newValue, true);
        };

        this.onUpdateCuePoints = function onUpdateCuePoints(newValue) {
            this.cuePoints = newValue;
            this.checkCuePoints(this.currentTime / 1000);
        };

        this.onUpdateClearMediaOnNavigate = function onUpdateClearMediaOnNavigate(newValue) {
            this.clearMediaOnNavigate = normalizeBooleanValue(newValue, true);
        };

        this.addBindings = function () {
            $scope.$watch("vgTheme", this.onUpdateTheme.bind(this));

            $scope.$watch("vgAutoPlay", this.onUpdateAutoPlay.bind(this));

            $scope.$watch("vgStartTime", this.onUpdateStartTime.bind(this));

            $scope.$watch("vgVirtualClipDuration", this.onUpdateVirtualClipDuration.bind(this));

            $scope.$watch("vgPlaysInline", this.onUpdatePlaysInline.bind(this));

            $scope.$watch("vgNativeFullscreen", this.onUpdateNativeFullscreen.bind(this));

            $scope.$watch("vgCuePoints", this.onUpdateCuePoints.bind(this));

            $scope.$watch("vgClearMediaOnNavigate", this.onUpdateClearMediaOnNavigate.bind(this));
        };

        this.onFullScreenChange = function (event) {
            this.isFullScreen = vgFullscreen.isFullScreen();
            $scope.$parent.$digest();
        };

        function normalizeBooleanValue(value, defaultValue) {
            // input may be boolean or string, so this will normalize to a boolean
            return angular.isDefined(value) ? value.toString() === 'true' : !!defaultValue;
        }

        // Empty mediaElement on destroy to avoid that Chrome downloads video even when it's not present
        $scope.$on('$destroy', this.clearMedia.bind(this));

        // Empty mediaElement when router changes
        $scope.$on('$routeChangeStart', this.onRouteChange.bind(this));

        this.init();
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgCrossorigin
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove a crossorigin policy to the video object. Possible values are: "anonymous" and "use-credentials".
 * This feature should be enabled if you want to have your subtitles or video files on a different domain than the video player. Additionally you need
 * to add CORS policies to your video and track files to your server to make it work.
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgCrossorigin",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var crossorigin;

                    scope.setCrossorigin = function setCrossorigin(value) {
                        if (value) {
                            API.mediaElement.attr("crossorigin", value);
                        }
                        else {
                            API.mediaElement.removeAttr("crossorigin");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setCrossorigin(API.config.crossorigin);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgCrossorigin, function (newValue, oldValue) {
                            if ((!crossorigin || newValue != oldValue) && newValue) {
                                crossorigin = newValue;
                                scope.setCrossorigin(crossorigin);
                            }
                            else {
                                scope.setCrossorigin();
                            }
                        });
                    }
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgLoop
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove loop in media files. Possible values are: "true" and "false"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgLoop",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var loop;

                    scope.setLoop = function setLoop(value) {
                        if (value) {
                            API.mediaElement.attr("loop", value);
                        }
                        else {
                            API.mediaElement.removeAttr("loop");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setLoop(API.config.loop);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgLoop, function (newValue, oldValue) {
                            if ((!loop || newValue != oldValue) && newValue) {
                                loop = newValue;
                                scope.setLoop(loop);
                            }
                            else {
                                scope.setLoop();
                            }
                        });
                    }
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.direcitve:vgMedia
 * @restrict E
 * @description
 * Directive to add a source of videos or audios. This directive will create a &lt;video&gt; or &lt;audio&gt; tag and usually will be above plugin tags.
 *
 * @param {array} vgNativePlayBlacklist An array of functions that accept a media source object and a user agent string. If the function returns true, native playback will be prevented.
 * @param {array} vgSrc Bindable array with a list of media sources or a simple url string. A media source is an object with two properties `src` and `type`. The `src` property must contains a trustful url resource.
 * @param {string} vgType String with "video" or "audio" values to set a <video> or <audio> tag inside <vg-media>.
 * 
 * <pre>
 * {
 *    src: $sce.trustAsResourceUrl("path/to/video/videogular.mp4"),
 *    type: "video/mp4"
 * }
 * </pre>
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgMedia",
    ["$timeout", "$window", "VG_UTILS", "VG_STATES", function ($timeout, $window, VG_UTILS, VG_STATES) {
        return {
            restrict: "E",
            require: "^videogular",
            templateUrl: function (elem, attrs) {
                var vgType = attrs.vgType || "video";
                return attrs.vgTemplate || "vg-templates/vg-media-" + vgType;
            },
            scope: {
                vgNativePlayBlacklist: "=?",
                vgSrc: "=?",
                vgType: "=?"                
            },
            link: function (scope, elem, attrs, API) {
                var sources;

                // what type of media do we want? defaults to 'video'
                if (!attrs.vgType || attrs.vgType === "video") {
                    attrs.vgType = "video";
                }
                else {
                    attrs.vgType = "audio";
                }

                // FUNCTIONS
                scope.onChangeSource = function onChangeSource(newValue, oldValue) {
                    if ((!sources || newValue != oldValue) && newValue) {
                        sources = newValue;

                        if (API.currentState !== VG_STATES.PLAY) {
                            API.currentState = VG_STATES.STOP;
                        }

                        API.sources = sources;
                        scope.changeSource();
                    }
                };

                scope.changeSource = function changeSource() {
                    var canPlay = "";
                    var isSourceApplied = false;
                    var normalizedSources = angular.isArray(sources) ? sources : [sources];
                    var firstSource = normalizedSources.length ? normalizedSources[0] : null;

                    // It's a cool browser
                    if (API.mediaElement[0].canPlayType) {
                        for (var i = 0, l = sources.length; i < l; i++) {
                            var currentSource = sources[i];

                            if (!currentSource || isNativePlayBlacklisted(currentSource)) {
                                continue;
                            }

                            //check to see if the media element can play the current source
                            canPlay = API.mediaElement[0].canPlayType(currentSource.type);

                            //if it's usable, apply the current source
                            if (canPlay == "maybe" || canPlay == "probably") {
                                isSourceApplied = true;

                                applySourceToMediaElement(currentSource);
                                break;
                            }
                        }
                    }
                    // It's a crappy browser and it doesn't deserve any respect
                    else if (firstSource && !isNativePlayBlacklisted(firstSource)) {
                        isSourceApplied = true;

                        // Get H264 or the first one
                        applySourceToMediaElement(firstSource);
                    }

                    if (isSourceApplied) {
                        // Android 2.3 support: https://github.com/2fdevs/videogular/issues/187
                        if (VG_UTILS.isMobileDevice()) API.mediaElement[0].load();

                        //autoplay behavior
                        $timeout(function () {
                            if (API.autoPlay && (VG_UTILS.isCordova() || !VG_UTILS.isMobileDevice())) {
                                API.play();
                            }
                        });
                    } 
                    //no source applied
                    else { 
                        API.onVideoError();
                    }
                };

                // INIT
                API.mediaElement = elem.find(attrs.vgType);
                API.sources = scope.vgSrc;

                API.addListeners();
                API.onVideoReady();

                scope.$watch("vgSrc", scope.onChangeSource);
                scope.$watch(
                    function() {
                        return API.sources;
                    },
                    scope.onChangeSource
                );

                scope.$watch(
                    function() {
                        return API.playsInline;
                    },
                    function (newValue, oldValue) {
                        if (newValue) {
                            API.mediaElement.attr("webkit-playsinline", "");
                            API.mediaElement.attr("playsinline", "");
                        } else {
                            API.mediaElement.removeAttr("webkit-playsinline");
                            API.mediaElement.removeAttr("playsinline");
                        }
                    }
                );

                if (API.isConfig) {
                    scope.$watch(
                        function () {
                            return API.config;
                        },
                        function () {
                            if (API.config) {
                                scope.vgSrc = API.config.sources;
                            }
                        }
                    );
                }

                function applySourceToMediaElement(source) {
                    API.mediaElement.attr({
                        src: source.src,
                        type: source.type
                    });

                    //Trigger vgChangeSource($source) API callback in vgController
                    API.changeSource(source);
                }

                function isNativePlayBlacklisted(source) {
                    var userAgent = $window.navigator.userAgent;

                    if (!source || !angular.isArray(scope.vgNativePlayBlacklist)) {
                        return false;
                    }

                    return scope.vgNativePlayBlacklist.reduce(function(accumulator, currentNativeBlacklistFunc) {
                        return accumulator || 
                            (angular.isFunction(currentNativeBlacklistFunc) && currentNativeBlacklistFunc(source, userAgent));
                    }, false);
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgNativeControls
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove the native controls. Possible values are: "true" and "false"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgNativeControls",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var controls;

                    scope.setControls = function setControls(value) {
                        if (value) {
                            API.mediaElement.attr("controls", value);
                        }
                        else {
                            API.mediaElement.removeAttr("controls");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setControls(API.config.controls);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgNativeControls, function (newValue, oldValue) {
                            if ((!controls || newValue != oldValue) && newValue) {
                                controls = newValue;
                                scope.setControls(controls);
                            }
                            else {
                                scope.setControls();
                            }
                        });
                    }
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgPreload
 * @restrict A
 * @description
 * Optional directive for `vg-media` to preload media files. Possible values are: "auto", "none" and "preload"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgPreload",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var preload;

                    scope.setPreload = function setPreload(value) {
                        if (value) {
                            API.mediaElement.attr("preload", value);
                        }
                        else {
                            API.mediaElement.removeAttr("preload");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setPreload(API.config.preload);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgPreload, function (newValue, oldValue) {
                            if ((!preload || newValue != oldValue) && newValue) {
                                preload = newValue;
                                scope.setPreload(preload);
                            }
                            else {
                                scope.setPreload();
                            }
                        });
                    }
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgTracks
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add a list of tracks.
 *
 * vgTracks Bindable array with a list of subtitles sources. A track source is an object with five properties: src, kind, srclang, label and default.
 * <pre>
 * {
 *    src: "assets/subs/pale-blue-dot.vtt",
 *    kind: "subtitles",
 *    srclang: "en",
 *    label: "English",
 *    default: "true/false"
 * }
 * </pre>
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgTracks",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var isMetaDataLoaded = false;
                    var tracks;
                    var i;
                    var l;

                    scope.onLoadMetaData = function() {
                        isMetaDataLoaded = true;
                        scope.updateTracks();
                    };

                    scope.updateTracks = function() {
                        // Remove previous tracks
                        var oldTracks = API.mediaElement.children();

                        for (i = 0, l = oldTracks.length; i < l; i++) {
                            if (oldTracks[i].remove) {
                                oldTracks[i].remove();
                            }
                        }

                        // Add new tracks
                        if (tracks) {
                            for (i = 0, l = tracks.length; i < l; i++) {
                                var track = document.createElement('track');
                                for (var prop in tracks[i]) {
                                    track[prop] = tracks[i][prop];
                                }

                                track.addEventListener('load', scope.onLoadTrack.bind(scope, track));

                                API.mediaElement[0].appendChild(track);
                            }
                        }
                    };

                    scope.onLoadTrack = function(track) {
                        if (track.default) track.mode = 'showing';
                        else track.mode = 'hidden';

                        for (var i=0, l=API.mediaElement[0].textTracks.length; i<l; i++) {
                            if (track.label == API.mediaElement[0].textTracks[i].label) {
                                if (track.default) {
                                    API.mediaElement[0].textTracks[i].mode = 'showing';
                                }
                                else {
                                    API.mediaElement[0].textTracks[i].mode = 'disabled';
                                }
                            }

                        }

                        track.removeEventListener('load', scope.onLoadTrack.bind(scope, track));
                    };

                    scope.setTracks = function setTracks(value) {
                        // Add tracks to the API to have it available for other plugins (like controls)
                        tracks = value;
                        API.tracks = value;

                        if (isMetaDataLoaded) {
                            scope.updateTracks();
                        }
                        else {
                            API.mediaElement[0].addEventListener("loadedmetadata", scope.onLoadMetaData.bind(scope), false);
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setTracks(API.config.tracks);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgTracks, function (newValue, oldValue) {
                            if ((!tracks || newValue != oldValue)) {
                                scope.setTracks(newValue);
                            }
                        }, true);
                    }
                }
            }
        }
    }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:videogular
 * @restrict E
 * @description
 * Main directive that must wrap a &lt;vg-media&gt; tag and all plugins.
 *
 * &lt;video&gt; tag usually will be above plugin tags, that's because plugins should be in a layer over the &lt;video&gt;.
 *
 * @param {string} vgTheme String with a scope name variable. This directive will inject a CSS link in the header of your page.
 * **This parameter is required.**
 *
 * @param {boolean} [vgPlaysInline=false] vgPlaysInline Boolean value or a String with a scope name variable to use native fullscreen (default) or set fullscreen inside browser (true).
 *
 * @param {boolean} [vgClearMediaOnNavigate=true] vgClearMediaOnNavigate Boolean value or a String with a scope name variable to reset the video player when user navigates.
 *
 * This is useful to allow continuous playback between different routes.
 *
 * @param {boolean} [vgAutoPlay=false] vgAutoPlay Boolean value or a String with a scope name variable to auto start playing video when it is initialized.
 *
 * **This parameter is disabled in mobile devices** because user must click on content to prevent consuming mobile data plans.
 *
 * @param {boolean} [vgStartTime=-1] vgStartTime Number value or a String with a scope name variable to start playing the video at a certain time.
 *
 * @param {boolean} [vgVirtualClipDuration=-1] vgVirtualClipDuration Number value or a String with a scope name variable for a length to limit the video playback to.
 *
 * @param {object} vgCuePoints Bindable object containing a list of timelines with cue points objects. A timeline is an array of objects with the following properties:
 * - `timeLapse` is an object with two properties `start` and `end` representing in seconds the period for this cue points.
 * - `onEnter` callback called when user enters on a cue point. callback(currentTime, timeLapse, params)
 * - `onLeave` callback called when user seeks backwards and leave the current cue point or a completed cue point. callback(currentTime, timeLapse, params)
 * - `onUpdate` callback called when the current time is between timeLapse.start and timeLapse.end. callback(currentTime, timeLapse, params)
 * - `onComplete` callback called when the user seek forward or the current time passes timeLapse.end property. callback(currentTime, timeLapse, params)
 * - `params` an object with values available to receive in the callback..
 *
 * @param {function} vgConfig String with a url to a config file. Config file's must be a JSON file object with the following structure:
 * <pre>
 {
   "controls": false,
   "loop": false,
   "autoplay": false,
   "startTime": -1,
   "virtualClipDuration": -1,
   "preload": "auto",
   "theme": "path/to/videogular.css",
   "sources": [
     {
       "src": "path/to/videogular.mp4",
       "type": "video/mp4"
     },
     {
       "src": "path/to/videogular.webm",
       "type": "video/webm"
     },
     {
       "src": "path/to/videogular.ogg",
       "type": "video/ogg"
     }
   ],
   "tracks": [
     {
       "src": "path/to/pale-blue-dot.vtt",
       "kind": "subtitles",
       "srclang": "en",
       "label": "English",
       "default": ""
     }
   ],
   "plugins": {
     "controls": {
       "autohide": true,
       "autohideTime": 3000
     },
     "poster": {
       "url": "path/to/earth.png"
     },
     "ima-ads": {
       "companion": "companionAd",
       "companionSize": [728, 90],
       "network": "6062",
       "unitPath": "iab_vast_samples",
       "adTagUrl": "http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F3510761%2FadRulesSampleTags&ciu_szs=160x600%2C300x250%2C728x90&cust_params=adrule%3Dpremidpostpodandbumpers&impl=s&gdfp_req=1&env=vp&ad_rule=1&vid=47570401&cmsid=481&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]",
       "skipButton": "<div class='skipButton'>skip ad</div>"
     },
     "analytics": {
       "category": "Videogular",
       "label": "Main",
       "events": {
         "ready": true,
         "play": true,
         "pause": true,
         "stop": true,
         "complete": true,
         "progress": 10
       }
     }
   }
 }
 * </pre>
 * @param {function} vgCanPlay Function name in controller's scope to call when video is able to begin playback
 * @param {function} vgComplete Function name in controller's scope to call when video have been completed.
 * @param {function} vgUpdateVolume Function name in controller's scope to call when volume changes. Receives a param with the new volume.
 * @param {function} vgUpdatePlayback Function name in controller's scope to call when playback changes. Receives a param with the new playback rate.
 * @param {function} vgUpdateTime Function name in controller's scope to call when video playback time is updated. Receives two params with current time and duration in milliseconds.
 * @param {function} vgUpdateState Function name in controller's scope to call when video state changes. Receives a param with the new state. Possible values are "play", "stop" or "pause".
 * @param {function} vgPlayerReady Function name in controller's scope to call when video have been initialized. Receives a param with the videogular API.
 * @param {function} vgChangeSource Function name in controller's scope to change current video source. Receives a param with the new video.
 * @param {function} vgPlaysInline Boolean to play video inline. Generally used in mobile devices.
 * @param {function} vgNativeFullscreen Boolean to disable native fullscreen.
 * @param {function} vgSeeking Function name in controller's scope to call when the video has finished jumping to a new time. Receives a param with the seeked time and duration in seconds.
 * @param {function} vgSeeked Function name in controller's scope to call when the video is jumping to a new time. Receives two params with the seeked time and duration in seconds.
 * @param {function} vgError Function name in controller's scope to receive an error from video object. Receives a param with the error event.
 * This is a free parameter and it could be values like "new.mp4", "320" or "sd". This will allow you to use this to change a video or video quality.
 * This callback will not change the video, you should do that by updating your sources scope variable.
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("videogular",
    [function () {
        return {
            restrict: "EA",
            scope: {
                vgTheme: "=?",
                vgAutoPlay: "=?",
                vgStartTime: "=?",
                vgVirtualClipDuration: "=?",
                vgPlaysInline: "=?",
                vgNativeFullscreen: "=?",
                vgClearMediaOnNavigate: "=?",
                vgCuePoints: "=?",
                vgConfig: "@",
                vgCanPlay: "&",
                vgComplete: "&",
                vgUpdateVolume: "&",
                vgUpdatePlayback: "&",
                vgUpdateTime: "&",
                vgUpdateState: "&",
                vgPlayerReady: "&",
                vgChangeSource: "&",
                vgSeeking: "&",
                vgSeeked: "&",
                vgError: "&"
            },
            controller: "vgController",
            controllerAs: "API",
            link: {
                pre: function (scope, elem, attr, controller) {
                    controller.videogularElement = angular.element(elem);
                }
            }
        }
    }
    ]);

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.service:vgConfigLoader
 *
 * @description
 * Config loader service:
 *
 * vgConfigLoader.loadConfig(url): Param `url` is a url to a config JSON.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
    .service("vgConfigLoader", ["$http", "$q", "$sce", function ($http, $q, $sce) {
        this.loadConfig = function loadConfig(url) {
            var deferred = $q.defer();

            $http({method: 'GET', url: url}).then(
                function success(response) {
                    var result = response.data;

                    for (var i = 0, l = result.sources.length; i < l; i++) {
                        result.sources[i].src = $sce.trustAsResourceUrl(result.sources[i].src);
                    }

                    deferred.resolve(result);
                },
                function reject() {
                    deferred.reject();
                }
            );

            return deferred.promise;
        };
    }]);

/**
 * @ngdoc service
 * @name com.2fdevs.videogular.service:vgFullscreen
 *
 * @description
 * Native fullscreen polyfill service.
 *
 *    * vgFullscreen.onchange: String with the onchange event name.
 *    * vgFullscreen.onerror: String with the onerror event name.
 *    * vgFullscreen.isAvailable: Boolean with fullscreen availability.
 *    * vgFullscreen.isFullScreen: Boolean with current view mode.
 *    * vgFullscreen.exit: Exit fullscreen function.
 *    * vgFullscreen.request: Request for fullscreen access function.
 **/
"use strict";
angular.module("com.2fdevs.videogular")
    .service("vgFullscreen", ["VG_UTILS", function (VG_UTILS) {
        // Native fullscreen polyfill
        var element;
        var polyfill = null;
        var APIs = {
            w3: {
                enabled: "fullscreenEnabled",
                element: "fullscreenElement",
                request: "requestFullscreen",
                exit: "exitFullscreen",
                onchange: "fullscreenchange",
                onerror: "fullscreenerror"
            },
            newWebkit: {
                enabled: "webkitFullscreenEnabled",
                element: "webkitFullscreenElement",
                request: "webkitRequestFullscreen",
                exit: "webkitExitFullscreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            },
            oldWebkit: {
                enabled: "webkitIsFullScreen",
                element: "webkitCurrentFullScreenElement",
                request: "webkitRequestFullScreen",
                exit: "webkitCancelFullScreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            },
            moz: {
                enabled: "mozFullScreen",
                element: "mozFullScreenElement",
                request: "mozRequestFullScreen",
                exit: "mozCancelFullScreen",
                onchange: "mozfullscreenchange",
                onerror: "mozfullscreenerror"
            },
            ios: {
                enabled: "webkitFullscreenEnabled",
                element: "webkitFullscreenElement",
                request: "webkitEnterFullscreen",
                exit: "webkitExitFullscreen",
                onchange: "webkitfullscreenchange",
                onerror: "webkitfullscreenerror"
            },
            ms: {
                enabled: "msFullscreenEnabled",
                element: "msFullscreenElement",
                request: "msRequestFullscreen",
                exit: "msExitFullscreen",
                onchange: "MSFullscreenChange",
                onerror: "MSFullscreenError"
            }
        };

        for (var browser in APIs) {
            if (APIs[browser].enabled in document) {
                polyfill = APIs[browser];
                break;
            }
        }

        // Override APIs on iOS
        if (VG_UTILS.isiOSDevice()) {
            polyfill = APIs.ios;
        }

        function isFullScreen() {
            var result = false;

            if (element) {
                result = (document[polyfill.element] != null || element.webkitDisplayingFullscreen)
            }
            else {
                result = (document[polyfill.element] != null)
            }

            return result;
        }

        this.isAvailable = (polyfill != null);

        if (polyfill) {
            this.onchange = polyfill.onchange;
            this.onerror = polyfill.onerror;
            this.isFullScreen = isFullScreen;
            this.exit = function () {
                document[polyfill.exit]();
            };
            this.request = function (elem) {
                element = elem;
                element[polyfill.request]();
            };
        }
    }]);

"use strict";
angular.module("com.2fdevs.videogular")
    .service("VG_UTILS", ["$window", function ($window) {
        this.fixEventOffset = function ($event) {
            /**
             * There's no offsetX in Firefox, so we fix that.
             * Solution provided by Jack Moore in this post:
             * http://www.jacklmoore.com/notes/mouse-position/
             * @param $event
             * @returns {*}
             */
            var matchedFF = navigator.userAgent.match(/Firefox\/(\d+)/i)
            if (matchedFF && Number.parseInt(matchedFF.pop()) < 39) {
                var style = $event.currentTarget.currentStyle || window.getComputedStyle($event.target, null);
                var borderLeftWidth = parseInt(style['borderLeftWidth'], 10);
                var borderTopWidth = parseInt(style['borderTopWidth'], 10);
                var rect = $event.currentTarget.getBoundingClientRect();
                var offsetX = $event.clientX - borderLeftWidth - rect.left;
                var offsetY = $event.clientY - borderTopWidth - rect.top;

                $event.offsetX = offsetX;
                $event.offsetY = offsetY;
            }

            return $event;
        };

        /**
         * Inspired by Paul Irish
         * https://gist.github.com/paulirish/211209
         * @returns {number}
         */
        this.getZIndex = function () {
            var zIndex = 1;
            var elementZIndex;

            var tags = document.getElementsByTagName('*');

            for (var i = 0, l = tags.length; i < l; i++) {
                elementZIndex = parseInt(window.getComputedStyle(tags[i])["z-index"]);

                if (elementZIndex > zIndex) {
                    zIndex = elementZIndex + 1;
                }
            }

            return zIndex;
        };

        // Very simple mobile detection, not 100% reliable
        this.isMobileDevice = function () {
            return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf("IEMobile") !== -1);
        };

        this.isiOSDevice = function () {
            return (navigator.userAgent.match(/ip(hone|ad|od)/i) && !navigator.userAgent.match(/(iemobile)[\/\s]?([\w\.]*)/i));
        };

        this.isCordova = function () {
            return document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1;
        };

        /**
         * Test the browser's support for HTML5 localStorage.
         * @returns {boolean}
         */
        this.supportsLocalStorage = function () {
            var testKey = 'videogular-test-key';

            try {
                var storage = $window.sessionStorage;
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return 'localStorage' in $window && $window['localStorage'] !== null;
            } catch (e) {
                return false;
            }
        };
    }]);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @license videogular v1.4.4 http://videogular.com
 * Two Fucking Developers http://twofuckingdevelopers.com
 * License: MIT
 */
/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgControls
 * @restrict E
 * @description
 * This directive acts as a container and you will need other directives to control the media.
 * Inside this directive you can add other directives like vg-play-pause-button and vg-scrub-bar.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'></vg-controls>
 * </videogular>
 * </pre>
 *
 * @param {boolean=false} vgAutohide Boolean variable or value to activate autohide.
 * @param {number=2000} vgAutohideTime Number variable or value that represents the time in milliseconds that will wait vgControls until it hides.
 *
 *
 */

angular.module("com.2fdevs.videogular.plugins.controls", [])
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-controls",
            '<div class="controls-container" ng-mousemove="onMouseMove()" ng-class="animationClass" ng-transclude></div>');
    }]
)
    .directive("vgControls",
    ["$timeout", "VG_STATES", function ($timeout, VG_STATES) {
        return {
            restrict: "E",
            require: "^videogular",
            transclude: true,
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-controls';
            },
            scope: {
                vgAutohide: "=?",
                vgAutohideTime: "=?"
            },
            link: function (scope, elem, attr, API) {
                var w = 0;
                var h = 0;
                var autoHideTime = 2000;
                var hideInterval;

                scope.API = API;

                scope.onMouseMove = function onMouseMove() {
                    if (scope.vgAutohide) scope.showControls();
                };

                scope.setAutohide = function setAutohide(value) {
                    if (value && API.currentState == VG_STATES.PLAY) {
                        hideInterval = $timeout(scope.hideControls, autoHideTime);
                    }
                    else {
                        scope.animationClass = "";
                        $timeout.cancel(hideInterval);
                        scope.showControls();
                    }
                };

                scope.setAutohideTime = function setAutohideTime(value) {
                    autoHideTime = value;
                };

                scope.hideControls = function hideControls() {
                    scope.animationClass = "hide-animation";
                };

                scope.showControls = function showControls() {
                    scope.animationClass = "show-animation";
                    $timeout.cancel(hideInterval);
                    if (scope.vgAutohide && API.currentState == VG_STATES.PLAY) hideInterval = $timeout(scope.hideControls, autoHideTime);
                };

                if (API.isConfig) {
                    scope.$watch("API.config",
                        function () {
                            if (scope.API.config) {
                                var ahValue = scope.API.config.plugins.controls.autohide || false;
                                var ahtValue = scope.API.config.plugins.controls.autohideTime || 2000;
                                scope.vgAutohide = ahValue;
                                scope.vgAutohideTime = ahtValue;
                                scope.setAutohideTime(ahtValue);
                                scope.setAutohide(ahValue);
                            }
                        }
                    );
                }
                else {
                    // If vg-autohide has been set
                    if (scope.vgAutohide != undefined) {
                        scope.$watch("vgAutohide", scope.setAutohide);
                    }

                    // If vg-autohide-time has been set
                    if (scope.vgAutohideTime != undefined) {
                        scope.$watch("vgAutohideTime", scope.setAutohideTime);
                    }
                }

                scope.$watch(
                    function () {
                        return API.currentState;
                    },
                    function (newVal, oldVal) {
                        if (scope.vgAutohide) scope.showControls();
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgFullscreenButton
 * @restrict E
 * @description
 * Directive to switch between fullscreen and normal mode.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-fullscreen-button></vg-fullscreen-button>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-fullscreen-button",
            '<button class="iconButton" ng-click="onClickFullScreen()" ng-class="fullscreenIcon" aria-label="Toggle full screen" type="button"> </button>');
    }]
)
    .directive("vgFullscreenButton",
    [function () {
        return {
            restrict: "E",
            require: "^videogular",
            scope: {},
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-fullscreen-button';
            },
            link: function (scope, elem, attr, API) {
                scope.onChangeFullScreen = function onChangeFullScreen(isFullScreen) {
                    scope.fullscreenIcon = {enter: !isFullScreen, exit: isFullScreen};
                };

                scope.onClickFullScreen = function onClickFullScreen() {
                    API.toggleFullScreen();
                };

                scope.fullscreenIcon = {enter: true};

                scope.$watch(
                    function () {
                        return API.isFullScreen;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            scope.onChangeFullScreen(newVal);
                        }
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgPlayPauseButton
 * @restrict E
 * @description
 * Adds a button inside vg-controls to play and pause media.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-play-pause-button></vg-play-pause-button>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-play-pause-button",
            '<button class="iconButton" ng-click="onClickPlayPause()" ng-class="playPauseIcon" aria-label="Play/Pause" type="button"></button>');
    }]
)
    .directive("vgPlayPauseButton",
    ["VG_STATES", function (VG_STATES) {
        return {
            restrict: "E",
            require: "^videogular",
            scope: {},
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-play-pause-button';
            },
            link: function (scope, elem, attr, API) {
                scope.setState = function setState(newState) {
                    switch (newState) {
                        case VG_STATES.PLAY:
                            scope.playPauseIcon = {pause: true};
                            break;

                        case VG_STATES.PAUSE:
                            scope.playPauseIcon = {play: true};
                            break;

                        case VG_STATES.STOP:
                            scope.playPauseIcon = {play: true};
                            break;
                    }
                };

                scope.onClickPlayPause = function onClickPlayPause() {
                    API.playPause();
                };

                scope.playPauseIcon = {play: true};

                scope.$watch(
                    function () {
                        return API.currentState;
                    },
                    function (newVal, oldVal) {
                        scope.setState(newVal);
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgPlaybackButton
 * @restrict E
 * @description
 * Directive to display a playback buttom to control the playback rate.
 *
 * @param {array} vgSpeeds Bindable array with a list of speed options as strings. Default ['0.5', '1', '1.5', '2']
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-playback-button vg-speeds='config.playbackSpeeds'></vg-playback-button>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-playback-button",
            '<button class="playbackValue iconButton" ng-click="onClickPlayback()">{{playback}}x</button>');
    }]
)
    .directive("vgPlaybackButton",
    [function () {
        return {
            restrict: "E",
            require: "^videogular",
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-playback-button';
            },
            scope: {
                vgSpeeds: '=?'
            },
            link: function (scope, elem, attr, API) {
                scope.playback = '1';

                scope.setPlayback = function(playback) {
                    scope.playback = playback;
                    API.setPlayback(parseFloat(playback));
                };

                scope.onClickPlayback = function onClickPlayback() {
                    var playbackOptions = scope.vgSpeeds || ['0.5', '1', '1.5', '2'];
                    var nextPlaybackRate = playbackOptions.indexOf(scope.playback.toString()) + 1;

                    if (nextPlaybackRate >= playbackOptions.length) {
                        scope.playback = playbackOptions[0];
                    }
                    else {
                        scope.playback = playbackOptions[nextPlaybackRate];
                    }

                    scope.setPlayback(scope.playback);
                };

                scope.$watch(
                    function () {
                        return API.playback;
                    },
                    function(newVal, oldVal) {
                        if (newVal != oldVal) {
                            scope.setPlayback(newVal);
                        }
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgScrubBarBuffer
 * @restrict E
 * @description
 * Layer inside vg-scrub-bar to display the buffer.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-scrub-bar>
 *            <vg-scrub-bar-buffer></vg-scrub-bar-buffer>
 *        </vg-scrub-bar>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .directive("vgScrubBarBuffer",
    [function () {
        return {
            restrict: "E",
            require: "^videogular",
            link: function (scope, elem, attr, API) {
                var percentTime = 0;

                scope.onUpdateBuffer = function onUpdateBuffer(newBuffer) {
                    if (typeof newBuffer === 'number' && API.totalTime) {
                        percentTime = 100 * (newBuffer / API.totalTime);
                        elem.css("width", percentTime + "%");
                    } else {
                        elem.css("width", 0);
                    }
                };

                scope.$watch(
                    function () {
                        return API.bufferEnd;
                    },
                    function (newVal, oldVal) {
                        scope.onUpdateBuffer(newVal);
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgScrubBarCuePoints
 * @restrict E
 * @description
 * Layer inside vg-scrub-bar to display a cue point timeline.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls>
 *        <vg-scrub-bar>
 *            <vg-scrub-bar-cue-points vg-cue-points='config.cuePoints[0]'></vg-scrub-bar-cue-points>
 *        </vg-scrub-bar>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(["$templateCache",
        function ($templateCache) {
            $templateCache.put("vg-templates/vg-scrub-bar-cue-points",
                '<div class="cue-point-timeline">' +
                    '<div ng-repeat="cuePoint in vgCuePoints" class="cue-point" ng-style="cuePoint.$$style"></div>' +
                '</div>');
        }
    ])
    .directive("vgScrubBarCuePoints", [
        function () {
            return {
                restrict: "E",
                require: "^videogular",
                templateUrl: function (elem, attrs) {
                    return attrs.vgTemplate || 'vg-templates/vg-scrub-bar-cue-points';
                },
                scope: {
                    "vgCuePoints": "="
                },
                link: function (scope, elem, attr, API) {
                    scope.onPlayerReady = function onPlayerReady() {
                        scope.updateCuePoints(scope.vgCuePoints);
                    };
                    scope.updateCuePoints = function onUpdateCuePoints(cuePoints) {
                        var totalWidth;

                        if (cuePoints) {
                            totalWidth = parseInt(elem[0].clientWidth);

                            for (var i = 0, l = cuePoints.length; i < l; i++) {
                                var end = (cuePoints[i].timeLapse.end >= 0) ? cuePoints[i].timeLapse.end : cuePoints[i].timeLapse.start + 1;
                                var cuePointDuration = (end - cuePoints[i].timeLapse.start) * 1000;
                                var position = (cuePoints[i].timeLapse.start * 100 / (Math.round(API.totalTime / 1000))) + "%";
                                var percentWidth = 0;

                                if (typeof cuePointDuration === 'number' && API.totalTime) {
                                    percentWidth = ((cuePointDuration * 100) / API.totalTime) + "%";
                                }

                                cuePoints[i].$$style = {
                                    width: percentWidth,
                                    left: position
                                };
                            }
                        }
                    };

                    scope.$watch("vgCuePoints", scope.updateCuePoints);

                    scope.$watch(
                        function () {
                            return API.totalTime;
                        },
                        function (newVal, oldVal) {
                            if (newVal > 0) scope.onPlayerReady();
                        }
                    );
                }
            }
        }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgScrubBarCurrentTime
 * @restrict E
 * @description
 * Layer inside vg-scrub-bar to display the current time.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-scrub-bar>
 *            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
 *        </vg-scrub-bar>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .directive("vgScrubBarCurrentTime",
    [function () {
        return {
            restrict: "E",
            require: "^videogular",
            link: function (scope, elem, attr, API) {
                var percentTime = 0;

                scope.onUpdateTime = function onUpdateTime(newCurrentTime) {
                    if (typeof newCurrentTime === 'number' && API.totalTime) {
                        percentTime = 100 * (newCurrentTime / API.totalTime);
                        elem.css("width", percentTime + "%");
                    } else {
                        elem.css("width", 0);
                    }
                };

                scope.$watch(
                    function () {
                        return API.currentTime;
                    },
                    function (newVal, oldVal) {
                        scope.onUpdateTime(newVal);
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgScrubBarThumbnails
 * @restrict E
 * @description
 * Layer inside vg-scrub-bar to display thumbnails.
 *
 * Param thumbnails could be a string url pointing to a strip of thumbnails or an array of objects with the same
 * format that you can find in cue points.
 *
 * **Strip of thumbnails**
 * Must be an image with exactly 100 thumbnails. Recommended size per each thumbnail 107x60
 * Example of param value: "assets/images/strip-of-thumbnails.jpg"
 *
 * To create a strip of thumbnails you can use ffmpeg:
 * ffmpeg -loglevel panic -y -i app/assets/videos/videogular.mp4 -frames 1 -q:v 1 -vf
 * "select=not(mod(n\,29)),scale=-1:60,tile=100x1" app/assets/thumbnails/thumbnail.jpg
 *
 * **List of thumbnails**
 * Array with a list of cue points as images. You can specify start or a lapse with start and end.
 * Example of param value:
 *
 * [
 *     {
 *         "timeLapse": {
 *             "start": 5
 *         },
 *         params: {
 *             "thumbnail": "assets/thumbnails/thumbnail-shown-at-second-5.jpg"
 *         }
 *     },
 *     {
 *         "timeLapse": {
 *             "start": 49,
 *             "end": 60
 *         },
 *         "params": {
 *             "thumbnail": "assets/thumbnails/thumbnail-shown-between-seconds-49-and-60.jpg"
 *         }
 *     }
 * ]
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls>
 *        <vg-scrub-bar>
 *            <vg-scrub-bar-thumbnails vg-thumbnails='config.thumbnails'></vg-scrub-bar-thumbnails>
 *        </vg-scrub-bar>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(["$templateCache",
        function ($templateCache) {
            $templateCache.put("vg-templates/vg-scrub-bar-thumbnails",
                '<div class="vg-thumbnails" ng-show="thumbnails" ng-style="thumbnailContainer">' +
                    '<div class="image-thumbnail" ng-style="thumbnails"></div>' +
                '</div>' +
                '<div class="background"></div>'
            );
        }
    ])
    .directive("vgScrubBarThumbnails", ["VG_UTILS",
        function (VG_UTILS) {
            return {
                restrict: "E",
                require: "^videogular",
                templateUrl: function (elem, attrs) {
                    return attrs.vgTemplate || 'vg-templates/vg-scrub-bar-thumbnails';
                },
                scope: {
                    "vgThumbnails": "="
                },
                link: function (scope, elem, attr, API) {
                    var thumbnailsWidth = 0;
                    var thumbWidth = 0;
                    var slider = elem[0].querySelector(".background");
                    var isStrip = (typeof scope.vgThumbnails === "string");

                    scope.thumbnails = false;
                    scope.thumbnailContainer = {};

                    scope.getOffset = function getOffset(event) {
                        var el = event.target,
                            x = 0;

                        while (el && !isNaN(el.offsetLeft)) {
                            x += el.offsetLeft - el.scrollLeft;
                            el = el.offsetParent;
                        }

                        return event.clientX - x;
                    };

                    scope.onLoadThumbnails = function(event) {
                        thumbnailsWidth = event.currentTarget.naturalWidth;
                        thumbWidth = thumbnailsWidth / 100;
                    };

                    scope.onLoadThumbnail = function(event) {
                        thumbWidth = event.currentTarget.naturalWidth;
                    };

                    scope.updateThumbnails = function(second) {
                        var percentage = Math.round(second * 100 / (API.totalTime / 1000));
                        var thPos = (slider.scrollWidth * percentage / 100) - (thumbWidth / 2);

                        if (isStrip) {
                            var bgPos = Math.round(thumbnailsWidth * percentage / 100);

                            scope.thumbnailContainer = {
                                "width": thumbWidth + "px",
                                "left": thPos + "px"
                            };

                            scope.thumbnails = {
                                "background-image": 'url("' + scope.vgThumbnails + '")',
                                "background-position": -bgPos + "px 0px"
                            };
                        }
                        else {
                            var secondsByPixel = API.totalTime / slider.scrollWidth / 1000;
                            var lapse = {
                                start: Math.floor(second - (secondsByPixel / 2)),
                                end: Math.ceil(second)
                            };

                            if (lapse.start < 0) lapse.start = 0;
                            if (lapse.end > API.totalTime) lapse.end = API.totalTime;

                            scope.thumbnailContainer = {
                                "left": thPos + "px"
                            };

                            scope.thumbnails = {
                                "background-image": 'none'
                            };
                            
                            if (scope.vgThumbnails) {
                                for (var i=0, l=scope.vgThumbnails.length; i<l; i++) {
                                    var th = scope.vgThumbnails[i];

                                    if (th.timeLapse.end >= 0) {
                                        if (lapse.start >= th.timeLapse.start && (lapse.end <= th.timeLapse.end || lapse.end <= th.timeLapse.start)) {
                                            scope.thumbnails = {
                                                "background-image": 'url("' + th.params.thumbnail + '")'
                                            };
                                            break;
                                        }
                                    }
                                    else {
                                        if (th.timeLapse.start >= lapse.start && th.timeLapse.start <= lapse.end) {
                                            scope.thumbnails = {
                                                "background-image": 'url("' + th.params.thumbnail + '")'
                                            };
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    };

                    scope.onMouseMove = function($event) {
                        var second = Math.round($event.offsetX * API.mediaElement[0].duration / slider.scrollWidth);

                        scope.updateThumbnails(second);

                        scope.$digest();
                    };

                    scope.onTouchMove = function($event) {
                        var touches = $event.touches;
                        var touchX = scope.getOffset(touches[0]);
                        var second = Math.round(touchX * API.mediaElement[0].duration / slider.scrollWidth);

                        scope.updateThumbnails(second);

                        scope.$digest();
                    };

                    scope.onMouseLeave = function(event) {
                        scope.thumbnails = false;

                        scope.$digest();
                    };

                    scope.onTouchLeave = function(event) {
                        scope.thumbnails = false;

                        scope.$digest();
                    };

                    scope.onDestroy = function() {
                        elem.unbind("touchmove", scope.onTouchMove);
                        elem.unbind("touchleave", scope.onTouchLeave);
                        elem.unbind("touchend", scope.onTouchLeave);
                        elem.unbind("mousemove", scope.onMouseMove);
                        elem.unbind("mouseleave", scope.onMouseLeave);
                    };

                    var thLoader;
                    if (isStrip) {
                        thLoader = new Image();
                        thLoader.onload = scope.onLoadThumbnails.bind(scope);
                        thLoader.src = scope.vgThumbnails;
                    }
                    else {
                        thLoader = new Image();
                        thLoader.onload = scope.onLoadThumbnail.bind(scope);
                        thLoader.src = scope.vgThumbnails[0].params.thumbnail;
                    }

                    // Touch move is really buggy in Chrome for Android, maybe we could use mouse move that works ok
                    if (VG_UTILS.isMobileDevice()) {
                        elem.bind("touchmove", scope.onTouchMove);
                        elem.bind("touchleave", scope.onTouchLeave);
                        elem.bind("touchend", scope.onTouchLeave);
                    }
                    else {
                        elem.bind("mousemove", scope.onMouseMove);
                        elem.bind("mouseleave", scope.onMouseLeave);
                    }

                    scope.$on('destroy', scope.onDestroy.bind(scope));
                }
            }
        }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgScrubBar
 * @restrict E
 * @description
 * Directive to control the time and display other information layers about the progress of the media.
 * This directive acts as a container and you can add more layers to display current time, cuepoints, buffer or whatever you need.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-scrub-bar></vg-scrub-bar>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(["$templateCache",
        function ($templateCache) {
            $templateCache.put("vg-templates/vg-scrub-bar",
                '<div role="slider" ' +
                      'aria-valuemax="{{ariaTime(API.totalTime)}}" ' +
                      'aria-valuenow="{{ariaTime(API.currentTime)}}" ' +
                      'aria-valuemin="0" ' +
                      'aria-label="Time scrub bar" ' +
                      'tabindex="0" ' +
                      'ng-keydown="onScrubBarKeyDown($event)">' +
                '</div>' +
                '<div class="container" ng-transclude></div>'
            );
        }]
    )
    .directive("vgScrubBar", ["VG_STATES", "VG_UTILS",
        function (VG_STATES, VG_UTILS) {
            return {
                restrict: "E",
                require: "^videogular",
                transclude: true,
                templateUrl: function (elem, attrs) {
                    return attrs.vgTemplate || 'vg-templates/vg-scrub-bar';
                },
                scope: {
                    vgThumbnails: "="
                },
                link: function (scope, elem, attr, API) {
                    var isSeeking = false;
                    var isPlaying = false;
                    var isPlayingWhenSeeking = false;
                    var LEFT = 37;
                    var RIGHT = 39;
                    var NUM_PERCENT = 5;
                    var thumbnailsWidth = 0;
                    var thumbWidth = 0;
                    var slider = elem[0].querySelector("div[role=slider]");

                    scope.thumbnails = false;
                    scope.thumbnailContainer = {};

                    scope.API = API;

                    scope.onLoadThumbnails = function(event) {
                        thumbnailsWidth = event.path[0].naturalWidth;
                        thumbWidth = thumbnailsWidth / 100;
                    };

                    scope.ariaTime = function (time) {
                        return Math.round(time / 1000);
                    };

                    scope.getOffset = function getOffset(event) {
                        var el = event.target,
                        x = 0;

                        while (el && !isNaN(el.offsetLeft)) {
                            x += el.offsetLeft - el.scrollLeft;
                            el = el.offsetParent;
                        }

                        return event.clientX - x;
                    };

                    scope.onScrubBarTouchStart = function onScrubBarTouchStart($event) {
                        var event = $event.originalEvent || $event;
                        var touches = event.touches;
                        var touchX = scope.getOffset(touches[0]);

                        isSeeking = true;
                        if (isPlaying) isPlayingWhenSeeking = true;
                        API.pause();
                        API.seekTime(touchX * API.mediaElement[0].duration / slider.scrollWidth);

                        scope.$digest();
                    };

                    scope.onScrubBarTouchEnd = function onScrubBarTouchEnd($event) {
                        var event = $event.originalEvent || $event;
                        if (isPlayingWhenSeeking) {
                            isPlayingWhenSeeking = false;
                            API.play();
                        }
                        isSeeking = false;

                        scope.$digest();
                    };

                    scope.onScrubBarTouchMove = function onScrubBarTouchMove($event) {
                        var event = $event.originalEvent || $event;
                        var touches = event.touches;
                        var touchX = scope.getOffset(touches[0]);

                        if (scope.vgThumbnails && scope.vgThumbnails.length) {
                            var second = Math.round(touchX * API.mediaElement[0].duration / slider.scrollWidth);
                            var percentage = Math.round(second * 100 / (API.totalTime / 1000));

                            scope.updateThumbnails(percentage);
                        }

                        if (isSeeking) {
                            API.seekTime(touchX * API.mediaElement[0].duration / slider.scrollWidth);
                        }

                        scope.$digest();
                    };

                    scope.onScrubBarTouchLeave = function onScrubBarTouchLeave(event) {
                        isSeeking = false;
                        scope.thumbnails = false;

                        scope.$digest();
                    };

                    scope.onScrubBarMouseDown = function onScrubBarMouseDown(event) {
                        event = VG_UTILS.fixEventOffset(event);

                        isSeeking = true;
                        if (isPlaying) isPlayingWhenSeeking = true;
                        API.pause();

                        API.seekTime(event.offsetX * API.mediaElement[0].duration / slider.scrollWidth);

                        scope.$digest();
                    };

                    scope.onScrubBarMouseUp = function onScrubBarMouseUp(event) {
                        //event = VG_UTILS.fixEventOffset(event);

                        if (isPlayingWhenSeeking) {
                            isPlayingWhenSeeking = false;
                            API.play();
                        }
                        isSeeking = false;
                        //API.seekTime(event.offsetX * API.mediaElement[0].duration / slider.scrollWidth);

                        scope.$digest();
                    };

                    scope.onScrubBarMouseMove = function onScrubBarMouseMove(event) {
                        if (scope.vgThumbnails && scope.vgThumbnails.length) {
                            var second = Math.round(event.offsetX * API.mediaElement[0].duration / slider.scrollWidth);
                            var percentage = Math.round(second * 100 / (API.totalTime / 1000));

                            scope.updateThumbnails(percentage);
                        }

                        if (isSeeking) {
                            event = VG_UTILS.fixEventOffset(event);
                            API.seekTime(event.offsetX * API.mediaElement[0].duration / slider.scrollWidth);
                        }

                        scope.$digest();
                    };

                    scope.onScrubBarMouseLeave = function onScrubBarMouseLeave(event) {
                        isSeeking = false;
                        scope.thumbnails = false;

                        scope.$digest();
                    };

                    scope.onScrubBarKeyDown = function onScrubBarKeyDown(event) {
                        var currentPercent = (API.currentTime / API.totalTime) * 100;

                        if (event.which === LEFT || event.keyCode === LEFT) {
                            API.seekTime(currentPercent - NUM_PERCENT, true);
                            event.preventDefault();
                        }
                        else if (event.which === RIGHT || event.keyCode === RIGHT) {
                            API.seekTime(currentPercent + NUM_PERCENT, true);
                            event.preventDefault();
                        }
                    };

                    scope.updateThumbnails = function updateThumbnails(percentage) {
                        var bgPos = Math.round(thumbnailsWidth * percentage / 100);
                        var thPos = (slider.scrollWidth * percentage / 100) - (thumbWidth / 2);

                        scope.thumbnailContainer = {
                            "width": thumbWidth + "px",
                            "left": thPos + "px"
                        };

                        scope.thumbnails = {
                            "background-image": 'url("' + scope.vgThumbnails + '")',
                            "background-position": -bgPos + "px 0px"
                        };
                    };

                    scope.setState = function setState(newState) {
                        if (!isSeeking) {
                            switch (newState) {
                                case VG_STATES.PLAY:
                                    isPlaying = true;
                                    break;

                                case VG_STATES.PAUSE:
                                    isPlaying = false;
                                    break;

                                case VG_STATES.STOP:
                                    isPlaying = false;
                                    break;
                            }
                        }
                    };

                    scope.onDestroy = function() {
                        elem.unbind("touchstart", scope.onScrubBarTouchStart);
                        elem.unbind("touchend", scope.onScrubBarTouchEnd);
                        elem.unbind("touchmove", scope.onScrubBarTouchMove);
                        elem.unbind("touchleave", scope.onScrubBarTouchLeave);
                        elem.unbind("mousedown", scope.onScrubBarMouseDown);
                        elem.unbind("mouseup", scope.onScrubBarMouseUp);
                        elem.unbind("mousemove", scope.onScrubBarMouseMove);
                        elem.unbind("mouseleave", scope.onScrubBarMouseLeave);
                    };

                    scope.$watch(
                        function () {
                            return API.currentState;
                        },
                        function (newVal, oldVal) {
                            if (newVal != oldVal) {
                                scope.setState(newVal);
                            }
                        }
                    );

                    if (scope.vgThumbnails) {
                        var thLoader = new Image();
                        thLoader.onload = scope.onLoadThumbnails.bind(scope);
                        thLoader.src = scope.vgThumbnails;
                    }

                    // Touch move is really buggy in Chrome for Android, maybe we could use mouse move that works ok
                    if (VG_UTILS.isMobileDevice()) {
                        elem.bind("touchstart", scope.onScrubBarTouchStart);
                        elem.bind("touchend", scope.onScrubBarTouchEnd);
                        elem.bind("touchmove", scope.onScrubBarTouchMove);
                        elem.bind("touchleave", scope.onScrubBarTouchLeave);
                    }
                    else {
                        elem.bind("mousedown", scope.onScrubBarMouseDown);
                        elem.bind("mouseup", scope.onScrubBarMouseUp);
                        elem.bind("mousemove", scope.onScrubBarMouseMove);
                        elem.bind("mouseleave", scope.onScrubBarMouseLeave);
                    }

                    scope.$on('destroy', scope.onDestroy.bind(scope));
                }
            }
        }
    ]);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgTimeDisplay
 * @restrict E
 * @description
 * Adds a time display inside vg-controls to play and pause media.
 * You have three scope variables to show current time, time left and total time.
 *
 * Those scope variables are in milliseconds, you can add a date filter to show the time as you wish.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-time-display>{{currentTime | date:'hh:mm'}}</vg-time-display>
 *        <vg-time-display>{{timeLeft | date:'mm:ss'}}</vg-time-display>
 *        <vg-time-display>{{totalTime | date:'hh:mm:ss'}}</vg-time-display>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .directive("vgTimeDisplay",
    [function () {
        return {
            require: "^videogular",
            restrict: "E",
            link: function (scope, elem, attr, API) {
                scope.currentTime = API.currentTime;
                scope.timeLeft = API.timeLeft;
                scope.totalTime = API.totalTime;
                scope.isLive = API.isLive;

                scope.$watch(
                    function () {
                        return API.currentTime;
                    },
                    function (newVal, oldVal) {
                        scope.currentTime = newVal;
                    }
                );

                scope.$watch(
                    function () {
                        return API.timeLeft;
                    },
                    function (newVal, oldVal) {
                        scope.timeLeft = newVal;
                    }
                );

                scope.$watch(
                    function () {
                        return API.totalTime;
                    },
                    function (newVal, oldVal) {
                        scope.totalTime = newVal;
                    }
                );

                scope.$watch(
                    function () {
                        return API.isLive;
                    },
                    function (newVal, oldVal) {
                        scope.isLive = newVal;
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgMuteButton
 * @restrict E
 * @description
 * Directive to display a button to mute volume.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-volume>
 *            <vg-mute-button><vg-mute-button>
 *        </vg-volume>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-mute-button",
            '<button type="button" class="iconButton" ng-class="muteIcon" ng-click="onClickMute()" ng-focus="onMuteButtonFocus()" ng-blur="onMuteButtonLoseFocus()" ng-mouseleave="onMuteButtonLeave()" ng-keydown="onMuteButtonKeyDown($event)" aria-label="Mute"></button>');
    }]
)
    .directive("vgMuteButton",
    [function () {
        return {
            restrict: "E",
            require: "^videogular",
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-mute-button';
            },
            link: function (scope, elem, attr, API) {
                var isMuted = false;
                var UP = 38;
                var DOWN = 40;
                var CHANGE_PER_PRESS = 0.05;

                scope.onClickMute = function onClickMute() {
                    if (isMuted) {
                        scope.currentVolume = scope.defaultVolume;
                    }
                    else {
                        scope.currentVolume = 0;
                        scope.muteIcon = {mute: true};
                    }

                    isMuted = !isMuted;

                    API.setVolume(scope.currentVolume);
                };

                scope.onMuteButtonFocus = function onMuteButtonFocus() {
                    scope.volumeVisibility = "visible";
                };

                scope.onMuteButtonLoseFocus = function onMuteButtonLoseFocus() {
                    scope.volumeVisibility = "hidden";
                };

                scope.onMuteButtonLeave = function onMuteButtonLeave() {
                    document.activeElement.blur();
                };

                scope.onMuteButtonKeyDown = function onMuteButtonKeyDown(event) {
                    var currentVolume = (API.volume != null) ? API.volume : 1;
                    var newVolume;

                    if (event.which === UP || event.keyCode === UP) {
                        newVolume = currentVolume + CHANGE_PER_PRESS;
                        if (newVolume > 1) newVolume = 1;

                        API.setVolume(newVolume);
                        event.preventDefault();
                    }
                    else if (event.which === DOWN || event.keyCode === DOWN) {
                        newVolume = currentVolume - CHANGE_PER_PRESS;
                        if (newVolume < 0) newVolume = 0;

                        API.setVolume(newVolume);
                        event.preventDefault();
                    }
                };

                scope.onSetVolume = function onSetVolume(newVolume) {
                    scope.currentVolume = newVolume;

                    isMuted = (scope.currentVolume === 0);

                    // if it's not muted we save the default volume
                    if (!isMuted) {
                        scope.defaultVolume = newVolume;
                    }
                    else {
                        // if was muted but the user changed the volume
                        if (newVolume > 0) {
                            scope.defaultVolume = newVolume;
                        }
                    }

                    var percentValue = Math.round(newVolume * 100);
                    if (percentValue == 0) {
                        scope.muteIcon = {mute: true};
                    }
                    else if (percentValue > 0 && percentValue < 25) {
                        scope.muteIcon = {level0: true};
                    }
                    else if (percentValue >= 25 && percentValue < 50) {
                        scope.muteIcon = {level1: true};
                    }
                    else if (percentValue >= 50 && percentValue < 75) {
                        scope.muteIcon = {level2: true};
                    }
                    else if (percentValue >= 75) {
                        scope.muteIcon = {level3: true};
                    }
                };

                scope.defaultVolume = 1;
                scope.currentVolume = scope.defaultVolume;
                scope.muteIcon = {level3: true};

                //Update the mute button on initialization, then watch for changes
                scope.onSetVolume(API.volume);
                scope.$watch(
                    function () {
                        return API.volume;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            scope.onSetVolume(newVal);
                        }
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgVolumeBar
 * @restrict E
 * @description
 * Directive to display a vertical volume bar to control the volume.
 * This directive must be inside vg-volume directive and requires vg-mute-button to be displayed.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-volume>
 *            <vg-mute-button></vg-mute-button>
 *            <vg-volume-bar></vg-volume-bar>
 *        </vg-volume>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .run(
    ["$templateCache", function ($templateCache) {
        $templateCache.put("vg-templates/vg-volume-bar",
            '<div class="verticalVolumeBar">\
              <div class="volumeBackground" ng-click="onClickVolume($event)" ng-mousedown="onMouseDownVolume()" ng-mouseup="onMouseUpVolume()" ng-mousemove="onMouseMoveVolume($event)" ng-mouseleave="onMouseLeaveVolume()">\
                <div class="volumeValue"></div>\
                <div class="volumeClickArea"></div>\
              </div>\
            </div>');
    }]
)
    .directive("vgVolumeBar",
    ["VG_UTILS", function (VG_UTILS) {
        return {
            restrict: "E",
            require: "^videogular",
            templateUrl: function (elem, attrs) {
                return attrs.vgTemplate || 'vg-templates/vg-volume-bar';
            },
            link: function (scope, elem, attr, API) {
                var isChangingVolume = false;
                var volumeBackElem = angular.element(elem[0].getElementsByClassName("volumeBackground"));
                var volumeValueElem = angular.element(elem[0].getElementsByClassName("volumeValue"));

                scope.onClickVolume = function onClickVolume(event) {
                    event = VG_UTILS.fixEventOffset(event);
                    var volumeHeight = parseInt(volumeBackElem.prop("offsetHeight"));
                    var value = event.offsetY * 100 / volumeHeight;
                    var volValue = 1 - (value / 100);

                    API.setVolume(volValue);
                };

                scope.onMouseDownVolume = function onMouseDownVolume() {
                    isChangingVolume = true;
                };

                scope.onMouseUpVolume = function onMouseUpVolume() {
                    isChangingVolume = false;
                };

                scope.onMouseLeaveVolume = function onMouseLeaveVolume() {
                    isChangingVolume = false;
                };

                scope.onMouseMoveVolume = function onMouseMoveVolume(event) {
                    if (isChangingVolume) {
                        event = VG_UTILS.fixEventOffset(event);
                        var volumeHeight = parseInt(volumeBackElem.prop("offsetHeight"));
                        var value = event.offsetY * 100 / volumeHeight;
                        var volValue = 1 - (value / 100);

                        API.setVolume(volValue);
                    }
                };

                scope.updateVolumeView = function updateVolumeView(value) {
                    value = value * 100;
                    volumeValueElem.css("height", value + "%");
                    volumeValueElem.css("top", (100 - value) + "%");
                };

                scope.onChangeVisibility = function onChangeVisibility(value) {
                    elem.css("visibility", value);
                };

                elem.css("visibility", scope.volumeVisibility);

                scope.$watch("volumeVisibility", scope.onChangeVisibility);

                //Update the volume bar on initialization, then watch for changes
                scope.updateVolumeView(API.volume);
                scope.$watch(
                    function () {
                        return API.volume;
                    },
                    function (newVal, oldVal) {
                        if (newVal != oldVal) {
                            scope.updateVolumeView(newVal);
                        }
                    }
                );
            }
        }
    }]
);

/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.plugins.controls.directive:vgVolume
 * @restrict E
 * @description
 * Directive to control the volume.
 * This directive acts as a container and you will need other directives like vg-mutebutton and vg-volumebar to control the volume.
 * In mobile will be hided since volume API is disabled for mobile devices.
 *
 * <pre>
 * <videogular vg-theme="config.theme.url">
 *    <vg-media vg-src="sources"></vg-media>
 *
 *    <vg-controls vg-autohide='config.autohide' vg-autohide-time='config.autohideTime'>
 *        <vg-volume></vg-volume>
 *    </vg-controls>
 * </videogular>
 * </pre>
 *
 */
angular.module("com.2fdevs.videogular.plugins.controls")
    .directive("vgVolume",
    ["VG_UTILS", function (VG_UTILS) {
        return {
            restrict: "E",
            link: function (scope, elem, attr) {
                scope.onMouseOverVolume = function onMouseOverVolume() {
                    scope.$evalAsync(function () {
                        scope.volumeVisibility = "visible";
                    });
                };

                scope.onMouseLeaveVolume = function onMouseLeaveVolume() {
                    scope.$evalAsync(function () {
                        scope.volumeVisibility = "hidden";
                    });
                };

                scope.onDestroy = function() {
                    elem.unbind("mouseover", scope.onScrubBarTouchStart);
                    elem.unbind("mouseleave", scope.onScrubBarTouchEnd);
                };

                // We hide volume controls on mobile devices
                if (VG_UTILS.isMobileDevice()) {
                    elem.css("display", "none");
                }
                else {
                    scope.volumeVisibility = "hidden";

                    elem.bind("mouseover", scope.onMouseOverVolume);
                    elem.bind("mouseleave", scope.onMouseLeaveVolume);
                }

                scope.$on('destroy', scope.onDestroy.bind(scope));
            }
        }
    }]
);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(14);
module.exports = 'ngSanitize';


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/**
 * @license AngularJS v1.7.0
 * (c) 2010-2018 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {'use strict';

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *     Any commits to this file should be reviewed with security in mind.  *
 *   Changes to this file can potentially create security vulnerabilities. *
 *          An approval from 2 Core members with history of modifying      *
 *                         this file is required.                          *
 *                                                                         *
 *  Does the change somehow allow for arbitrary javascript to be executed? *
 *    Or allows for someone to change the prototype of built-in objects?   *
 *     Or gives undesired access to variables likes document or window?    *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var $sanitizeMinErr = angular.$$minErr('$sanitize');
var bind;
var extend;
var forEach;
var isArray;
var isDefined;
var lowercase;
var noop;
var nodeContains;
var htmlParser;
var htmlSanitizeWriter;

/**
 * @ngdoc module
 * @name ngSanitize
 * @description
 *
 * The `ngSanitize` module provides functionality to sanitize HTML.
 *
 * See {@link ngSanitize.$sanitize `$sanitize`} for usage.
 */

/**
 * @ngdoc service
 * @name $sanitize
 * @kind function
 *
 * @description
 *   Sanitizes an html string by stripping all potentially dangerous tokens.
 *
 *   The input is sanitized by parsing the HTML into tokens. All safe tokens (from a whitelist) are
 *   then serialized back to a properly escaped HTML string. This means that no unsafe input can make
 *   it into the returned string.
 *
 *   The whitelist for URL sanitization of attribute values is configured using the functions
 *   `aHrefSanitizationWhitelist` and `imgSrcSanitizationWhitelist` of {@link $compileProvider}.
 *
 *   The input may also contain SVG markup if this is enabled via {@link $sanitizeProvider}.
 *
 * @param {string} html HTML input.
 * @returns {string} Sanitized HTML.
 *
 * @example
   <example module="sanitizeExample" deps="angular-sanitize.js" name="sanitize-service">
   <file name="index.html">
     <script>
         angular.module('sanitizeExample', ['ngSanitize'])
           .controller('ExampleController', ['$scope', '$sce', function($scope, $sce) {
             $scope.snippet =
               '<p style="color:blue">an html\n' +
               '<em onmouseover="this.textContent=\'PWN3D!\'">click here</em>\n' +
               'snippet</p>';
             $scope.deliberatelyTrustDangerousSnippet = function() {
               return $sce.trustAsHtml($scope.snippet);
             };
           }]);
     </script>
     <div ng-controller="ExampleController">
        Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <td>Directive</td>
           <td>How</td>
           <td>Source</td>
           <td>Rendered</td>
         </tr>
         <tr id="bind-html-with-sanitize">
           <td>ng-bind-html</td>
           <td>Automatically uses $sanitize</td>
           <td><pre>&lt;div ng-bind-html="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind-html="snippet"></div></td>
         </tr>
         <tr id="bind-html-with-trust">
           <td>ng-bind-html</td>
           <td>Bypass $sanitize by explicitly trusting the dangerous value</td>
           <td>
           <pre>&lt;div ng-bind-html="deliberatelyTrustDangerousSnippet()"&gt;
&lt;/div&gt;</pre>
           </td>
           <td><div ng-bind-html="deliberatelyTrustDangerousSnippet()"></div></td>
         </tr>
         <tr id="bind-default">
           <td>ng-bind</td>
           <td>Automatically escapes</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br/>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
       </div>
   </file>
   <file name="protractor.js" type="protractor">
     it('should sanitize the html snippet by default', function() {
       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
         toBe('<p>an html\n<em>click here</em>\nsnippet</p>');
     });

     it('should inline raw snippet if bound to a trusted value', function() {
       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).
         toBe("<p style=\"color:blue\">an html\n" +
              "<em onmouseover=\"this.textContent='PWN3D!'\">click here</em>\n" +
              "snippet</p>");
     });

     it('should escape snippet without any filter', function() {
       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).
         toBe("&lt;p style=\"color:blue\"&gt;an html\n" +
              "&lt;em onmouseover=\"this.textContent='PWN3D!'\"&gt;click here&lt;/em&gt;\n" +
              "snippet&lt;/p&gt;");
     });

     it('should update', function() {
       element(by.model('snippet')).clear();
       element(by.model('snippet')).sendKeys('new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-html-with-sanitize div')).getAttribute('innerHTML')).
         toBe('new <b>text</b>');
       expect(element(by.css('#bind-html-with-trust div')).getAttribute('innerHTML')).toBe(
         'new <b onclick="alert(1)">text</b>');
       expect(element(by.css('#bind-default div')).getAttribute('innerHTML')).toBe(
         "new &lt;b onclick=\"alert(1)\"&gt;text&lt;/b&gt;");
     });
   </file>
   </example>
 */


/**
 * @ngdoc provider
 * @name $sanitizeProvider
 * @this
 *
 * @description
 * Creates and configures {@link $sanitize} instance.
 */
function $SanitizeProvider() {
  var hasBeenInstantiated = false;
  var svgEnabled = false;

  this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
    hasBeenInstantiated = true;
    if (svgEnabled) {
      extend(validElements, svgElements);
    }
    return function(html) {
      var buf = [];
      htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
        return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
      }));
      return buf.join('');
    };
  }];


  /**
   * @ngdoc method
   * @name $sanitizeProvider#enableSvg
   * @kind function
   *
   * @description
   * Enables a subset of svg to be supported by the sanitizer.
   *
   * <div class="alert alert-warning">
   *   <p>By enabling this setting without taking other precautions, you might expose your
   *   application to click-hijacking attacks. In these attacks, sanitized svg elements could be positioned
   *   outside of the containing element and be rendered over other elements on the page (e.g. a login
   *   link). Such behavior can then result in phishing incidents.</p>
   *
   *   <p>To protect against these, explicitly setup `overflow: hidden` css rule for all potential svg
   *   tags within the sanitized content:</p>
   *
   *   <br>
   *
   *   <pre><code>
   *   .rootOfTheIncludedContent svg {
   *     overflow: hidden !important;
   *   }
   *   </code></pre>
   * </div>
   *
   * @param {boolean=} flag Enable or disable SVG support in the sanitizer.
   * @returns {boolean|$sanitizeProvider} Returns the currently configured value if called
   *    without an argument or self for chaining otherwise.
   */
  this.enableSvg = function(enableSvg) {
    if (isDefined(enableSvg)) {
      svgEnabled = enableSvg;
      return this;
    } else {
      return svgEnabled;
    }
  };


  /**
   * @ngdoc method
   * @name $sanitizeProvider#addValidElements
   * @kind function
   *
   * @description
   * Extends the built-in lists of valid HTML/SVG elements, i.e. elements that are considered safe
   * and are not stripped off during sanitization. You can extend the following lists of elements:
   *
   * - `htmlElements`: A list of elements (tag names) to extend the current list of safe HTML
   *   elements. HTML elements considered safe will not be removed during sanitization. All other
   *   elements will be stripped off.
   *
   * - `htmlVoidElements`: This is similar to `htmlElements`, but marks the elements as
   *   "void elements" (similar to HTML
   *   [void elements](https://rawgit.com/w3c/html/html5.1-2/single-page.html#void-elements)). These
   *   elements have no end tag and cannot have content.
   *
   * - `svgElements`: This is similar to `htmlElements`, but for SVG elements. This list is only
   *   taken into account if SVG is {@link ngSanitize.$sanitizeProvider#enableSvg enabled} for
   *   `$sanitize`.
   *
   * <div class="alert alert-info">
   *   This method must be called during the {@link angular.Module#config config} phase. Once the
   *   `$sanitize` service has been instantiated, this method has no effect.
   * </div>
   *
   * <div class="alert alert-warning">
   *   Keep in mind that extending the built-in lists of elements may expose your app to XSS or
   *   other vulnerabilities. Be very mindful of the elements you add.
   * </div>
   *
   * @param {Array<String>|Object} elements - A list of valid HTML elements or an object with one or
   *   more of the following properties:
   *   - **htmlElements** - `{Array<String>}` - A list of elements to extend the current list of
   *     HTML elements.
   *   - **htmlVoidElements** - `{Array<String>}` - A list of elements to extend the current list of
   *     void HTML elements; i.e. elements that do not have an end tag.
   *   - **svgElements** - `{Array<String>}` - A list of elements to extend the current list of SVG
   *     elements. The list of SVG elements is only taken into account if SVG is
   *     {@link ngSanitize.$sanitizeProvider#enableSvg enabled} for `$sanitize`.
   *
   * Passing an array (`[...]`) is equivalent to passing `{htmlElements: [...]}`.
   *
   * @return {$sanitizeProvider} Returns self for chaining.
   */
  this.addValidElements = function(elements) {
    if (!hasBeenInstantiated) {
      if (isArray(elements)) {
        elements = {htmlElements: elements};
      }

      addElementsTo(svgElements, elements.svgElements);
      addElementsTo(voidElements, elements.htmlVoidElements);
      addElementsTo(validElements, elements.htmlVoidElements);
      addElementsTo(validElements, elements.htmlElements);
    }

    return this;
  };


  /**
   * @ngdoc method
   * @name $sanitizeProvider#addValidAttrs
   * @kind function
   *
   * @description
   * Extends the built-in list of valid attributes, i.e. attributes that are considered safe and are
   * not stripped off during sanitization.
   *
   * **Note**:
   * The new attributes will not be treated as URI attributes, which means their values will not be
   * sanitized as URIs using `$compileProvider`'s
   * {@link ng.$compileProvider#aHrefSanitizationWhitelist aHrefSanitizationWhitelist} and
   * {@link ng.$compileProvider#imgSrcSanitizationWhitelist imgSrcSanitizationWhitelist}.
   *
   * <div class="alert alert-info">
   *   This method must be called during the {@link angular.Module#config config} phase. Once the
   *   `$sanitize` service has been instantiated, this method has no effect.
   * </div>
   *
   * <div class="alert alert-warning">
   *   Keep in mind that extending the built-in list of attributes may expose your app to XSS or
   *   other vulnerabilities. Be very mindful of the attributes you add.
   * </div>
   *
   * @param {Array<String>} attrs - A list of valid attributes.
   *
   * @returns {$sanitizeProvider} Returns self for chaining.
   */
  this.addValidAttrs = function(attrs) {
    if (!hasBeenInstantiated) {
      extend(validAttrs, arrayToMap(attrs, true));
    }
    return this;
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Private stuff
  //////////////////////////////////////////////////////////////////////////////////////////////////

  bind = angular.bind;
  extend = angular.extend;
  forEach = angular.forEach;
  isArray = angular.isArray;
  isDefined = angular.isDefined;
  lowercase = angular.$$lowercase;
  noop = angular.noop;

  htmlParser = htmlParserImpl;
  htmlSanitizeWriter = htmlSanitizeWriterImpl;

  nodeContains = window.Node.prototype.contains || /** @this */ function(arg) {
    // eslint-disable-next-line no-bitwise
    return !!(this.compareDocumentPosition(arg) & 16);
  };

  // Regular Expressions for parsing tags and attributes
  var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
    // Match everything outside of normal chars and " (quote character)
    NON_ALPHANUMERIC_REGEXP = /([^#-~ |!])/g;


  // Good source of info about elements and attributes
  // http://dev.w3.org/html5/spec/Overview.html#semantics
  // http://simon.html5.org/html-elements

  // Safe Void Elements - HTML5
  // http://dev.w3.org/html5/spec/Overview.html#void-elements
  var voidElements = stringToMap('area,br,col,hr,img,wbr');

  // Elements that you can, intentionally, leave open (and which close themselves)
  // http://dev.w3.org/html5/spec/Overview.html#optional-tags
  var optionalEndTagBlockElements = stringToMap('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
      optionalEndTagInlineElements = stringToMap('rp,rt'),
      optionalEndTagElements = extend({},
                                              optionalEndTagInlineElements,
                                              optionalEndTagBlockElements);

  // Safe Block Elements - HTML5
  var blockElements = extend({}, optionalEndTagBlockElements, stringToMap('address,article,' +
          'aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,' +
          'h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul'));

  // Inline Elements - HTML5
  var inlineElements = extend({}, optionalEndTagInlineElements, stringToMap('a,abbr,acronym,b,' +
          'bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,' +
          'samp,small,span,strike,strong,sub,sup,time,tt,u,var'));

  // SVG Elements
  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Elements
  // Note: the elements animate,animateColor,animateMotion,animateTransform,set are intentionally omitted.
  // They can potentially allow for arbitrary javascript to be executed. See #11290
  var svgElements = stringToMap('circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,' +
          'hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,' +
          'radialGradient,rect,stop,svg,switch,text,title,tspan');

  // Blocked Elements (will be stripped)
  var blockedElements = stringToMap('script,style');

  var validElements = extend({},
                                     voidElements,
                                     blockElements,
                                     inlineElements,
                                     optionalEndTagElements);

  //Attributes that have href and hence need to be sanitized
  var uriAttrs = stringToMap('background,cite,href,longdesc,src,xlink:href,xml:base');

  var htmlAttrs = stringToMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
      'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
      'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
      'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
      'valign,value,vspace,width');

  // SVG attributes (without "id" and "name" attributes)
  // https://wiki.whatwg.org/wiki/Sanitization_rules#svg_Attributes
  var svgAttrs = stringToMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
      'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
      'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
      'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
      'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
      'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
      'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
      'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
      'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
      'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
      'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
      'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
      'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
      'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
      'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);

  var validAttrs = extend({},
                                  uriAttrs,
                                  svgAttrs,
                                  htmlAttrs);

  function stringToMap(str, lowercaseKeys) {
    return arrayToMap(str.split(','), lowercaseKeys);
  }

  function arrayToMap(items, lowercaseKeys) {
    var obj = {}, i;
    for (i = 0; i < items.length; i++) {
      obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
    }
    return obj;
  }

  function addElementsTo(elementsMap, newElements) {
    if (newElements && newElements.length) {
      extend(elementsMap, arrayToMap(newElements));
    }
  }

  /**
   * Create an inert document that contains the dirty HTML that needs sanitizing
   * Depending upon browser support we use one of three strategies for doing this.
   * Support: Safari 10.x -> XHR strategy
   * Support: Firefox -> DomParser strategy
   */
  var getInertBodyElement /* function(html: string): HTMLBodyElement */ = (function(window, document) {
    var inertDocument;
    if (document && document.implementation) {
      inertDocument = document.implementation.createHTMLDocument('inert');
    } else {
      throw $sanitizeMinErr('noinert', 'Can\'t create an inert html document');
    }
    var inertBodyElement = (inertDocument.documentElement || inertDocument.getDocumentElement()).querySelector('body');

    // Check for the Safari 10.1 bug - which allows JS to run inside the SVG G element
    inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>';
    if (!inertBodyElement.querySelector('svg')) {
      return getInertBodyElement_XHR;
    } else {
      // Check for the Firefox bug - which prevents the inner img JS from being sanitized
      inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">';
      if (inertBodyElement.querySelector('svg img')) {
        return getInertBodyElement_DOMParser;
      } else {
        return getInertBodyElement_InertDocument;
      }
    }

    function getInertBodyElement_XHR(html) {
      // We add this dummy element to ensure that the rest of the content is parsed as expected
      // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the `<head>` tag.
      html = '<remove></remove>' + html;
      try {
        html = encodeURI(html);
      } catch (e) {
        return undefined;
      }
      var xhr = new window.XMLHttpRequest();
      xhr.responseType = 'document';
      xhr.open('GET', 'data:text/html;charset=utf-8,' + html, false);
      xhr.send(null);
      var body = xhr.response.body;
      body.firstChild.remove();
      return body;
    }

    function getInertBodyElement_DOMParser(html) {
      // We add this dummy element to ensure that the rest of the content is parsed as expected
      // e.g. leading whitespace is maintained and tags like `<meta>` do not get hoisted to the `<head>` tag.
      html = '<remove></remove>' + html;
      try {
        var body = new window.DOMParser().parseFromString(html, 'text/html').body;
        body.firstChild.remove();
        return body;
      } catch (e) {
        return undefined;
      }
    }

    function getInertBodyElement_InertDocument(html) {
      inertBodyElement.innerHTML = html;

      // Support: IE 9-11 only
      // strip custom-namespaced attributes on IE<=11
      if (document.documentMode) {
        stripCustomNsAttrs(inertBodyElement);
      }

      return inertBodyElement;
    }
  })(window, window.document);

  /**
   * @example
   * htmlParser(htmlString, {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * });
   *
   * @param {string} html string
   * @param {object} handler
   */
  function htmlParserImpl(html, handler) {
    if (html === null || html === undefined) {
      html = '';
    } else if (typeof html !== 'string') {
      html = '' + html;
    }

    var inertBodyElement = getInertBodyElement(html);
    if (!inertBodyElement) return '';

    //mXSS protection
    var mXSSAttempts = 5;
    do {
      if (mXSSAttempts === 0) {
        throw $sanitizeMinErr('uinput', 'Failed to sanitize html because the input is unstable');
      }
      mXSSAttempts--;

      // trigger mXSS if it is going to happen by reading and writing the innerHTML
      html = inertBodyElement.innerHTML;
      inertBodyElement = getInertBodyElement(html);
    } while (html !== inertBodyElement.innerHTML);

    var node = inertBodyElement.firstChild;
    while (node) {
      switch (node.nodeType) {
        case 1: // ELEMENT_NODE
          handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
          break;
        case 3: // TEXT NODE
          handler.chars(node.textContent);
          break;
      }

      var nextNode;
      if (!(nextNode = node.firstChild)) {
        if (node.nodeType === 1) {
          handler.end(node.nodeName.toLowerCase());
        }
        nextNode = getNonDescendant('nextSibling', node);
        if (!nextNode) {
          while (nextNode == null) {
            node = getNonDescendant('parentNode', node);
            if (node === inertBodyElement) break;
            nextNode = getNonDescendant('nextSibling', node);
            if (node.nodeType === 1) {
              handler.end(node.nodeName.toLowerCase());
            }
          }
        }
      }
      node = nextNode;
    }

    while ((node = inertBodyElement.firstChild)) {
      inertBodyElement.removeChild(node);
    }
  }

  function attrToMap(attrs) {
    var map = {};
    for (var i = 0, ii = attrs.length; i < ii; i++) {
      var attr = attrs[i];
      map[attr.name] = attr.value;
    }
    return map;
  }


  /**
   * Escapes all potentially dangerous characters, so that the
   * resulting string can be safely inserted into attribute or
   * element text.
   * @param value
   * @returns {string} escaped text
   */
  function encodeEntities(value) {
    return value.
      replace(/&/g, '&amp;').
      replace(SURROGATE_PAIR_REGEXP, function(value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
      }).
      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
        return '&#' + value.charCodeAt(0) + ';';
      }).
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;');
  }

  /**
   * create an HTML/XML writer which writes to buffer
   * @param {Array} buf use buf.join('') to get out sanitized html string
   * @returns {object} in the form of {
   *     start: function(tag, attrs) {},
   *     end: function(tag) {},
   *     chars: function(text) {},
   *     comment: function(text) {}
   * }
   */
  function htmlSanitizeWriterImpl(buf, uriValidator) {
    var ignoreCurrentElement = false;
    var out = bind(buf, buf.push);
    return {
      start: function(tag, attrs) {
        tag = lowercase(tag);
        if (!ignoreCurrentElement && blockedElements[tag]) {
          ignoreCurrentElement = tag;
        }
        if (!ignoreCurrentElement && validElements[tag] === true) {
          out('<');
          out(tag);
          forEach(attrs, function(value, key) {
            var lkey = lowercase(key);
            var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
            if (validAttrs[lkey] === true &&
              (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
              out(' ');
              out(key);
              out('="');
              out(encodeEntities(value));
              out('"');
            }
          });
          out('>');
        }
      },
      end: function(tag) {
        tag = lowercase(tag);
        if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
          out('</');
          out(tag);
          out('>');
        }
        // eslint-disable-next-line eqeqeq
        if (tag == ignoreCurrentElement) {
          ignoreCurrentElement = false;
        }
      },
      chars: function(chars) {
        if (!ignoreCurrentElement) {
          out(encodeEntities(chars));
        }
      }
    };
  }


  /**
   * When IE9-11 comes across an unknown namespaced attribute e.g. 'xlink:foo' it adds 'xmlns:ns1' attribute to declare
   * ns1 namespace and prefixes the attribute with 'ns1' (e.g. 'ns1:xlink:foo'). This is undesirable since we don't want
   * to allow any of these custom attributes. This method strips them all.
   *
   * @param node Root element to process
   */
  function stripCustomNsAttrs(node) {
    while (node) {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        var attrs = node.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          var attrNode = attrs[i];
          var attrName = attrNode.name.toLowerCase();
          if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
            node.removeAttributeNode(attrNode);
            i--;
            l--;
          }
        }
      }

      var nextNode = node.firstChild;
      if (nextNode) {
        stripCustomNsAttrs(nextNode);
      }

      node = getNonDescendant('nextSibling', node);
    }
  }

  function getNonDescendant(propName, node) {
    // An element is clobbered if its `propName` property points to one of its descendants
    var nextNode = node[propName];
    if (nextNode && nodeContains.call(node, nextNode)) {
      throw $sanitizeMinErr('elclob', 'Failed to sanitize html because the element is clobbered: {0}', node.outerHTML || node.outerText);
    }
    return nextNode;
  }
}

function sanitizeText(chars) {
  var buf = [];
  var writer = htmlSanitizeWriter(buf, noop);
  writer.chars(chars);
  return buf.join('');
}


// define ngSanitize module and register $sanitize service
angular.module('ngSanitize', [])
  .provider('$sanitize', $SanitizeProvider)
  .info({ angularVersion: '1.7.0' });

/**
 * @ngdoc filter
 * @name linky
 * @kind function
 *
 * @description
 * Finds links in text input and turns them into html links. Supports `http/https/ftp/sftp/mailto` and
 * plain email address links.
 *
 * Requires the {@link ngSanitize `ngSanitize`} module to be installed.
 *
 * @param {string} text Input text.
 * @param {string} [target] Window (`_blank|_self|_parent|_top`) or named frame to open links in.
 * @param {object|function(url)} [attributes] Add custom attributes to the link element.
 *
 *    Can be one of:
 *
 *    - `object`: A map of attributes
 *    - `function`: Takes the url as a parameter and returns a map of attributes
 *
 *    If the map of attributes contains a value for `target`, it overrides the value of
 *    the target parameter.
 *
 *
 * @returns {string} Html-linkified and {@link $sanitize sanitized} text.
 *
 * @usage
   <span ng-bind-html="linky_expression | linky"></span>
 *
 * @example
   <example module="linkyExample" deps="angular-sanitize.js" name="linky-filter">
     <file name="index.html">
       <div ng-controller="ExampleController">
       Snippet: <textarea ng-model="snippet" cols="60" rows="3"></textarea>
       <table>
         <tr>
           <th>Filter</th>
           <th>Source</th>
           <th>Rendered</th>
         </tr>
         <tr id="linky-filter">
           <td>linky filter</td>
           <td>
             <pre>&lt;div ng-bind-html="snippet | linky"&gt;<br>&lt;/div&gt;</pre>
           </td>
           <td>
             <div ng-bind-html="snippet | linky"></div>
           </td>
         </tr>
         <tr id="linky-target">
          <td>linky target</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_blank'"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_blank'"></div>
          </td>
         </tr>
         <tr id="linky-custom-attributes">
          <td>linky custom attributes</td>
          <td>
            <pre>&lt;div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"&gt;<br>&lt;/div&gt;</pre>
          </td>
          <td>
            <div ng-bind-html="snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}"></div>
          </td>
         </tr>
         <tr id="escaped-html">
           <td>no filter</td>
           <td><pre>&lt;div ng-bind="snippet"&gt;<br>&lt;/div&gt;</pre></td>
           <td><div ng-bind="snippet"></div></td>
         </tr>
       </table>
     </file>
     <file name="script.js">
       angular.module('linkyExample', ['ngSanitize'])
         .controller('ExampleController', ['$scope', function($scope) {
           $scope.snippet =
             'Pretty text with some links:\n' +
             'http://angularjs.org/,\n' +
             'mailto:us@somewhere.org,\n' +
             'another@somewhere.org,\n' +
             'and one more: ftp://127.0.0.1/.';
           $scope.snippetWithSingleURL = 'http://angularjs.org/';
         }]);
     </file>
     <file name="protractor.js" type="protractor">
       it('should linkify the snippet with urls', function() {
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(4);
       });

       it('should not linkify snippet without the linky filter', function() {
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText()).
             toBe('Pretty text with some links: http://angularjs.org/, mailto:us@somewhere.org, ' +
                  'another@somewhere.org, and one more: ftp://127.0.0.1/.');
         expect(element.all(by.css('#escaped-html a')).count()).toEqual(0);
       });

       it('should update', function() {
         element(by.model('snippet')).clear();
         element(by.model('snippet')).sendKeys('new http://link.');
         expect(element(by.id('linky-filter')).element(by.binding('snippet | linky')).getText()).
             toBe('new http://link.');
         expect(element.all(by.css('#linky-filter a')).count()).toEqual(1);
         expect(element(by.id('escaped-html')).element(by.binding('snippet')).getText())
             .toBe('new http://link.');
       });

       it('should work with the target property', function() {
        expect(element(by.id('linky-target')).
            element(by.binding("snippetWithSingleURL | linky:'_blank'")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-target a')).getAttribute('target')).toEqual('_blank');
       });

       it('should optionally add custom attributes', function() {
        expect(element(by.id('linky-custom-attributes')).
            element(by.binding("snippetWithSingleURL | linky:'_self':{rel: 'nofollow'}")).getText()).
            toBe('http://angularjs.org/');
        expect(element(by.css('#linky-custom-attributes a')).getAttribute('rel')).toEqual('nofollow');
       });
     </file>
   </example>
 */
angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
  var LINKY_URL_REGEXP =
        /((s?ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
      MAILTO_REGEXP = /^mailto:/i;

  var linkyMinErr = angular.$$minErr('linky');
  var isDefined = angular.isDefined;
  var isFunction = angular.isFunction;
  var isObject = angular.isObject;
  var isString = angular.isString;

  return function(text, target, attributes) {
    if (text == null || text === '') return text;
    if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);

    var attributesFn =
      isFunction(attributes) ? attributes :
      isObject(attributes) ? function getAttributesObject() {return attributes;} :
      function getEmptyAttributesObject() {return {};};

    var match;
    var raw = text;
    var html = [];
    var url;
    var i;
    while ((match = raw.match(LINKY_URL_REGEXP))) {
      // We can not end in these as they are sometimes found at the end of the sentence
      url = match[0];
      // if we did not match ftp/http/www/mailto then assume mailto
      if (!match[2] && !match[4]) {
        url = (match[3] ? 'http://' : 'mailto:') + url;
      }
      i = match.index;
      addText(raw.substr(0, i));
      addLink(url, match[0].replace(MAILTO_REGEXP, ''));
      raw = raw.substring(i + match[0].length);
    }
    addText(raw);
    return $sanitize(html.join(''));

    function addText(text) {
      if (!text) {
        return;
      }
      html.push(sanitizeText(text));
    }

    function addLink(url, text) {
      var key, linkAttributes = attributesFn(url);
      html.push('<a ');

      for (key in linkAttributes) {
        html.push(key + '="' + linkAttributes[key] + '" ');
      }

      if (isDefined(target) && !('target' in linkAttributes)) {
        html.push('target="',
                  target,
                  '" ');
      }
      html.push('href="',
                url.replace(/"/g, '&quot;'),
                '">');
      addText(text);
      html.push('</a>');
    }
  };
}]);


})(window, window.angular);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

OtppVideoController.$inject = ["$scope", "$sce"];
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(16);
function OtppVideoController($scope, $sce) {
    'ngInject';
    if ($scope.videoConfig && $scope.videoConfig.sources) {
        var _a = $scope.videoConfig, sources = _a.sources, others = tslib_1.__rest(_a, ["sources"]);
        $scope.config = others;
        $scope.config.sources = sources
            .map(function (_a) {
            var src = _a.src, others = tslib_1.__rest(_a, ["src"]);
            return tslib_1.__assign({ src: $sce.trustAsResourceUrl(src) }, others);
        });
    }
}
exports.default = OtppVideoController;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["__extends"] = __extends;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (immutable) */ __webpack_exports__["__rest"] = __rest;
/* harmony export (immutable) */ __webpack_exports__["__decorate"] = __decorate;
/* harmony export (immutable) */ __webpack_exports__["__param"] = __param;
/* harmony export (immutable) */ __webpack_exports__["__metadata"] = __metadata;
/* harmony export (immutable) */ __webpack_exports__["__awaiter"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["__generator"] = __generator;
/* harmony export (immutable) */ __webpack_exports__["__exportStar"] = __exportStar;
/* harmony export (immutable) */ __webpack_exports__["__values"] = __values;
/* harmony export (immutable) */ __webpack_exports__["__read"] = __read;
/* harmony export (immutable) */ __webpack_exports__["__spread"] = __spread;
/* harmony export (immutable) */ __webpack_exports__["__await"] = __await;
/* harmony export (immutable) */ __webpack_exports__["__asyncGenerator"] = __asyncGenerator;
/* harmony export (immutable) */ __webpack_exports__["__asyncDelegator"] = __asyncDelegator;
/* harmony export (immutable) */ __webpack_exports__["__asyncValues"] = __asyncValues;
/* harmony export (immutable) */ __webpack_exports__["__makeTemplateObject"] = __makeTemplateObject;
/* harmony export (immutable) */ __webpack_exports__["__importStar"] = __importStar;
/* harmony export (immutable) */ __webpack_exports__["__importDefault"] = __importDefault;
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=\"video-box\"><videogular vg-theme=\"config.theme.url\" vg-auto-play=\"config.autoPlay\"><vg-media vg-src=\"config.sources\" vg-tracks=\"config.tracks\" vg-native-controls=\"!!config.nativeControls || false\"></vg-media><span ng-if=\"!config.nativeControls\"><vg-controls vg-autohide=\"controller.config.plugins.controls.autoHide\" vg-autohide-time=\"controller.config.plugins.controls.autoHideTime\"><vg-play-pause-button></vg-play-pause-button><vg-time-display>{{ currentTime | date:'mm:ss':'+0000' }}</vg-time-display><vg-scrub-bar><vg-scrub-bar-current-time></vg-scrub-bar-current-time></vg-scrub-bar><vg-time-display>{{ timeLeft | date:'mm:ss':'+0000' }}</vg-time-display><vg-time-display>{{ totalTime | date:'mm:ss':'+0000' }}</vg-time-display><vg-volume><vg-mute-button></vg-mute-button><vg-volume-bar></vg-volume-bar></vg-volume><vg-fullscreen-button></vg-fullscreen-button></vg-controls></span></videogular></div>"

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var angular = __webpack_require__(0);
var tips_controller_1 = __webpack_require__(19);
var module_name_1 = __webpack_require__(1);
exports.default = angular.module(module_name_1.default + '.tips', [])
    .directive('tips', function () {
    return {
        template: __webpack_require__(20),
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
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

module.exports = "<div class=\"tips-box\" ng-show=\"hasAnyOneTipToShow()\"><div class=\"row\"><div class=\"col-sm-12\"><div class=\"tip\"><img class=\"tip-image img-circle concierge-image\" ng-src=\"{{image}}\" ng-if=\"image\"/><div class=\"alert alert-info tip-message\"><span ng-hide=\"hasAnyOneTipToShow()\"><br/></span><span ng-repeat=\"tip in tips\" ng-show=\"tip.text &amp;&amp; tip.evaluateCondition()\">{{ tip.text }}</span></div></div></div></div></div>"

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var execution_service_1 = __webpack_require__(22);
var _ = __webpack_require__(2);
var ThingsService = (function () {
    function ThingsService($state, $stateParams, FormAnswerService) {
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.FormAnswerService = FormAnswerService;
        this.previousStates = [];
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
        this.addToStatesStack(current);
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
    ThingsService.prototype.back = function () {
        var actual = this.previousStates.pop();
        var previous = this.previousStates.pop();
        if (!previous) {
            this.previousStates = this.executionService.pathTo(actual);
            actual = this.previousStates.pop();
            previous = this.previousStates.pop();
        }
        var stateParams = _.merge(this.$stateParams, { thingKey: previous });
        this.$state.go(this.$state.current.name, stateParams);
    };
    ThingsService.prototype.addToStatesStack = function (current) {
        var isService = current.fields && current.fields.every(function (field) { return field.type == 'call-service'; });
        if (isService && current.immediate) {
            return;
        }
        var peek = this.previousStates[this.previousStates.length - 1];
        if (peek == current.key) {
            return;
        }
        this.previousStates.push(current.key);
    };
    return ThingsService;
}());
exports.ThingsService = ThingsService;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var thing_1 = __webpack_require__(23);
var transitions_service_1 = __webpack_require__(24);
var ExecutionService = (function () {
    function ExecutionService(transitions, things, scope) {
        this.transitions = transitions;
        this.scope = scope;
        this.things = things;
        this.createMap(things);
        this.transitionService = new transitions_service_1.TransitionsService(transitions, scope);
    }
    ExecutionService.prototype.createMap = function (things) {
        var self = this;
        var start = things.find(function (thing) { return thing && thing.key === 'start'; });
        if (!start) {
            self.thingsMap = { "start": new thing_1.Thing() };
        }
        else {
            self.thingsMap = {};
        }
        things.forEach(function (thing) {
            if (self.thingsMap[thing.key]) {
                throw Error('Error inializing otpp execution. Multiple things with the same key');
            }
            self.thingsMap[thing.key] = thing;
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
    ExecutionService.prototype.pathTo = function (target) {
        var transitionService = new transitions_service_1.TransitionsService(this.transitions, this.scope);
        var stepsLimit = 30;
        var state = transitionService.getStartThing();
        var states = [state];
        while (state != target && state != 'end' && stepsLimit > 0) {
            state = transitionService.getNextThing();
            states.push(state);
        }
        if (state != target) {
            return [];
        }
        return states;
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TransitionsService = (function () {
    function TransitionsService(transitions, scope) {
        this.transitions = transitions;
        this.scope = scope;
    }
    TransitionsService.prototype.getStartThing = function () {
        return this.nextThingKeyFromCurrentKey("start");
    };
    TransitionsService.prototype.getNextThing = function () {
        return this.nextThingKeyFromCurrentKey(this.current);
    };
    TransitionsService.prototype.nextThingKeyFromCurrentKey = function (currentKey) {
        this.current = this.nextThingFromCurrentKey(currentKey).to;
        return this.current;
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
        var currentThing = nextArr[0];
        if (!!currentThing.skip
            && this.evaluate(this.scope, currentThing.skip)) {
            return this.nextThingFromCurrentKey(currentThing.to);
        }
        else {
            return currentThing;
        }
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map