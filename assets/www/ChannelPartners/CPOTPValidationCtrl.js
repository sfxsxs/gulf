gulf.controller('CPOTPValidationCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService) {
    var mob;
    mob = $rootScope.cpEncodedMobileNumber;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.checkOtp = function () {

        console.log($scope.OTP);

        if ($scope.OTP != "" && $scope.OTP != undefined) {
            var otp = $scope.OTP.toString();
            otp = ConverBase64.convertBase64(otp);


            var mobileNo = $rootScope.CPUserNumber;
            $rootScope.CPUserNumber = mobileNo;
            $rootScope.CPUSerID = mobileNo;
            $rootScope.encodedCPMobileNumber = ConverBase64.convertBase64(mobileNo);
            $scope.OTP = "";


            LoaderService.showLoading();
            CodeCheckInService.checkOTP(otp, mob).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);

                if (result != "") {
                    if (result.Status == true) {
                        if (result.data && result.data[0] && result.data[0].userId) {
                            $rootScope.CPUSerID = ConverBase64.convertBase64(result.data[0].userId);
                        }
                        $state.go('CPSetPassword');

                        // $state.go('CPRegistration');
                        //  $state.go('NonMlpUserType');
                        // NonMlpSetPassword $state.go('SelectLanguage');

                        // $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.data[0].userId);
                        // $scope.OTP = "";
                        // if($rootScope.usd_firstname_nonMlp == ""){
                        //     $state.go('NonMlpRegistration');
                        // }else if ($rootScope.usd_firstname_nonMlp != "" && $rootScope.userRole == 22){

                        //      if($rootScope.bank_verifystatus == "Yes"){
                        //               $state.go('NonMlpHome');
                        //      }else if($rootScope.bank_verifystatus == "No"){
                        //           $rootScope.edit = true;

                        //           $state.go('BankaccountDetails');

                        //      }else if($rootScope.bank_verifystatus == "Pending"){
                        //          $state.go('TransferOne');

                        //      }
                        // }

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
            _paq.push(['setDocumentTitle', "Channel Partner OTP Validation Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});