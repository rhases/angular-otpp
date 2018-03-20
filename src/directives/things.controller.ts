var _ = require('lodash');

import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, $timeout, $sce, $parse, ThingsService: ThingsService, FormAnswerService: FormAnswerService, $stateParams: any) {

  if (!$scope.transitions || !$scope.things)
    return;

  FormAnswerService.start($scope, 'model');

  ThingsService.load($scope.transitions, $scope.things, $stateParams.thingKey, $scope.onStart, $scope.onStartThing, $scope.onFinish, $scope.onFinishThing);

  $scope.current = ThingsService.getCurrentThing();
  $scope.current.scope = _.clone(FormAnswerService.get());

  $scope.currentTitle = resolve($scope.current, $scope.current.title )
  $scope.currentSubtitle = resolve($scope.current, $scope.current.subtitle)

  $scope.next = function() {
    FormAnswerService.add($scope.current.scope);
    $timeout(function() {
      ThingsService.next();
    }, 50)
  }

  $timeout(function() {
    $scope.startedValid = $scope.thingForm.$valid;

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
      var scope = thing.scope;
      eval("value = " + value)
    }
    return $sce.trustAsHtml(value);
  }

}
