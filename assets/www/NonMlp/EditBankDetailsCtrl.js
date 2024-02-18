gulf.controller('EditBankDetailsCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, NonMlpServices) {


    $scope.updateDetail = false

    $scope.showoneBankDeatils = true;
    $scope.showoneRupe = false;
    $scope.resultSatatus = false;
    $scope.valid = false;
    $scope.inValid = false;
    $scope.btnBank = false;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    LoaderService.showLoading();
    NonMlpServices.bankListNONMLP($rootScope.NonMlpUserID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result.Status == true) {
            $scope.beneficiaryName = result.Data[0].beneficiary_name;
            $scope.bankName = result.Data[0].beneficiary_bank_name;
            $scope.accountNumber = result.Data[0].beneficiary_account_no;
            $scope.ifscCode = result.Data[0].beneficiary_ifsc_code;
            $scope.bankAccountId = result.Data[0].bankdetailId;
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: result.Message
            });
        }
    });

    $scope.editBankDetails = function () {
        $scope.updateDetail = true;
    }

    $scope.updateBankDetails = function () {
        // alert($scope.confirmAccountNumber);
        if ($scope.beneficiaryName != "" && $scope.beneficiaryName != null && $scope.beneficiaryName != undefined &&
            $scope.accountNumber != "" && $scope.accountNumber != null && $scope.accountNumber != undefined &&
            $scope.confirmAccountNumber != "" && $scope.confirmAccountNumber != null && $scope.confirmAccountNumber != undefined &&
            $scope.bankName != "" && $scope.bankName != null && $scope.bankName != undefined &&
            $scope.ifscCode != "" && $scope.ifscCode != null && $scope.ifscCode != undefined) {
            if ($scope.accountNumber == $scope.confirmAccountNumber) {
                var bankAccountAccess = document.getElementById("bankAccountAccess").checked;
                if (bankAccountAccess == true) {
                    $scope.btnBank = true;
                    LoaderService.showLoading();
                    NonMlpServices.editbankDetailsNONMLP($rootScope.NonMlpUserID, $scope.bankAccountId, $scope.beneficiaryName, $scope.accountNumber, $scope.bankName, $scope.ifscCode).then(function (result) {
                        console.log(result);
                        LoaderService.hideLoading();
                        $scope.btnBank = false;
                        if (result.Status == true) {
                            $scope.showoneBankDeatils = false;
                            $scope.showoneRupe = true;
                            $scope.result = result.data[0];
                            setTimeout($scope.navigation(), 10000);
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
        $ionicPlatform.registerBackButtonAction(function () {
            if ($ionicHistory.currentStateName === 'EditBankDetails') {
                event.preventDefault();
            }
        }, 100);
        if ($scope.result.bank_verifystatus == "Pending") {
            // $state.go('TransferOne');
            $state.go('NewLoginForMLPAndNonMLP');
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
        $state.go('NonMlpHome');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Edit Bank Detail Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});