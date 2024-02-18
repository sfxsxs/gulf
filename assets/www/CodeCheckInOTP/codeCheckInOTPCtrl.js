gulf.controller('CodeCheckInOTPCtrl', function ($scope, LoginService, $rootScope, ConverBase64, $ionicPopup, CodeCheckInService, $ionicPopup, $state, LoaderService, HeaderService, AppService) {

    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');
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
                    template: result.Message
                });
            }
        });
    }


    //header

    $scope.resendOTPCount = 0;

    console.log($state.params.obj);
    console.log($rootScope.otpMobile);
    var mobileNumberOfMechanic = ConverBase64.convertBase64($rootScope.otpMobile);
    if ($rootScope.otpMobile != null && $rootScope.otpMobile != undefined && $rootScope.otpMobile != "") {
        var res = $rootScope.otpMobile.slice(6, 10);
        $scope.last_digit = res;
    }


    $scope.checkOtp = function () {
        console.log($scope.OTP);
        if ($scope.OTP != "" && $scope.OTP != undefined) {
            var otp = $scope.OTP.toString();
            otp = ConverBase64.convertBase64(otp);
            LoaderService.showLoading();
            CodeCheckInService.checkOTP(otp, mobileNumberOfMechanic).then(function (result) {
                LoaderService.hideLoading();
                if (result != "") {
                    console.log(result);
                    console.log(result.data);
                    if (result.Status == true) {
                        $rootScope.CodeCheckInId = result.data[0].userId;
                        $state.go('QrCode');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: "Something Went Wrong Please , Try Again"
                    });
                }

            });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter OTP"
            });
        }
    }
    $scope.showCall = true;
    $scope.resendOTP = function () {
        LoaderService.showLoading();

        CodeCheckInService.sendOTPForCodeCheckin(mobileNumberOfMechanic).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {
                    $scope.showCall = false;
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }
        });


    }
    $scope.callOTP = function () {
        LoaderService.showLoading();
        CodeCheckInService.callOTP(mobileNumberOfMechanic).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {

                    //  $state.go('CodeCheckInOTP');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }
        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Code Check In OTP Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});