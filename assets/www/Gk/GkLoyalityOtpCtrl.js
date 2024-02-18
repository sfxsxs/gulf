gulf.controller('GkLoyalityOtpCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService) {
    var mob;
    mob = $rootScope.NonMlpRecievedMobile.toString();
    mob = ConverBase64.convertBase64(mob);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.checkOtp = function () {

        console.log($scope.OTP);

        if ($scope.OTP != "" && $scope.OTP != undefined) {
            var otp = $scope.OTP.toString();
            otp = ConverBase64.convertBase64(otp);

            LoaderService.showLoading();
            CodeCheckInService.checkOTP(otp, mob).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);
                if (result != "") {
                    if (result.Status == true) {
                        $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.data[0].userId);
                        $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.data[0].userId);
                        $rootScope.wtencodeNonMlpUSerIDLogin = result.data[0].userId;
                        $scope.OTP = "";
                        //$state.go('GkLanguage');//saurav

                        $state.go('LoyalitySetPassword');

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
    $scope.resendOtp = function () {
        LoaderService.showLoading();
        LoginService.forgotPassword(mob).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);
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
        CodeCheckInService.callOTP(mob).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {

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
            _paq.push(['setDocumentTitle', "GK OTP Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});