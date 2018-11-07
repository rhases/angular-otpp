'use strict';

var _ = require('lodash');

import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, $timeout, $sce, $parse, $window, $filter, ThingsService: ThingsService, FormAnswerService: FormAnswerService, $stateParams: any) {
  'ngInject';

  if (!$scope.transitions || !$scope.things)
    return;

  FormAnswerService.start($scope, 'model');

  ThingsService.load($scope.transitions, $scope.things, $scope.thingKey, $scope.onStart, $scope.onStartThing, $scope.onFinish, $scope.onFinishThing);

  $scope.current = ThingsService.getCurrentThing();
  $scope.current.scope = _.clone(FormAnswerService.get());
  $scope.current.scope.form = $scope.form;
  $scope.currentTitle = resolve($scope.current, $scope.current.title )
  $scope.currentSubtitle = resolve($scope.current, $scope.current.subtitle)
  $scope.currentText = resolve($scope.current, $scope.current.text)

  $scope.next = function() {
    FormAnswerService.add($scope.current.scope);
    $timeout(function() {
      ThingsService.next();
    }, 50)
  }

  $scope.back = function() {
    $window.history.back();
  }

  $timeout(function() {
    $scope.startedValid = $scope.thingForm && $scope.thingForm.$valid;

    if (!$scope.startedValid && $scope.current.immediate) {
      executeImmediate();
    }
  }, 250)

  function executeImmediate() {
    var checkIfCanPassDebounced = _.debounce(checkIfCanPass, 250, { 'maxWait': 1500 });

    $scope.$watch(function() { return $scope.thingForm.$invalid && $scope.thingForm.$pending; }, checkIfCanPassDebounced);

    function checkIfCanPass() {
      console.log('checkIfCanPass')
      if (!$scope.thingForm.$invalid && !$scope.thingForm.$pending) {
        $scope.next();
      }
    }
  }

  function resolve(thing, expression) {
    let value;
    if (_.isObject(expression)) {
      for (var key in expression) {
        if($parse(key)({ scope: thing.scope })){
          value = expression[key];
        }
      }
    }else {
      value = expression;
    }
    if (value && value.charAt(0) == '`') {
      var formatCurrency = $filter('currency');
      var scope = thing.scope;
      eval("value = " + value)
    }
    return $sce.trustAsHtml(value);
  }
}
