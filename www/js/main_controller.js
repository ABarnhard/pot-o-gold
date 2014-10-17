(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};
    $scope.delta = {x:0, y:0};
    var moveId;

    document.addEventListener('deviceready', onDeviceReady, false);
    window.addEventListener('deviceorientation', setRef, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    function setRef(data){
      $scope.ref.x = data.gamma;
      $scope.ref.y = data.beta;
      console.log('ref-------------------', $scope.ref);
    }

    $scope.startGame = function(){
      window.addEventListener('deviceorientation', getOrientation);
      $scope.$broadcast('start');
      moveId = $interval(function(){
        $scope.$broadcast('move', $scope.delta);
      }, 33);
      $scope.gameStarted = true;
    };

    $scope.$on('win', function(){
      $scope.gameStarted = false;
      $interval.cancel(moveId);
    });

    $scope.$on('game-over', function(){
      $interval.cancel(moveId);
      window.removeEventListener('deviceorientation', getOrientation);
      $scope.gameStarted = false;
    });

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta.x = Math.round(($scope.ref.x + obj.gamma) / 10);
      $scope.delta.y = Math.round(($scope.ref.y + obj.beta) / 10);
      console.log('obj-----------------------------', obj);
      console.log('delta---------------------------', $scope.delta);
    }

    function getOrientation(data){
      getDelta(data);
    }

  }]);
})();
