const angular = require('angular');
import ThingsController from './things.controller'

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
    controller: ThingsController
  }
}
