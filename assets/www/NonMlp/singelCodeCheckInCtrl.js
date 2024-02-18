gulf.controller('singelCodeCheckInCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {

    $scope.valid = false;
    $scope.inValid = false;
    $scope.used = false;
    $scope.data = {}
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));


    console.log("Valid Code--" + $rootScope.promocodevalid);
    console.log(" InValidCode--" + $rootScope.TotalInvalidCodes);
    console.log("Used Code--" + $rootScope.amazoncodevalid);

    //Below code comment start on 5th Nov 2020

    // if ($rootScope.TotalValidCodes == 1 || $rootScope.promocodevalid || $rootScope.amazoncodevalid) {
    //     $scope.valid = true;
    // }
    // if ($rootScope.TotalInvalidCodes == 1) {
    //     $scope.inValid = true;
    // }
    // if ($rootScope.TotalInvalidCodes == 1 &&  $rootScope.promocodevalid==false && $rootScope.amazoncodevalid==false) {
    //     $scope.AllinValid = true;
    // }
    // if ($rootScope.TotalInactiveCodes == 1 &&  $rootScope.promocodevalid==false && $rootScope.amazoncodevalid==false) {
    //     $scope.inactive = true;
    // }
    // if ($rootScope.amazoncodevalid==false) {
    //     $scope.AmzoninValid = true;
    // }
    // if ($rootScope.promocodevalid==false) {
    //     $scope.promoinValid = true;
    // }
    // if (($rootScope.amazoncodevalid==false && $rootScope.promocodevalid==false)) {
    //     $scope.AmzonPromoinValid = true;
    // }

    // if ($rootScope.TotalUsedCodes == 1) {
    //     $scope.used = true;
    // }

    //Above code comment end on 5th Nov 2020

    $scope.valid = false;
    $scope.inValid = false;
    $scope.used = false;
    $scope.inactive = false;
    $scope.promoShow = false;
    $scope.amazonShow = false;
    $scope.AllinValid = false;

    if ($rootScope.TotalValidCodes == 1) {
        // console.log(AllinValid);
        $scope.valid = true;
    }
    if ($rootScope.TotalValidCodes == 1 && $rootScope.promocodevalid) {
        // console.log(AllinValid);

        $scope.valid = true;
    }
    // if ($rootScope.TotalValidCodes == 1 && $rootScope.amazoncodevalid) {
    //     // console.log(AllinValid);

    //     $scope.valid = true;
    // }
    if ($rootScope.TotalInvalidCodes == 1 && $rootScope.promocodevalid == false) {
        // console.log(AllinValid);

        AllinValid = true;
    }
    if ($rootScope.TotalInactiveCodes == 1 && $rootScope.promocodevalid == false) {
        // console.log(AllinValid);

        $scope.inactive = true;
    }
    if ($rootScope.TotalUsedCodes == 1) {
        // console.log(AllinValid);

        $scope.used = true;
    }
    if ($rootScope.TotalInvalidCodes == 1 && $rootScope.promocodevalid == true) {
        // console.log(AllinValid);

        AllinValid = true;
    }
    if ($rootScope.TotalInactiveCodes == 1 && $rootScope.promocodevalid == true) {
        // console.log(AllinValid);

        $scope.inactive = true;
    }
    if ($rootScope.TotalUsedCodes == 1 && $rootScope.promocodevalid == true) {
        // console.log(AllinValid);

        $scope.used = true;
    }
    // if ($rootScope.TotalInvalidCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     // console.log(AllinValid);

    //     AllinValid = true;
    // }
    // if ($rootScope.TotalInactiveCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     // console.log(AllinValid);

    //     $scope.inactive = true;
    // }
    // if ($rootScope.TotalUsedCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     // console.log(AllinValid);

    //     $scope.used = true;
    // }
    if ($rootScope.TotalInactiveCodes == 1) {
        // console.log(AllinValid);

        $scope.inactive = true;
    }
    if ($rootScope.TotalInvalidCodes == 1) {
        // console.log(AllinValid);

        $scope.AllinValid = true;
    }
    if ($rootScope.TotalInvalidCodes == 1 && $rootScope.promocodevalid == "") {
        // console.log(AllinValid);
        $scope.AllinValid = true;
    }
    if ($rootScope.TotalInvalidCodes > 0 && $rootScope.promocodevalid == "") {
        // console.log(AllinValid);
        $scope.AllinValid = true;
    }
    // else{
    //     console.log(AllinValid);
    //     AllinValid = false;
    // }

    // if ($rootScope.amazoncodevalid == "" || $rootScope.amazoncodevalid == null) {
    //     // console.log(AllinValid);
    //     $scope.amazonShow = false;
    // } 
    // else {
    //     // console.log(AllinValid);
    //     $scope.amazonShow = true;
    // }
    if ($rootScope.promocodevalid == "") {
        // console.log(AllinValid);
        $scope.promoShow = false;
    } 
    else {
        // console.log(AllinValid);
        $scope.promoShow = true;
    }

    $scope.scanNextCode = function () {
        $state.go('scanQrCodeNonMlp');
    }
    $scope.redeemNowFromScanCode = function () {
        //alert("redeemNow");
        //  $state.go('EditBankDetails');
        $state.go('BankDetailList');
    }
    $scope.redeemLater = function () {
        var alertPopup = $ionicPopup.alert({
            title: 'Redeem Later',
            template: 'Your Points ' + $rootScope.TotalEarnedPointsForCodeCheckin + ' are added to your wallet'
        });
        alertPopup.then(function () {
            $state.go('NonMlpHome');
        })

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Single Code Check In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});