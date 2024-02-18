gulf.controller('RetailCodeInNonMlpCtrl', function ($scope, NonMlpServices, ConverBase64, $rootScope, $ionicPopup, HeaderService, $state, LoaderService, AppService) {
    //var userID = ConverBase64.convertBase64($rootScope.NonMlpUserID);
    $scope.retailerCode = "";
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.RetailrCodeValidation = function () {

        var dontHaveCode = document.getElementById("dontHaveCode").checked;
        if (dontHaveCode != true && $scope.retailerCode == "") {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Retailer Code or select that i don't have retailer Code "
            });
            return false;
        }
        if (dontHaveCode == true && $scope.retailerCode != "") {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Retailer Code or select that i don't have retailer Code "
            });
            return false;
        }
        if (dontHaveCode == true) {
            $scope.EncodedRetailerCode = "";
        } else {
            if ($scope.EncodedRetailerCode == "") {
                var alertPopup = $ionicPopup.alert({
                    template: "Please Enter Retailer Code or select that i don't have retailer Code "
                });
            } else {
                $scope.EncodedRetailerCode = ConverBase64.convertBase64($scope.retailerCode);
            }

        }
        if (dontHaveCode == true) {
            //$scope.data.userType ="Retailer";
            $rootScope.dontHaveCodeStaus = true

            LoaderService.showLoading();
            NonMlpServices.updateNMLPUserType("Retailer", $rootScope.encoded_usd_mobile).
                then(function (result) {
                    console.log(result);
                    console.log("dontHaveCodeStaus");
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
            //$state.go('NonMlpOtpValidation');

        } else {
            $rootScope.dontHaveCodeStaus = false;
            LoaderService.showLoading();
            NonMlpServices.getUserByCode($scope.EncodedRetailerCode, $rootScope.encoded_usd_mobile).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result.Status == true) {
                    localStorage.setItem("RetailerValidData", JSON.stringify(result.data[0]));

                    var res = $rootScope.NonMlpRecievedMobile.slice(6, 10);
                    $rootScope.NonMlp_last_digit = res;

                    //   $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
                    //   $rootScope.userData = result.Data[0];
                    //   $rootScope.usd_firstname_nonMlp = result.Data[0].usd_firstname;
                    //   $rootScope.bank_verifystatus = result.Data[0].bank_verifystatus;
                    //   $rootScope.bankAccountIdNonMlp = result.Data[0].bankdetailId;
                    //   $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                    //   $rootScope.userRole = $rootScope.userData.role_fk_id;
                    //    $scope.username=result.Data[0].usd_mobile;
                    //   var res = $scope.username.slice(6, 10);
                    //   $rootScope.NonMlp_last_digit = res;

                    $state.go('NonMlpOtpValidation');

                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                    alertPopup.then(function () {

                        // $state.go('NonMlpOtpValidation');
                    })
                }
            })
        }

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP  Retail Code In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})
