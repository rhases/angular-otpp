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
    controller: 'ThingsController'
  }

}
