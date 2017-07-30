import { ThingsService } from '../service/things.service'

export default class ThingsController{
  thingsService:ThingsService;

  static $inject = ['$scope', 'thingsService', '$stateParams'];
  constructor(
      $scope:any,
      thingsService:ThingsService,
      $stateParams:any) {

    this.thingsService = thingsService;
    thingsService.load($scope.flow, $scope.things, $scope.model, $stateParams.state);
    $scope.current = thingsService.getCurrentThing();

  }

  next() {
    this.thingsService.next();
  }
}
