(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', '$rootScope', function($scope, $interval, $rootScope){
    $scope.title = 'Pot-O-Gold';
    $scope.ref ={x: 0, y: 0};
    $scope.delta = {x:0, y:0};
    var id;

    //window.addEventListener('deviceorientation', setRef);

    /*function setRef(data){
      $scope.ref.x = data.gamma;
      $scope.ref.y = data.beta;
      console.log('ref-------------------', $scope.ref);
    }*/

    $scope.startGame = function(){
      $scope.gameStarted = true;
      //window.removeEventListener('deviceorientation', setRef);
      window.addEventListener('deviceorientation', getOrientation);
      $rootScope.$broadcast('start');
      id = $interval(function(){
        $scope.$broadcast('move', $scope.delta);
      }, 18);
    };

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      screen.lockOrientation('portrait');
    }

    $scope.$on('win', function(){
      clearGame();
    });

    $scope.$on('game-over', function(){
      clearGame();
      window.removeEventListener('deviceorientation', getOrientation);
    });

    function getDelta(obj){
      //x = beta, y = gamma
      $scope.delta.x = Math.round(($scope.ref.x + obj.gamma) / 2);
      $scope.delta.y = Math.round(($scope.ref.y + obj.beta) / 2);

      //console.log($scope.delta);
    }

    function getOrientation(data){
        getDelta(data);
        $scope.$digest();
    }

    function clearGame(){
      $scope.delta = {x:0, y:0};
      $scope.gameStarted = false;
      $interval.cancel(id);
    }

  }]);
})();
