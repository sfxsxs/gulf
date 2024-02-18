gulf.controller('MultipleCodeChekdinCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {


    $scope.allValid = false;
    $scope.invalidNotAvailable = false;
    $scope.usedNotAvailable = false;
    $scope.allInvalidData = true;
    $scope.validCodePresent = false;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if ($rootScope.TotalValidCodes.length == $rootScope.Totalcodes) {
        $scope.allValid = true;
    } else if (($rootScope.Totalcodes == $rootScope.TotalInvalidCodes.length) || ($rootScope.Totalcodes == $rootScope.TotalUsedCodes.length) || ($rootScope.Totalcodes == ($rootScope.TotalUsedCodes.length + $rootScope.TotalInvalidCodes.length))) {
        $scope.allInvalidData = false;
    }

    if ($rootScope.TotalInvalidCodes.length > 0) {
        $scope.invalidNotAvailable = true;
    }
    if ($rootScope.TotalUsedCodes.length > 0) {
        $scope.usedNotAvailable = true;
    }

    $scope.scanNextCode = function () {
        $state.go('scanQrCodeNonMlp');
    }

    $scope.redeemLater = function () {
        $state.go('NonMlpHome');
    }
    $scope.redeemNowFromScanCode = function () {
        $state.go('EditBankDetails');
    }

    if ($rootScope.TotalValidCodes.length > 0) {
        $scope.validCodePresent = true;

    } else {
        $scope.validCodePresent = false;
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Multiple Code Check In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});