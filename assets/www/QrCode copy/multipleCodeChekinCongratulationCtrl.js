gulf.controller('MultipleCodeCheckinCongratulationCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || role == "27") {
            $state.go('Dashboard');
        }
    }

    $scope.addMechanic = function () {
        $state.go('AddMechanic');
    }
    $scope.myProfile = function () {
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }

    $scope.couponCode = function () {
        $state.go('CouponCode');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }
    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myorder = function () {
        $state.go('MyOrder');
    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header

    $scope.home = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }


    //footer

    $scope.allValid = false;
    $scope.invalidNotAvailable = false;
    $scope.usedNotAvailable = false;
    $scope.allInvalidData = true;
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
        $state.go('QrCode');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Multiple Code Check In Congratulation Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});