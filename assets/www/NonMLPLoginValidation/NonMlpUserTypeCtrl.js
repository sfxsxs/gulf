gulf.controller('NonMlpUserTypeCtrl', function ($scope, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, $cordovaDevice, $ionicPlatform, AppService, NonMlpServices) {

    //$scope.mobileNumber = $rootScope.NonMlpRecievedMobile ;
    $scope.data = {};
    //$rootScope.NonMlpUserID;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);


    $scope.NonMlpUserType = function () {
        // alert($scope.data.userType);

        if ($scope.data.userType != "" && $scope.data.userType != null && $scope.data.userType != undefined) {

            LoaderService.showLoading();
            NonMlpServices.updateNMLPUserType($scope.data.userType, $rootScope.encoded_usd_mobile).
                then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
                        $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                        $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
                        $rootScope.userData = result.Data[0];
                        $rootScope.usd_firstname_nonMlp = result.Data[0].usd_firstname;
                        $rootScope.bank_verifystatus = result.Data[0].bank_verifystatus;
                        $rootScope.bankAccountIdNonMlp = result.Data[0].bankdetailId;
                        $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                        $rootScope.userRole = $rootScope.userData.role_fk_id;
                        $scope.username = result.Data[0].usd_mobile;
                        var res = $scope.username.slice(6, 10);
                        $rootScope.NonMlp_last_digit = res;
                        $state.go('NonMlpOtpValidation');

                    }
                    else {

                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }

                });




        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Select User Type"
            });
        }





    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP User Type Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});