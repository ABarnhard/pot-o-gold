(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('GameCtrl', ['$scope', '$interval', function($scope, $interval){
      $scope.screenWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      // var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
      $scope.screenHeight = screen.height;

      $scope.$on('move', function(event, data){
        //{x:, y:}
      });
  }]);
})();
