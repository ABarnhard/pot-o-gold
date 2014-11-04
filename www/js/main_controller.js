(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};
    $scope.delta = {x:0, y:0};
    var moveId;

    document.addEventListener('deviceready', onDeviceReady, false);
    //window.addEventListener('deviceorientation', setRef, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    /*function setRef(data){
      $scope.ref.x = data.gamma;
      $scope.ref.y = data.beta;
      console.log('ref-------------------', $scope.ref);
    }*/

    $scope.startGame = function(){
      //window.removeEventListener('deviceorientation', setRef);
      window.addEventListener('deviceorientation', getOrientation);
      $scope.$broadcast('start');
      moveId = $interval(function(){
        $scope.$broadcast('move', $scope.delta);
      }, 18);
      $scope.gameStarted = true;
    };

    $scope.$on('win', function(){
      $scope.result = 'Congratulations! You Got the Gold!';
      clearGame();
    });

    $scope.$on('game-over', function(){
      $scope.result = 'You are a sorry loser.';
      clearGame();
    });

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta.x = Math.round(($scope.ref.x + obj.gamma) / 2);
      $scope.delta.y = Math.round(($scope.ref.y + obj.beta) / 2);
    }

    function getOrientation(data){
      getDelta(data);
    }

    function clearGame(){
      $scope.delta = {x:0, y:0};
      $interval.cancel(moveId);
      $scope.gameStarted = false;
      $scope.gameOver = true;
    }

  }]);
})();
