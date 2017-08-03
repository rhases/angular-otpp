const angular = require('angular');

export default thing;

function thing() {
  return {
    restrict: 'E',
    template: require('./things.html'),
    replace: true,
    transclude: true,
    scope: {
      transitions: '=',
      things: '=',

      model: '=',
      state: '=',

      onfinish: '&'
    },
    controller: 'ThingsController'
  }
}
