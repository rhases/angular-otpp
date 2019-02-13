'use strict';

export default function OtppVideoController($scope, $sce) {
  'ngInject';

  if ($scope.videoConfig && $scope.videoConfig.sources){
    
    let { sources, ...others } = $scope.videoConfig;

    $scope.config = others;
    $scope.config.sources = sources
      .map(({ src, ...others }) => {
        return {
          src: $sce.trustAsResourceUrl(src),
          ...others
        }
      })
  }
}
