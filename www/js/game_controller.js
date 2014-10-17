(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('GameCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout){
      var pot  = new Image(),
          potX = 0,
          potY = 0,
          lepX = 0,
          lepY = 0,
          lep  = new Image();
      $scope.$on('move', function(event, data){
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
        pot.src = '../img/ionic.png';
        lep.src = '../img/ionic.png';
        // $interval(draw, 1000);
        $timeout(draw, 500);
      }

      function draw(){
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
        ctx.drawImage(lep, lepX, lepY, 25, 25);
        ctx.restore();

        ctx.restore();
      }

  }]);
})();
