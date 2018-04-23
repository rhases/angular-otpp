'use strict';

export default function OtppVideoController($scope, $sce) {
  'ngInject';

  if ($scope.videoConfig && $scope.videoConfig.sources){
    
    $scope.videoConfig.sources = $scope.videoConfig.sources
    .map( ({ src, ...others}) => {
          return {
            src: $sce.trustAsResourceUrl(src),
            ...others
          }
        }
      )
  }
  $scope.config = $scope.videoConfig;
}
