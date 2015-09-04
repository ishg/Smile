angular.module('starter.controllers', [])

.controller('SmileCtrl', function($scope, $http, $rootScope, $ionicLoading, $ionicUser, $cordovaDevice, $ionicPopup) {
  $scope.addSmile = function(){
    
    /*
    //Get User id
    $ionicUser.identify({
      // OR, user the device's UUID
      user_id: $cordovaDevice.getUUID()
    }).then(function(){
      alert($ionicUser);
    }, function(err){
      alert(err);
    });
    */
    
    $ionicLoading.show({
      template: '<ion-spinner></ion-spinner>'
    });
    
    if($rootScope.currentLocation){
      $scope.addPoint($rootScope.currentLocation);
    }else{
      var posOptions = {timeout: 5000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(
        function(position){
          $rootScope.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          $scope.addPoint($rootScope.currentLocation);
        },
        function(err){
          $ionicPopup.confirm({
            title: "Location Error",
            content: "Could not determine your location. Please check that GPS is on and retry."
          })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
        }
      );
      
    }
    
  };
  
  $scope.addPoint = function(point){
    var url = 'https://ishg.cartodb.com/api/v2/sql?q=INSERT INTO happy_table (the_geom) VALUES (ST_SetSRID(ST_Point('+$rootScope.currentLocation.lng+','+ $rootScope.currentLocation.lat+'),4326))&api_key=026e40685a0abe1675f2c819cc9e5403d01c6fd6';
    $http.get(url).
      then(function(response) {
        console.log(response);
        $ionicLoading.hide();
      }, function(err) {
        console.log(err);
      });  
  };
  
})

.controller('MapCtrl', function($scope, $rootScope, $cordovaGeolocation, $ionicLoading, $ionicPopup) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  
  $scope.firstOpen = false;
  
  $scope.$on('$ionicView.enter', function(e) {
    
    if(!$scope.firstOpen){
      $scope.firstOpen = true;
      
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
      });
      //Get user location
      var posOptions = {timeout: 5000, enableHighAccuracy: false};
      $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(
        function(position){
          
          $rootScope.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          cartodb.createVis('map', 'https://ishg.cartodb.com/api/v2/viz/b48ebcce-51a8-11e5-892d-0e9d821ea90d/viz.json', {
            center_lat: $rootScope.currentLocation.lat,
            center_lon: $rootScope.currentLocation.lng,
            zoom: 13
          }).done(function(vis, layers){
            $ionicLoading.hide();
          });
        },
        function(err){
          $ionicLoading.hide();
          $scope.firstOpen = false;
          $ionicPopup.confirm({
            title: "Location Error",
            content: "Could not determine your location. Please check that GPS is on and retry."
          })
          .then(function(result) {
            if(!result) {
              ionic.Platform.exitApp();
            }
          });
        }
      );
    }
  });
})

.controller('UserCtrl', function($scope){
  
});
