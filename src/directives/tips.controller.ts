'use strict';

export default function TipsController($scope, $parse) {
  'ngInject';

  if ($scope.tips) {
    $scope.tips.forEach(function(tip) {
      if (tip.condition) {
        var parser = $parse(tip.condition);
        tip.evaluateCondition = function() { return parser({ scope: $scope.values }) }
      } else {
        tip.evaluateCondition = function() { return true; }
      }
    })
  }

  $scope.hasAnyOneTipToShow = function() {
    if (!$scope.tips) return false;

    return $scope.tips.reduce(function(final, tip) {
      return final || tip.evaluateCondition();
    }, false)
  }

}
