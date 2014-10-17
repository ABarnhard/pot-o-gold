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
          size,
          lep  = new Image(),
          bg   = new Image();

      $scope.$on('start', function(){
        init();
      });

      $scope.$on('move', function(event, data){
        draw(data);
      });

      function init(){
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0];
        $scope.width  = w.innerWidth || e.clientWidth || g.clientWidth;
        $scope.height = w.innerHeight|| e.clientHeight|| g.clientHeight;
        size = $scope.height * 0.10;


        potX = Math.floor(Math.random() * (($scope.width - size) - 0 + 1));
        potY = Math.floor(Math.random() * ((($scope.height/2) - size) - 0 + 1)) + 0;
        lepX = Math.floor(Math.random() * (($scope.width - size) - 0 + 1));

        var max = ($scope.height - size),
            min = Math.floor(($scope.height / 2));
        lepY = Math.floor(Math.random() * (max - min + 1)) + min;

        console.log($scope.width, $scope.height);

        pot.src = 'img/pot.png';
        lep.src = 'img/lep.png';
        bg.src  = 'img/bg.png';

        draw();
      }

      function draw(delta){
        var ctx = document.getElementById('game-canvas').getContext('2d');

        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0,0,$scope.width, $scope.height); // clear canvas
        // Pot Of Gold
        ctx.drawImage(bg, 0, 0, $scope.width, $scope.height);

        // Pot Of Gold
        ctx.drawImage(pot, potX, potY, size, size);

        // Leprechaun
        //ctx.save();
        if(delta){
          lepX += delta.x;
          lepY += delta.y;
        }
        ctx.drawImage(lep, lepX, lepY, size, size);

        if(lepX >= $scope.width || lepX < -size || lepY >= $scope.height || lepY < -size){
          $interval.cancel(id);
          alert('Game Over');
          $rootScope.$broadcast('game-over');
        }else if(Math.abs(lepX - potX) <= size * 0.33 && Math.abs(lepY - potY) <= size * 0.33){
          $interval.cancel(id);
          alert('Winner Winner Chicken Dinner!');
          $rootScope.$broadcast('win');
        }
      }

  }]);
})();
