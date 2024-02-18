gulf.controller('ChannelPartnersHeaderCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicPlatform, HeaderService, ConverBase64, LoaderService, $cordovaInAppBrowser, AppService, ConverBase64, TransactionService, CodeCheckInService) {
    fcmLoad();

    $scope.data.mode = localStorage.getItem("mode");
    $scope.modeProject = $scope.data.mode;
    console.log($scope.modeProject);

    $scope.data = {};
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.home = function () {
        $state.go('CPHomeCtrl');
    }
    $scope.myorder = function () {
        $state.go('CPMyRewards');
    }

    $scope.couponCode = function () {
        $state.go('CPScanQrCode');

    }

    $scope.codeVerification = function () {
        $state.go('VerifyCode');
    }

    $scope.myprofile = function () {
        $state.go('NonMyProfile');
    }

    $scope.logout = function () {
        localStorage.removeItem('userData');
        $state.go('NewLoginForMLPAndNonMLP');
    }

    $scope.CPgulfCorner = function () {
        $state.go('CPGulfCorner');
    }

    $scope.openAmazonCashBack = function () {
        $state.go('CPPromoCode');
    }
    $scope.notification = function () {
        $state.go('CPNotification');
    }
    $scope.promocode = function () {
        $state.go('CPPromoCode');
    }
    $scope.BankDetail = function () {
        $state.go('CPBankDetailList');
    }

    $scope.openNearByMechanic = function () {
        $state.go('CPNearByMechanic');
    }

    $scope.openBuyNowOption = function () {

        let buyNowUrl = "https://www.amazon.in/stores/Gulf/node/10746867031";

        $cordovaInAppBrowser.open(buyNowUrl, '_blank')
            .then(function (event) {
                // success
            })
            .catch(function (event) {
                // error
            });
    }

    $scope.nearByMachinc = function () {
        //nearByMachinc
    }

    $scope.redeemNowFunction = function () {   // 14th Apr 2020, fh043, changed fn name redeemNow
        if (parseInt($scope.pointBalance) > 0) {
            var userData = $rootScope.userData;
            var encodedFHId = ConverBase64.convertBase64(userData.usr_unique_id);
            console.log(userData.usr_unique_id);
            console.log(encodedFHId);
            $rootScope.encodedFHId = encodedFHId;

            //without OTP activation below  
            var url = AppService.placeOrderUrl + "login.php?uid=" + encodedFHId + "&pid=NTI1NA==&usid=" + $rootScope.userID;
            console.log(url);
            var options = {
                location: 'yes'
            };

            document.addEventListener("deviceready", function () {

                $cordovaInAppBrowser.open(url, '_blank', options)
                    .then(function (event) {
                        // success
                    })
                    .catch(function (event) {
                        // error
                    });
            }, false);

        } else {
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: "Sorry, you need to earn atleast 1 point to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
            });
        }

    }

    $scope.redeemNow = function () {
        if (parseInt($scope.pointBalance) > 0) {
            CodeCheckInService.checkRedemptionBlockedOrNot($rootScope.userID, "").then(function (result) {
                // if (result.Status == true && result.blockstatus == "No") {
                //     $scope.redeemNowFunction();
                // } else {
                //     var msg_code = result.message_code;
                //     var show_msg = $scope.data.localAppLanguage[msg_code];
                //     $ionicPopup.alert({
                //         template: show_msg
                //     });
                //     // $ionicPopup.alert({
                //     //     template: result.Alert
                //     // });
                // }
            });

        } else {
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: "Sorry, you need to earn atleast 1 point to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
            });
        }

    }
    $scope.openTransactionSummary = function () {
        $state.go('CPTransactionReport');
    }


    function fcmLoad() {
        var tokenId;
        try {
            FCM.getToken().then(token => {
                // FCMPlugin.getToken(function (token) {
                tokenId = token;
                console.log(tokenId);
                var visitorId = localStorage.getItem('visitorId');
                var device_platformHybrid = "Android" + "hybrid";

                var mobileJson = {
                    "mobileNo": $rootScope.userData.usd_mobile
                };


                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": AppService.pushUrl + "engage/mobile/doAppUserSubscription",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/x-www-form-urlencoded"
                    },
                    "data": {
                        "projectId": "123",
                        "data": mobileJson,
                        "regId": tokenId,
                        "visitId": visitorId,
                        "browser": device_platformHybrid
                    }
                }

                $.ajax(settings).done(function (response) {
                    console.log(response);
                });
            })
                .catch(e => console.log('ErrorGetTocken', e))

        } catch (e) {

        }


    }



});



gulf.directive('channelPartnersHeader', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'ChannelPartnersHeaderCtrl';
    directive.templateUrl = 'headerDirective/ChannelPartnersHeader.html';



    return directive;
});