import { ThingsService } from '../service/things.service'

export default function ThingsController($scope:any, thingsService:ThingsService, $stateParams:any ){

  thingsService.load($scope.flow, $scope.things, $scope.model, $stateParams.state);
  $scope.current = thingsService.getCurrentThing();

  $scope.next = function() {
    thingsService.next();
  }
}
