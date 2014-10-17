(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    $scope.play = function(){
      alert('Let the games begin!');
      window.addEventListener('deviceorientation', function(data){
        console.log(data);
        getDelta(data);
        $scope.speed = data;
        $scope.$digest();
      });
    };

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta = {};
      $scope.delta.x = ($scope.ref.x - obj.beta) / 10;
      $scope.delta.y = ($scope.ref.y - obj.gamma) / 10;

      console.log($scope.delta);
    }

  }]);
})();
