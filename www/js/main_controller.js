(function(){
  'use strict';

  angular.module('pot-o-gold')
  .controller('MainCtrl', ['$scope', '$interval', function($scope, $interval){
    $scope.title = 'Pot-O-Gold';

    // var id = navigator.gyroscope.watchAngularSpeed(function(){}, function(){}, {frequency:500});

    function onSuccess(speed){
      console.log('AngularSpeed:\n' +
            'x: ' + speed.x + '\n' +
            'y: ' + speed.y + '\n' +
            'z: ' + speed.z + '\n' +
            'Timestamp: ' + speed.timestamp + '\n');
    }

    function onError(){
      alert('onError!');
    }

    document.addEventListener('deviceready', onDeviceReady, false);

    function onDeviceReady(){
      console.log('navigator');
      console.log(navigator);
      console.log('gyroscope');
      navigator.gyroscope.getCurrentAngularSpeed(onSuccess, onError);
    }


    //var options = { frequency: 3000 };  // Update every 3 seconds

    //var watchID = navigator.gyroscope.watchAngularSpeed(onSuccess, onError, options);

  }]);
})();
