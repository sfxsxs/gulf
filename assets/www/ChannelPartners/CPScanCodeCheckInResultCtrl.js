gulf.controller('CPScanCodeCheckInResultCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {

    $scope.msg = $rootScope.congratsMsg;
    //alert($scope.msg );

    //$scope.status=$rootScope.CPAmazonPromoCodeStatus;
    //alert($scope.msg);
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.scanNextCode = function () {
        //$state.go('scanQrCodeNonMlp');
    }
    $scope.redeemNowFromScanCode = function () {
        //alert("redeemNow");
        //  $state.go('EditBankDetails');
        $state.go('CPScanQrCode');
    }
    $scope.redeemLater = function () {
        $state.go('CPHome');

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Customer Check In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});