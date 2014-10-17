(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', '$rootScope', function($scope, $interval, $rootScope){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};

    $scope.startGame = function(){
      $scope.gameStarted = true;
      window.addEventListener('deviceorientation', getOrientation);
      $rootScope.$broadcast('start');
    };


    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    $scope.$on('game-over', function(){
      console.log('game over');
      window.removeEventListener('deviceorientation', getOrientation);
      $scope.gameStarted = false;
    });

    $scope.$on('win', function(){
      $scope.gameStarted = false;
    });

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta = {};
      $scope.delta.x = ($scope.ref.x - obj.beta) / 10;
      $scope.delta.y = ($scope.ref.y - obj.gamma) / 10;

      console.log($scope.delta);
    }

    function getOrientation(data){
        getDelta(data);
        $scope.$digest();
    }

  }]);
})();
