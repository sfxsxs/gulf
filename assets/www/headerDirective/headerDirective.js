gulf.controller('HeaderController', function ($scope, $state, $rootScope, AddMechanicService, $ionicPopup, $ionicPlatform, HeaderService, ConverBase64, LoaderService, $cordovaInAppBrowser, AppService, ConverBase64, TransactionService, CodeCheckInService, LoginService, DreamIncomeService, AppService) {
    $scope.pointBalance = "";
    $scope.pointRedeemEarned = "";
    $scope.pointsEarned = "";
    $scope.block_status = "";

    function openNav() {
        document.getElementById("mySidenav").style.width = "280px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {};
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));

    $scope.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    
    $scope.data.mode = localStorage.getItem("mode");
    if($scope.data.mode == undefined || $scope.data.mode == null || $scope.data.mode == ""){
        localStorage.setItem("mode",'Gulf');
        $scope.modeProject = 'Gulf';
    }else{
        $scope.modeProject = $scope.data.mode;
    }
    console.log($scope.modeProject);

    var area = userData.area_name;
    var city = userData.city_name;
    var state = userData.state_name;
    var usertype = userData.user_category;
    var mechtype = userData.user_type;
    var userId = userData.usr_pk_id;


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
        console.log($scope.data.mode);
        if ($scope.data.mode != null) {
            if ($scope.data.mode == 'S-oil') {
                $scope.modevalue = '1';
                TransactionService.pointSummerySoil($rootScope.userID, $scope.modevalue).then(function (result) {
                    console.log("summery");
                    console.log(result.Status);
                    if (result.Status) {
                        console.log(result.data[0]);
                        $scope.pointBalance = result.data[0].pointBalance;
                        $scope.pointRedeemEarned = result.data[0].pointsEarned;
                    } else {
                        $scope.pointBalance = "";
                        $scope.pointRedeemEarned = "";
                    }
                });
            }
            else if ($scope.data.mode == 'Gulf') {
                $scope.modevalue = '0';
                TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                    console.log("summery");
                    console.log(result.Status);
                    if (result.Status) {
                        console.log(result.data[0]);
                        $scope.pointBalance = result.data[0].pointBalance;
                        $scope.pointRedeemEarned = result.data[0].pointsEarned;
                    } else {
                        $scope.pointBalance = "";
                        $scope.pointRedeemEarned = "";
                    }
                });
            }
        }
        else if ($scope.data.mode == null) {
            $scope.modevalue = '0';
            TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                console.log("summery");
                console.log(result.Status);
                if (result.Status) {
                    console.log(result.data[0]);
                    $scope.pointBalance = result.data[0].pointBalance;
                    $scope.pointRedeemEarned = result.data[0].pointsEarned;
                } else {
                    $scope.pointBalance = "";
                    $scope.pointRedeemEarned = "";
                }
            });
        }
        LoaderService.showLoading();
        LoginService.myProfileData($rootScope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {
                    $scope.userImg = AppService.url + result.Data[0].filePath + result.Data[0].usd_profile_pic;
                    $scope.rating = result.Data.rating;
                    $scope.usrName = result.Data[0].usd_firstname;
                    $scope.mechanic_type = result.Data[0].mechanic_type;
                } else {
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];

                    var alertPopup = $ionicPopup.alert({
                        template: show_msg
                    });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }
        });
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
        $scope.otherRole = true;
    }


    // CodeCheckInService.checkRedemptionBlockedOrNot($rootScope.userID, "").then(function (result) {
           
    //     if (result.Status == true && result.blockstatus == "No") {
    //         $scope.block_status = result.blockstatus;
    //         console.log($scope.block_status);
    //         // $scope.redeemNowFunction();
    //     } else {
    //         $scope.block_status = result.blockstatus;
    //         console.log($scope.block_status);
    //     }
    // });

    //header

    $scope.effortApp = function () {
        $state.go('EffortApp');
    }

    $scope.showPanUpdatePopup = function(){
        $state.go('PanUpdatePopup');
    }
    // $scope.PendingValidation=function(){
    //    // $state.go('PendingValidationList');
    //    var alertPopup = $ionicPopup.alert({
    //     title: '',
    //     template: 'Coming Soon...'
    // });
    // }

    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else {
            $state.go('Dashboard');
        }
    }

    $scope.changepassword = function () {
        $state.go('ChangePassword');
    }

    $scope.addMechanic = function () {
        if (role == "6" || role == "27") {
            $state.go('AddMechanic');
        } else {
            $state.go('addMechanicDirect');
        }
    }
    $scope.myProfile = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'MyProfileClick', '1', { dimension6: 'MyProfile', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }
    $scope.mycontest = function () {
        $state.go('LoyalityContest');
    }

    $scope.notification = function () {
        $state.go('Notification');
    }

    $scope.couponCode = function () {
        //uncomment to do codecheck in
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ScanCodeClick', '1', { dimension6: 'ScanCode', dimension7: $rootScope.userData.usd_mobile }]);
        }

        if (userData && userData.user_category == "Loyalty User") {
            $rootScope.CodeCheckInId = $rootScope.userID
            $state.go('QrCode');
        } else if (role == "6" || role == "27") {
            $state.go('CodeCheckIn');
        }
        /*  var alertPopup = $ionicPopup.alert({
              title: '',
              template: "Coming soon. Code check-in facility will be launched on 1st October 2018."
          });*/

    }
    $scope.codeVerification = function () {
        // $state.go('CodeVerification');
        /*         var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: "Coming Soon"
                });*/

        if (userData.user_category == "Loyalty User" || role == "22") {  // 5 = mechanic;  22 = nonMLP
            $state.go('VerifyCode');
        } else {
            $state.go('CodeVerification');
        }
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.ReferalReport = function () {
        $state.go('ReferalReport');
    }
    $scope.referAFriend = function () {

        AddMechanicService.checklogicDataExist(state, city, area, usertype, mechtype).then(function (result) {
            console.log(result);
            console.log("checklogicDataExist");
            if (result.Status == true || result.Status == "true") {
                if (result.data == 0 || result.data == "0" || result.data == "") {
                    //redirect to refer frd directly
                    $state.go('AddReferFriend');
                } else {
                    //redirect to logic Report
                    $state.go('LogicReport');

                }
            } else {
                $state.go('AddReferFriend');

            }

        });
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ReferaFriendClick', '1', { dimension6: 'ReferaFriend', dimension7: $rootScope.userData.usd_mobile }]);
        }
        // $state.go('AddReferFriend');
        // $state.go('LogicReport');
    }
    $scope.logout = function () {
        LoaderService.showLoading();
        HeaderService.logout($rootScope.userID).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);

            if (result.Status == true) {
                localStorage.removeItem('userData');
                localStorage.removeItem('mode');
                delete $rootScope.CodeCheckInId;
                for (var prop in $rootScope) {

                    // Check is not $rootScope default properties, functions
                    if (typeof $rootScope[prop] !== 'function' && prop.indexOf('$') == -1 && prop.indexOf('$$') == -1) {
                 
                       delete $rootScope[prop];
                 
                    }
                 } 
                console.log('user logout')
                console.log($rootScope);
                $state.go('NewLoginForMLPAndNonMLP');
            } else {
                var msg_code = result.message_code;
                var show_msg = $scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: show_msg
                });
            }
        });
    }

    $scope.gulfCorner = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'GulfCornerClick', '1', { dimension6: 'GulfCorner', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $state.go('GulfCorner');
    }

    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myorder = function () {
        $state.go('MyOrder');
    }
    $scope.myCustomer = function () {
        $rootScope.addplannerback = false;

        if (userData && userData.user_category == "Loyalty User") {
            $state.go('AddPlaneer');
        } else if (role == "6" || role == "12" || role == "13" || role == "14" || role == "28" || role == "30" || role == "27") {
            $state.go('SoAddPlanner');
        }
    }

    $scope.customerReport = function () {
        $state.go('PlaneerReport');
    }

    $scope.mechMobileNumberUpdate = function () {
        $state.go('EditMobileNumber');
    }

    $scope.myGeography = function () {
        // alert($rootScope.userID);
        var options = {
            location: 'yes'
        };

        console.log($rootScope.FhIdofMechanic);
        var url = AppService.url + "dashboard/dashboard7.php?userId=" + $rootScope.userID;
        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowser.open(url, '_blank', options)
                .then(function (event) {
                    // success
                })
                .catch(function (event) {
                    // error
                });
        }, false);
    }

    $scope.betaPlan = function () {
        $state.go('ThingsToDoBasedOnArea');
    }
    $scope.addbeatPlan = function () {
        $state.go('AddBeatPlan');
    }
    $scope.dreamIncome = function () {
        var alertPopup = $ionicPopup.alert({
            template: "Coming Soon ........"
        });

        // if (role == "5") {
        //    if($scope.mechanic_type == null || $scope.mechanic_type == ""){
        //       $state.go('TypeSelcetion');
        //   }else{
        //       $scope.userID = $rootScope.userID ;
        //       console.log($scope.userID);

        // LoaderService.showLoading();
        // DreamIncomeService.checkDreamIncome($scope.userID).then(function (result) {
        //     console.log(result);
        //     LoaderService.hideLoading();
        //     if (result != "") {
        //         if (result.Status == true) {
        //             $state.go('DreamIncome');

        //         } else {
        //               $state.go('purchaseRecommendation');

        //         }
        //     } else {
        //         var alertPopup = $ionicPopup.alert({
        //             template: "Something Went Wrong Please , Try Again"
        //         });
        //     }
        // });
        //   }

        //   }else if(role == "6"){
        //       $state.go('MechanicValidetaDreamIncome');
        //   }




    }
    $scope.promocode = function () {
        $state.go('AmazonPromoCode');
    }


    $scope.redeemNowFunction = function () {   // 14th Apr 2020, fh043, changed fn name redeemNow
        var userData = JSON.parse(localStorage.getItem("userData"));
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'RedeemClick', '1', { dimension6: 'Redeem', dimension7: $rootScope.userData.usd_mobile }]);
        }

        if (userData && userData.user_category == "Loyalty User") {
            if (parseInt($scope.pointBalance) > 500) {

                //without OTP activation below  

                var userData = JSON.parse(localStorage.getItem("userData"));
                var encodedFHId = ConverBase64.convertBase64(userData.usr_unique_id);
                console.log(userData.usr_unique_id);
                console.log(encodedFHId);
                $rootScope.encodedFHId = encodedFHId;
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
                    template: "Sorry, you need to earn atleast 500 points to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
                });
            }
        } else {

            $state.go('redeemMech');
        }
    }


    $scope.redeemNow = function () {

        // var userDetails = JSON.parse(localStorage.getItem("userData"));
        var userData = JSON.parse(localStorage.getItem("userData"));

        if (userData.user_category == "Loyalty User") {
            if (parseInt($scope.pointBalance) > 500) {
            CodeCheckInService.checkRedemptionBlockedOrNot($rootScope.userID, "").then(function (result) {
              
                // if (result.Status == true && result.blockstatus == "No") {
                //     $scope.block_status = result.blockstatus;
                //     $scope.redeemNowFunction();
                // } else {
                //     $scope.block_status = result.blockstatus;
                //     var msg_code = result.message_code;
                //     var show_msg = $scope.data.localAppLanguage[msg_code];
                //     $ionicPopup.alert({
                //         template: show_msg
                //     });
                // }
            });
        }else{
            var alertPopup = $ionicPopup.alert({
                title: '',
                template: "Sorry, you need to earn atleast 500 points to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
            });
        }
            //show popup to yes or no
            // $ionicPopup.show({
            //     template: 'Do you want to redeem right now? An OTP will be sent to your Registered Mobile Number',
            //     buttons: [
            //       { text: "OK",
            //         onTap:function(e){
            //              console.log("OK");
            //              CodeCheckInService.checkRedemptionBlockedOrNot($rootScope.userID,"").then(function (result) {
            //                 if(result.Status == true  && result.blockstatus == "No"){
            //                     $scope.redeemNowFunction();
            //                 }else{
            //                     $ionicPopup.alert({
            //                         template: result.Alert
            //                     });
            //                 }
            //             });
            //         }
            //       },
            //       { text: "Cancel",
            //         onTap:function(e){
            //             console.log("Cancel");
            //         }
            //       },
            //     ]
            //  });

        } else {
            $state.go('redeemMech');
        }

    }


    function fcmLoad() {
        var tokenId;
        try {
            FCM.getToken().then(token => {
            // FCMPlugin.getToken(function (token) {
                tokenId = token;
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



gulf.directive('navDirective', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'HeaderController';
    directive.templateUrl = 'headerDirective/headerDirective.html';



    return directive;
});