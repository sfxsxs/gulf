gulf.controller('panActionCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicPlatform,  LoaderService, ConverBase64, HeaderService, AppService, $cordovaInAppBrowser,$cordovaCamera) {

    $scope.pathForImage = "";
    console.log($rootScope.selectedPanImag);
   
    $scope.gotoGetPanDetailPage = function(){
        $state.go('PanDetailSubmit')
    }
});