(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', '$rootScope', function($scope, $interval, $rootScope){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};

    $scope.startGame = function(){
      $scope.gameStarted = true;
      $rootScope.$broadcast('start');
      window.addEventListener('deviceorientation', function(data){
        getDelta(data);
        $scope.$digest();
      });
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta = {};
      $scope.delta.x = ($scope.ref.x - obj.beta) / 10;
      $scope.delta.y = ($scope.ref.y - obj.gamma) / 10;

      console.log($scope.delta);
    }

    $scope.$on('win', function(event, data){
      $scope.gameStarted = false;
    });
    $scope.$on('game-over', function(event, data){
      $scope.gameStarted = false;
    });

  }]);
})();
