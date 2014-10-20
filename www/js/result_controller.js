(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('ResultCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    $scope.count = 0;

    $scope.color = function(i){
      return ($scope.count + i) % 6;
    };

    $interval(changeColors, 100);

    function changeColors(){
      $scope.count++;
    }

  }]);
})();
