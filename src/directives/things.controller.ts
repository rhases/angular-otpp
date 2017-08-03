import { ThingsService } from '../service/things.service'

export default function ThingsController($scope: any, thingsService: ThingsService, $stateParams: any) {

  if (!$scope.transitions || !$scope.things)
    return;

  thingsService.load($scope.transitions, $scope.things, $scope.model, $stateParams.state, $scope.onfinish);

  $scope.current = thingsService.getCurrentThing();

  $scope.next = function() {
    thingsService.next();
  }
}
