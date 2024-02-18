gulf.controller('ValidateMobileInOTPCtrl', function ($scope, LoginService, $rootScope, ConverBase64, $ionicPopup, CodeCheckInService, $ionicPopup, $state, LoaderService, HeaderService, UpdateMechanicProfileService, AppService) {

    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.resendOTPCount = 0;

    console.log($state.params.obj);
    console.log($rootScope.validateNewMobile);
    // console.log($rootScope.otpoldMobileValiadte)
    var mob = $rootScope.validateNewMobile.toString();
    var newMob = ConverBase64.convertBase64($rootScope.validateNewMobile.toString());
    var oldMob = ConverBase64.convertBase64($rootScope.otpoldMobileValiadte.toString());
    if ($rootScope.validateNewMobile != null && $rootScope.validateNewMobile != undefined && $rootScope.validateNewMobile != "") {
        var res = mob.slice(6, 10);
        $scope.last_digit = res;
    }




    $scope.checkOtp = function () {
        console.log($scope.OTP);
        if ($scope.OTP != "" && $scope.OTP != undefined) {
            var otp = $scope.OTP.toString();
            otp = ConverBase64.convertBase64(otp);
            LoaderService.showLoading();

            CodeCheckInService.checkOTP(otp, $rootScope.otpNewMobileValiadte).then(function (result) {
                LoaderService.hideLoading();
                if (result != "") {
                    console.log(result);
                    console.log(result.data);
                    if (result.Status == true) {
                        /*  $rootScope.CodeCheckInId = ConverBase64.convertBase64(result.data[0].userId);
                          $state.go('QrCode');*/
                        UpdateMechanicProfileService.updateMobileNumber(ConverBase64.convertBase64($rootScope.mechanicMobileNumberUpdateID), $rootScope.otpoldMobileValiadte, $rootScope.otpNewMobileValiadte).then(function (result) {
                            LoaderService.hideLoading();
                            console.log(result.Status);
                            if (result.Status == true) {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                                alertPopup.then(function (res) {
                                    $state.go('Home');
                                });

                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                            }
                        });
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
        CodeCheckInService.sendOTPToValidateMobile($rootScope.otpoldMobileValiadte, newMob).then(function (result) {
            LoaderService.hideLoading();
            if (result != "") {
                console.log(result);
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
        CodeCheckInService.callOTP(newMob).then(function (result) {
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
            _paq.push(['setDocumentTitle', "OTP Validate Mobile Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});