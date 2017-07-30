const angular = require('angular');

export default thing;

function thing() {
  return {
    restrict: 'E',
    template: require('./things.html'),
    replace: true,
    transclude: true,
    scope: {
      flow: '=',
      things: '=',
      model: '=',
      state: '='
    },
    //controller: 'FormlyFormController',
    link: thingLink,
    controller: ThingsController
  }

  function thingLink(scope, el, attrs, thingsService) {


  }

  // @ngInject
  function ThingsController($scope, thingsService, $stateParams){
    thingsService.load($scope.flow, $scope.things, $scope.model, $stateParams.state);
    $scope.current = thingsService.getCurrentThing();

    $scope.next  = function() {
      thingsService.next();
    }
  }
}
