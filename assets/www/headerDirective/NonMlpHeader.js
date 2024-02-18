// const { FCMPlugin } = require("cordova-plugin-fcm-with-dependecy-updated");

gulf.controller('NonMlpHeaderCtrl', function ($scope, $state, AddMechanicService, $rootScope, $ionicPopup, $ionicPlatform, HeaderService, ConverBase64, LoaderService, $cordovaInAppBrowser, AppService, ConverBase64, TransactionService, CodeCheckInService, LoginService) {
    fcmLoad();

    var bankStatus;
    var mob = $rootScope.userData.usd_mobile;
    mob = ConverBase64.convertBase64(mob);
    console.log(mob);
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.localAppLanguage1 = $scope.data.localAppLanguage;
    $scope.data.mode = localStorage.getItem("mode");
    $scope.modeProject = $scope.data.mode;
    console.log($scope.localAppLanguage1);

    var area = userData.area_name;
    var city = userData.city_name;
    var state = userData.state_name;
    var usertype = userData.user_category;
    var mechtype = userData.user_type;
    //    LoginService.newlogin(mob).then(function (result) {

    //          if (result != "") {
    //            console.log("result.Data[0].bank_verifystatus");
    //            console.log(result.Data[0].bank_verifystatus);
    //            bankStatus=result.Data[0].bank_verifystatus;
    //          } else {

    //              console.log("getting service error while fatching the bank status");
    //          }


    //      });

    $scope.ReferalReportNonMLP = function () {
        $state.go('ReferalReportNonMLP');
    }
    $scope.showPanUpdatePopup = function(){
        $state.go('PanUpdatePopup');
    }
    $scope.referAFriendNonMLP = function () {

        AddMechanicService.checklogicDataExist(state, city, area, usertype, mechtype).then(function (result) {
            console.log(result);
            console.log("checklogicDataExist");
            if (result.Status == true || result.Status == "true") {
                if (result.data == 0 || result.data == "0" || result.data == "") {
                    //redirect to refer frd directly
                    $state.go('AddReferFriendNonMLP');
                } else {
                    //redirect to logic Report
                    $state.go('LogicReportNonMLP');

                }
            } else {
                $state.go('AddReferFriendNonMLP');

            }

        });
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ReferaFriendClick', '1', { dimension6: 'ReferaFriend', dimension7: $rootScope.userData.usd_mobile }]);
        }
    }
    $scope.home = function () {
        $state.go('NonMlpHome');
    }
    $scope.myorder = function () {
        $state.go('OrderReportCtrlNonMLp');
    }

    $scope.couponCode = function () {
        $state.go('scanQrCodeNonMlp');

    }

    $scope.codeVerification = function () {
        $state.go('NonMlpVerifyCode');
    }

    $scope.myprofile = function () {
        $state.go('NonMyProfile');
    }

    $scope.logout = function () {
        localStorage.removeItem('userData');
        $state.go('NewLoginForMLPAndNonMLP');
    }

    $scope.gulfCorner = function () {
        //  $state.go('GulfCorner');  // commented on 11Mar20 while changing background
        $state.go('NonMlpGulfCorner');
    }

    $scope.Contests = function () {
        $state.go('Contest');
    }
    $scope.notification = function () {
        // $state.go('Notification');
        $state.go('NonMlpNotification');
    }

    $scope.promocode = function () {
        //   $state.go('AmazonPromoCode');
        $state.go('NonMlpAmazonPromoCode');
    }
    $scope.BankDetail = function () {
        $state.go('BankDetailList');
    }

    $scope.redeemNowFunction = function () { // 14th Apr 2020, fh043, changed fn name redeemNow

        if (parseInt($scope.pointBalance) > 0) {
            var userData = $rootScope.userData;
            var encodedFHId = ConverBase64.convertBase64(userData.usr_unique_id);
            console.log(userData.usr_unique_id);
            console.log(encodedFHId);
            $rootScope.encodedFHId = encodedFHId;
            /// checking the tocken and redirecting to World Swip Page.
            var token = $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url +'api_r3/public/createWorldSwipeURL?userId='+userId,
                timeout: 80000,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result.data);  
                console.log(result.data.url);
                const target = '_blank'; // '_blank' opens in the InAppBrowser, '_system' opens in the system browser
                const options = {
                location: 'yes', // Show the location bar
                toolbar: 'yes', // Show the toolbar
                };
                var redirectURL=AppService.placeOrderUrl+'/redirect.php?source=' + result.data.url;
                console.log(redirectURL);

                $cordovaInAppBrowser.open(redirectURL, '_blank', options)
                .then(function (event) {
    
                })
                .catch(function (event) {
                    // error
                });
                return result.data;
            }, function (data) {
                return "";
            })
      ///......................End
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
            // $ionicPopup.alert({
            //     template: "is blocked "+ result.blockstatus+" and status "+result.Status
            // });
            // return;
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
    }else {
        var alertPopup = $ionicPopup.alert({
            title: '',
            template: "Sorry, you need to earn atleast 1 point to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
        });
    }
        // if (parseInt($scope.pointBalance) > 0) {
          
        // } else {
        //     var alertPopup = $ionicPopup.alert({
        //         title: '',
        //         template: "Sorry, you need to earn atleast 1 point to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
        //     });
        // }


    }

    $scope.transactionSummaryNonMlp = function () {
        $state.go('TransactionReportNonMlp');
    }


    function fcmLoad() {
        var tokenId;
        console.log("fcmLoad")

        // fcmPluginToken = FCMPlugin.getToken()
        // console.log(fcmPluginToken)

        try {
            // fcmToken = FCM.getToken()
            // console.log("fcmToken")

            // this.platform.ready().then(() => {
            FCM.getToken().then(token => {
                // Save token
                console.log('Token Available')
                console.log(token)
                tokenId = token;
                var visitorId = localStorage.getItem('visitorId');
                var device_platformHybrid = "Android" + "hybrid";

                var mobileJson = {
                    "mobileNo": $rootScope.userData.usd_mobile
                };


                var settings = {
                    "async": true,
                    "crossDomain": true,
                    //"url": pushUrl+"engage/mobile/doAppUserSubscription",
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
                console.log(settings.url)
                console.log(settings.data)
                $.ajax(settings).done(function (response) {
                    console.log(response);
                });

            })
                .catch(e => console.log('ErrorGetTocken', e))
            // })
            // .catch(e => console.log('ErrorInitFCM', e))

            // FCMPlugin.getToken(function (token) {
            //     console.log(token)
            //     tokenId = token;
            //     var visitorId = localStorage.getItem('visitorId');
            //     var device_platformHybrid = "Android" + "hybrid";

            //     var mobileJson = {
            //         "mobileNo": $rootScope.userData.usd_mobile
            //     };


            //     var settings = {
            //         "async": true,
            //         "crossDomain": true,
            //         //"url": pushUrl+"engage/mobile/doAppUserSubscription",
            //         "url": AppService.pushUrl + "engage/mobile/doAppUserSubscription",
            //         "method": "POST",
            //         "headers": {
            //             "content-type": "application/x-www-form-urlencoded"
            //         },
            //         "data": {
            //             "projectId": "123",
            //             "data": mobileJson,
            //             "regId": tokenId,
            //             "visitId": visitorId,
            //             "browser": device_platformHybrid
            //         }
            //     }

            //     $.ajax(settings).done(function (response) {
            //         console.log(response);
            //     });
            // });

        } catch (e) {
            console.log('fcmload error in catch')
            console.log(e)
        }


    }



});



gulf.directive('nonMlpHeader', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'NonMlpHeaderCtrl';
    directive.templateUrl = 'headerDirective/NonMlpHeader.html';



    return directive;
});