import { ThingsService } from '../services/things.service'
import { FormAnswerService } from '../services/form-answer.service'

export default function ThingsController($scope: any, ThingsService: ThingsService, FormAnswerService: FormAnswerService, $stateParams: any) {

  if (!$scope.transitions || !$scope.things)
    return;

  console.log(FormAnswerService)

  FormAnswerService.start($scope, 'model');

  function onFinish(formAnswer) {
    console.log(formAnswer)
    $scope.model = FormAnswerService.get()
    $scope.onfinish(formAnswer);
  }

  ThingsService.load($scope.transitions, $scope.things, $stateParams.state, $scope.onfinish);

  $scope.current = ThingsService.getCurrentThing();

  $scope.next = function() {
    ThingsService.next();
  }
}
