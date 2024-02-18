gulf.controller('CPScanCongratsCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, ChannelPartnersServices, $ionicPopup, LoaderService, $rootScope, ConverBase64, AppService) {

    $scope.nonMlpEncodedUserId = ConverBase64.convertBase64($rootScope.userData.usr_pk_id);
    $scope.paymentType;

    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
    $scope.msg = $rootScope.congratsMsg;

    $scope.submitRedeem = function (redeemMode) {
        //alert(redeemMode);
        if (redeemMode == "Amount") {
            $scope.DBT();
        } else if (redeemMode == "Paytm") {
            $scope.paytm();
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Select Redeem Option to Proceed.."
            });
        }

    }

    $scope.DBT = function () {
        // alert("DBT");
        $state.go('CPBankAccountDetails');
    }
    $scope.paytm = function () {
        //alert("paytm");

        $scope.cashbackType = "paytm";

        LoaderService.showLoading();
        ChannelPartnersServices.customerOrderPlacing($rootScope.wtencodeNonMlpUSerIDLogin, $scope.cashbackType, "",
            "", "", "", $rootScope.customerAmount).then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    }).then(function () {
                        $state.go('CPHome');
                    });

                } else {
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];
                    var alertPopup = $ionicPopup.alert({
                        template: show_msg
                    });
                }

            });




    }


    $scope.qrCodeBack = function () {
        window.history.back();
    }


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Scan Congrats Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }



});