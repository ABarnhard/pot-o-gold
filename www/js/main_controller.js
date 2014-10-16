(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'Pot-O-Gold';
    // var id = navigator.gyroscope.watchAngularSpeed(function(){}, function(){}, {frequency:500});
    console.log(navigator);
  }]);
})();
