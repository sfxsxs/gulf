gulf.controller('PanUpdatePopupCtrl',  function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, $ionicPopup, LoaderService, HeaderService, AppService, LoginService) {

   $scope.userData = JSON.parse(localStorage.getItem("userData"));
   $scope.qrscan = '';
   $scope.nonMlp = true;

   var mode = localStorage.getItem("mode");
   $scope.modeProject = mode;

   if($scope.userData.user_category == "Loyalty User"){
      $scope.qrscan = 'QrCode';
      $scope.nonMlp = false;
   }else if($scope.userData.user_category == "Regular User"){
      $scope.qrscan = 'scanQrCodeNonMlp';
   }
   
   $scope.gotoUploadPanImagePage = function(){
        $state.go('PanImageUpload');
   }

   $scope.gotoScanCode = function(){
      $rootScope.panPopupDismiss = true;
      $state.go($scope.qrscan);
 }
});