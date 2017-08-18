var _ = require('lodash');

import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, $timeout, ThingsService: ThingsService, FormAnswerService: FormAnswerService, $stateParams: any) {

  if (!$scope.transitions || !$scope.things)
    return;

  FormAnswerService.start($scope, 'model');

  ThingsService.load($scope.transitions, $scope.things, $stateParams.thingKey, $scope.onFinish);

  $scope.current = ThingsService.getCurrentThing();

  $scope.next = function() {
    if ($scope.onFinishThing) {
      $scope.onFinishThing({ thing: $scope.current, model: FormAnswerService.get() });
    }
    ThingsService.next();
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

}
