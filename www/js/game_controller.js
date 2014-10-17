(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('GameCtrl', ['$scope', '$interval', '$timeout', '$rootScope', function($scope, $interval, $timeout, $rootScope){
      var pot  = new Image(),
          potX = 0,
          potY = 0,
          lepX = 0,
          lepY = 0,
          id,
          lep  = new Image();

      $scope.$on('game-over', function(event, data){
        $interval.cancel(id);
        alert('Game Over');
      });

      $scope.$on('win', function(event, data){
        $interval.cancel(id);
        alert('Winner Winner Chicken Dinner!');
      });

      $scope.$on('start', function(){
        init();
      });

      function init(){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];
        $scope.width  = w.innerWidth || e.clientWidth || g.clientWidth;
        $scope.height = w.innerHeight|| e.clientHeight|| g.clientHeight;

        potX = Math.floor(Math.random() * (($scope.width - 25) - 0 + 1));
        potY = Math.floor(Math.random() * ((($scope.height/2) - 25) - 0 + 1)) + 0;
        lepX = Math.floor(Math.random() * (($scope.width - 25) - 0 + 1));

        var max = ($scope.height - 25),
            min = Math.floor(($scope.height / 2));
        lepY = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log($scope.width, $scope.height);

        pot.src = 'img/ionic.png';
        lep.src = 'img/ionic.png';

        // $interval(draw, 1000);
        $timeout(draw, 200);
        $timeout(function(){
          $scope.$on('move', function(event, data){
            draw(data);
          });
        }, 201);
      }

      function draw(delta){
        var ctx = document.getElementById('game-canvas').getContext('2d');

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0,0,$scope.width,$scope.height); // clear canvas

        ctx.fillStyle = 'rgba(0,0,0,0.4)';
        ctx.strokeStyle = 'rgba(0,153,255,0.4)';
        ctx.save();
        //ctx.translate(Math.floor($scope.screenWidth / 2), Math.floor($scope.screenHeight / 2));

        // Pot Of Gold
        ctx.drawImage(pot, potX, potY, 25, 25);

        // Leprechaun
        ctx.save();
        if(delta){
          lepX += delta.x;
          lepY += delta.y;
        }
        ctx.drawImage(lep, lepX, lepY, 25, 25);
        ctx.restore();
        checkStatus();
      }

      function checkStatus(){
        if(lepX >= $scope.width || lepX < -25 || lepY >= $scope.height || lepY < -25){
          $rootScope.$broadcast('game-over');
        }else if(Math.abs(lepX - potX) <= 5 && Math.abs(lepY - potY) <= 5){
          $rootScope.$broadcast('win');
        }
      }

  }]);
})();
