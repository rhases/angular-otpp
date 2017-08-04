import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, ThingsService: ThingsService, FormAnswerService: FormAnswerService, $stateParams: any) {

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
}
