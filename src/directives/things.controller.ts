'use strict';

var _ = require('lodash');

import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, $timeout, $sce, $parse, $window, $filter, ThingsService: ThingsService, 
  FormAnswerService: FormAnswerService, $stateParams: any, $log: any) {
  'ngInject';

  if (!$scope.transitions || !$scope.things)
    return;

  FormAnswerService.start($scope, 'model');

  ThingsService.load($scope.transitions, $scope.things, $scope.thingKey, $scope.onStart, $scope.onStartThing, $scope.onFinish, $scope.onFinishThing);

  loadThing();

  $scope.next = function() {
    FormAnswerService.add($scope.current.scope);
    $timeout(function() {
      const nextThing = ThingsService.next();
      if (nextThing){
        // var stateParams = _.merge(this.$stateParams, { thingKey: nextThing.key })
        // this.$state.go(this.$state.current.name, stateParams);

        loadThing();
      }
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


  function loadThing(){
    $scope.current = ThingsService.getCurrentThing();
    $scope.current.scope = _.clone(FormAnswerService.get());
    $scope.current.scope.form = $scope.form;
    $scope.currentTitle = resolve($scope.current, $scope.current.title)
    $scope.currentSubtitle = resolve($scope.current, $scope.current.subtitle)
    $scope.currentText = resolve($scope.current, $scope.current.text)
  }

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
      try {
        eval("value = " + value)
      } catch(err) {
        $log.error(err);
      }
    }
    return $sce.trustAsHtml(value);
  }
}
