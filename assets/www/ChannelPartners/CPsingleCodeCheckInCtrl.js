gulf.controller('CPsingelCodeCheckInCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {

    $scope.msg = $rootScope.CPAmazonPromoCodeMsg;

    $scope.status = $rootScope.CPAmazonPromoCodeStatus;
    //alert($scope.msg);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.scanNextCode = function () {
        //$state.go('scanQrCodeNonMlp');
    }
    $scope.redeemNowFromScanCode = function () {
        //alert("redeemNow");
        //  $state.go('EditBankDetails');
        // $state.go('BankDetailList');
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