gulf.controller('CPBankAccountDetailsCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, NonMlpServices, $ionicHistory, ChannelPartnersServices) {

    // bankDetailsNONMLP:function (userId,beneficiaryname,beneficiaryaccountno,beneficiarybankname,beneficiaryifsccode) 
    $scope.showoneBankDeatils = true;
    $scope.showoneRupe = false;
    $scope.resultSatatus = false;
    $scope.valid = false;
    $scope.inValid = false;
    $scope.btnBank = false;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    //$rootScope.edit = true;
    if (localStorage.getItem("bankEdit") != null) {
        $rootScope.edit = true;
    }

    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
        if ($state.current.name == "BankaccountDetails") {
            if ($rootScope.AddBankDetailFromListPage != true) {
                ionic.Platform.exitApp();
            }

        }

    });

    $scope.addBankDetails = function () {
        if ($scope.beneficiaryName != "" && $scope.beneficiaryName != null && $scope.beneficiaryName != undefined &&
            $scope.accountNumber != "" && $scope.accountNumber != null && $scope.accountNumber != undefined &&
            $scope.confirmAccountNumber != "" && $scope.confirmAccountNumber != null && $scope.confirmAccountNumber != undefined &&
            $scope.bankName != "" && $scope.bankName != null && $scope.bankName != undefined &&
            $scope.ifscCode != "" && $scope.ifscCode != null && $scope.ifscCode != undefined) {
            if ($scope.accountNumber == $scope.confirmAccountNumber) {
                var bankAccountAccess = document.getElementById("bankAccountAccess").checked;
                if (bankAccountAccess == true) {
                    $scope.cashbackType = "bank";

                    LoaderService.showLoading();
                    ChannelPartnersServices.customerOrderPlacing($rootScope.wtencodeNonMlpUSerIDLogin, $scope.cashbackType, $scope.beneficiaryName,
                        $scope.accountNumber, $scope.bankName,
                        $scope.ifscCode, $rootScope.customerAmount).then(function (result) {
                            LoaderService.hideLoading();
                            if (result.Status == true) {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                }).then(function () {
                                    $state.go('CPHome');
                                });

                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                            }

                        });


                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: "Agree To Share Your Account Details"
                    });

                }


            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Account Number And Confirm Account Number Is Not Matching"
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter All Mandatory Fields"
            });
        }


    }

    $scope.navigation = function () {
        $scope.showoneBankDeatils = false;


        $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
            if ($state.current.name == "BankaccountDetails") {
                ionic.Platform.exitApp();
            }

        });
        if ($scope.result.bank_verifystatus == "Pending") {
            $state.go('TransferOne');
        } else if ($scope.result.bank_verifystatus == "Yes") {
            $scope.resultSatatus = true;
            $scope.showoneRupe = false;
            $scope.valid = true;
            $scope.inValid = false;


        } else if ($scope.result.bank_verifystatus == "No") {
            $scope.resultSatatus = true;
            $scope.showoneRupe = false;
            $scope.valid = false;
            $scope.inValid = true;
            $rootScope.bankAccountIdNonMlp = $scope.result.bankdetailId;
        }

    }
    $scope.reEnterDetail = function () {

        $rootScope.edit = true;
        $state.reload();
    }
    $scope.letsProceed = function () {
        if ($rootScope.AddBankDetailFromListPage == true) {
            $rootScope.AddBankDetailFromListPage = false;
            $state.go('BankDetailList');
        } else {
            $state.go('NewLoginForMLPAndNonMLP');
        }

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Bank details List Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Bank Account Details Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }


});