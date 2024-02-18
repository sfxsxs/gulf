gulf.controller('MechHomePageCtrl', function ($scope, $state, AddMechanicService, $rootScope, HeaderService, NonMlpServices, $cordovaInAppBrowser, TransactionService, $ionicPopup, 
    $ionicPlatform, DashboardService, AppService, LoginService, DreamIncomeService, LoaderService, CodeCheckInService) {
    //  $('body').removeClass('bodyImg');
    // $('body').addClass('home-bg');
    $('body').removeClass('body-bg-1');
    $('body').addClass('home-bg');

    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.userLanguage = JSON.parse(localStorage.getItem("Language"));
    $scope.data = {};
    $rootScope.panPopupDismiss = false;
    $scope.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.data.language = localStorage.getItem("swithcLanguage");
    if($scope.data.language != 'undefined'){
        $scope.data.language = JSON.parse($scope.data.language);
    }else{
        $scope.data.language = "English";
        localStorage.setItem("swithcLanguage", JSON.stringify($scope.data.language));
        console.log($scope.data.language)
        DashboardService.appMultiData("English").then(function (result) {
            console.log(localStorage.getItem("swithcLanguage"))
            console.log("language" + result.data);
            console.log($scope.data.language)
            if (result.Status == true || result.Status == 'true') {
                if($scope.data.language == null || $scope.data.language == undefined){
                    $scope.data.language = "English";
                    $scope.localAppLanguage = result.data;
                    $scope.selectedLanguage = "English";
                }
                
                localStorage.setItem("swithcLanguage", JSON.stringify($scope.data.language));
                localStorage.setItem("userSelectedLanguage", JSON.stringify($scope.data.language));
                localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));

            }

        });
    }
    console.log($scope.data.language);
    $scope.data.mode = localStorage.getItem("mode");
    $scope.modeProject = $scope.data.mode;
    console.log($scope.modeProject);

    $scope.selectedLanguage = "";
    //$scope.data.language=userData.lang_name
    $scope.currentTier = userData.current_tier;
    $scope.intervalId;
    $scope.block_status = "";

    if (userData && userData.user_category == "Loyalty User") {
        TransactionService.pointSummerySoil($rootScope.userID, "").then(function (result) {
            console.log("summery");
            console.log(result.Status);
            if (result.Status) {
                console.log(result.data[0]);
                $scope.pointBalance = result.data[0].pointBalance;
                $scope.pointsEarned = result.data[0].pointsEarned;
                $scope.pointBalanceRemaining = $scope.pointBalance;
                $scope.cashpoints = result.data[0].cashpoints;
            } else {

                $scope.pointsEarned = "";
                $scope.pointBalance = "";
                $scope.pointsRedeemed = "";
                $scope.pointBalanceRemaining = "";
                $scope.cashpoints = "";
            }
        });
        // if ($scope.data.mode != null) {
        //     if ($scope.data.mode == 'S-oil') {
        //         $scope.modevalue = '1';
        //         TransactionService.pointSummerySoil($rootScope.userID, $scope.modevalue).then(function (result) {
        //             console.log("summery");
        //             console.log(result.Status);
        //             if (result.Status) {
        //                 console.log(result.data[0]);
        //                 $scope.pointBalance = result.data[0].pointBalance;
        //                 $scope.pointBalanceRemaining = $scope.pointBalance;
        //                 $scope.cashpoints = result.data[0].cashpoints;
        //             } else {
        
        //                 $scope.pointsEarned = "";
        //                 $scope.pointBalance = "";
        //                 $scope.pointsRedeemed = "";
        //                 $scope.pointBalanceRemaining = "";
        //                 $scope.cashpoints = "";
        //             }
        //         });
        //     }
        //     else if ($scope.data.mode  == 'Gulf') {
        //         $scope.modevalue = '0';
        //         TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
        //             console.log("summery");
        //             console.log(result.Status);
        //             if (result.Status) {
        //                 console.log(result.data[0]);
        //                 $scope.pointBalance = result.data[0].pointBalance;
        //                 $scope.pointBalanceRemaining = $scope.pointBalance;
        //                 $scope.cashpoints = result.data[0].cashpoints;
        //             } else {
        
        //                 $scope.pointsEarned = "";
        //                 $scope.pointBalance = "";
        //                 $scope.pointsRedeemed = "";
        //                 $scope.pointBalanceRemaining = "";
        //                 $scope.cashpoints = "";
        //             }
        //         });
        //     }
        // }
        // else if ($scope.data.mode == null) {
        //     $scope.modevalue = '0';
        //     TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
        //         console.log("summery");
        //         console.log(result.Status);
        //         if (result.Status) {
        //             console.log(result.data[0]);
        //             $scope.pointBalance = result.data[0].pointBalance;
        //             $scope.pointBalanceRemaining = $scope.pointBalance;
        //             $scope.cashpoints = result.data[0].cashpoints;

        //         } else {
    
        //             $scope.pointsEarned = "";
        //             $scope.pointBalance = "";
        //             $scope.pointsRedeemed = "";
        //             $scope.pointBalanceRemaining = "";
        //             $scope.cashpoints = "";
        //         }
        //     });
        // }
    }

    //call app language api to convert the text
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
    // console.log($scope.data.language);
    // DashboardService.appMultiData($scope.data.language).then(function (result) {

    //     console.log("language" + result.data);
    //     if (result.Status == true || result.Status == 'true') {
    //         $scope.localAppLanguage = result.data;
    //         $scope.selectedLanguage = $scope.data.language;
    //         console.log($scope.data.language);
    //         // console.log($scope.data.localAppLanguage);
    //         localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
    //         localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
    //     }
    // });

    $scope.switchLanguage = function (newLang) {

        console.log(newLang);
        DashboardService.appMultiData(newLang).then(function (result) {
            console.log(result)
            // console.log("language" + JSON.stringify(result.data));
            if (result.Status == true || result.Status == 'true') {
                $scope.localAppLanguage = result.data;
                $scope.selectedLanguage = newLang;
                $scope.data.language = newLang;
                // $scope.$apply();
                $rootScope.localAppLanguage1 = $scope.localAppLanguage;
                

                console.log($scope.localAppLanguage);
                
                localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
                localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
                localStorage.setItem("userSelectedLanguage", JSON.stringify($scope.selectedLanguage));
            }

        });

        // if ($scope.data.mode == 'Gulf') {
        //     modevalue = '0';
        //     console.log(modevalue);
        //     modeChangeApiCall(modevalue);
        // }
        // if ($scope.data.mode == 'S-oil') {
        //     modevalue = '1';
        //     console.log(modevalue);
        //     modeChangeApiCall(modevalue);
        // }
    }
    // Handle the earlier version of app with multilingual.
    if ($scope.data.language == null || $scope.data.language == undefined) {
        console.log($scope.data.language);
        $scope.selectedLanguage = userData.lang_name;
        // $scope.switchLanguage();
        DashboardService.appMultiData($scope.selectedLanguage).then(function (result) {

            console.log("language" + result.data);
            if (result.Status == true || result.Status == 'true') {
                $scope.localAppLanguage = result.data;
                $scope.selectedLanguage = $scope.data.language;
                
                // console.log($scope.data.localAppLanguage);
                localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
                localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
                localStorage.setItem("userSelectedLanguage", JSON.stringify($scope.selectedLanguage));
            }
        });
    }else{
        console.log("line 143---",$scope.data.language);
        $scope.selectedLanguage = $scope.data.language;
    }
    // else{
    //     DashboardService.appMultiData($scope.selectedLanguage).then(function (result) {

    //         // console.log("language" + JSON.stringify(result.data));
    //         if (result.Status == true || result.Status == 'true') {
    //             $scope.data.localAppLanguage = result.data;

    //             console.log(JSON.stringify($scope.data.localAppLanguage));
    //             localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
    //             localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
    //         }

    //     });
    // }

    if ($scope.data.mode  != null) {
        if ($scope.data.mode  == 'S-oil') {
            $scope.modeProject = $scope.data.mode;
        }
        else if ($scope.data.mode  == 'Gulf') {
            $scope.modeProject = $scope.data.mode;
        }
    }
    else if ($scope.data.mode  == null) {
        console.log($scope.data.mode);
        LoginService.modeChangeApi('0').then(function (result) {
            console.log(result);

            if (result.Status == true) {
                console.log(result.data);
                $scope.modeProject = result.data;
                localStorage.setItem("mode", result.data);
            }
        });
    }


    AddMechanicService.getLanguages().then(function (result) {

        console.log("Lang" + result);
        if (result.Status == true) {
            $scope.AvailabelLanguage = result.Data;
        }
    });

    DashboardService.notificationCount($rootScope.userID).then(function (result) {
        if (result.Status) {
            if (result.Data.NotificationCount > 0) {

                $scope.shownotification = true;
                $scope.notificationCount = result.Data.NotificationCount;
            } else {
                $scope.shownotification = false;
            }

        } else {

        }


    });



    var confirmPopup;
    getHomeBannerFunctionForMechanic = function (userId) {

        DashboardService.getHomeBanner($rootScope.userID).then(function (result) {
            if (result.Status == true && result.data.viewStatus == "No") {
                if (result.data.banner_url == null || result.data.banner_url == "" || result.data.banner_url == undefined) {
                    // console.log("if condition");
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    console.log($scope.banner_url);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;"></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px">',
                        scope: $scope,

                    });
                } else if (result.data.banner_url != null || result.data.banner_url != "" || result.data.banner_url != undefined) {
                    // console.log("else condition");             
                    $rootScope.banner_url = result.data.banner_url;
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    console.log($scope.banner_url);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;" ></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px" ng-click="goToBannerUrl()">',
                        scope: $scope,
                    });
                }
            }
            else {
                // console.log(result.data.banner_url);
                // if (result.data.banner_url == null || result.data.banner_url == "" || result.data.banner_url == undefined) {
                //     console.log("if condition");
                //     $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                //     console.log($scope.dashboardImg);
                //     console.log($scope.banner_url);
                //     confirmPopup = $ionicPopup.show({
                //         template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;"></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px">',
                //         scope: $scope,

                //     });
                // } else if (result.data.banner_url != null || result.data.banner_url != "" || result.data.banner_url != undefined) {
                //     console.log("else condition");
                //     $rootScope.banner_url = result.data.banner_url;
                //     $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                //     console.log($scope.dashboardImg);
                //     console.log($scope.banner_url);
                //     confirmPopup = $ionicPopup.show({
                //         template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;" ></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px" ng-click="goToBannerUrl()">',
                //         scope: $scope,
                //     });
                // }
            }
        });
    }

    //Calling the POPUP Start

    try {
        //get current tier
        // DashboardService.getMemberDashboard($rootScope.userID).then(function(result){
        //          $scope.currentTier=result.data.currenttier;
        // });
        //  getHomeBannerFunctionForMechanic($rootScope.userID);

    } catch (ex) {

    }
    //Calling the POPUP End  

    //  if ($rootScope.viewStatus == true) {
    //      try {
    //          getHomeBannerFunctionForMechanic($rootScope.userID);
    //          $rootScope.viewStatus = false;   
    //      } catch (ex) {

    //      }
    //  }

    $scope.closePopup = function () {
        confirmPopup.close();
    };

    try {
        if (userData && userData.user_category == "Loyalty User") {
            console.log("$rootScope.viewStatus----", $rootScope.viewStatus);

            if ($rootScope.viewStatus == true) {
                try {
                    // $scope.intervalId = setInterval(() => getHomeBannerFunctionForMechanic($rootScope.userID),5000);
                    getHomeBannerFunctionForMechanic($rootScope.userID);
                    // $rootScope.viewStatus = false;
                } catch (ex) {

                }
            }
        }
        DashboardService.getMemberDashboard($rootScope.userID).then(function (result) {
            $scope.currentTier = result.data.currenttier;
        });

    } catch (err) {

    }

    $scope.goToBannerUrl = function () {
        // alert($rootScope.banner_url);


        var options = {
            location: 'yes'
        };

        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowser.open($rootScope.banner_url, '_blank', options)
                .then(function (event) {
                    // success
                })
                .catch(function (event) {
                    // error
                });
        }, false);

    }



    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
        // $(".datepicker").hide();
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        if ($state.current.name == "MechanicHome") {
            ionic.Platform.exitApp()
        }

    });

    $scope.couponCode = function () {
        // $state.go('QrCode');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }

    $scope.planner = function () {
        $state.go('AddPlaneer');
    }
    $scope.dashboard = function () {
        $state.go('MechDashboard');
    }
    $scope.dreamIncome = function () {

        var alertPopup = $ionicPopup.alert({
            template: "Coming Soon ......."
        });
        //NOTE: below code need to enable once dream income need to enable

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
        //   });
        //   }

        //   }else if(role == "6"){
        //       $state.go('MechanicValidetaDreamIncome');
        //   }




    }

    logoutFunction = function (userId) {
        try {
            HeaderService.logout(userId).then(function (result) {
                if (result.Status == true) {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('mode');
                    // clearInterval($scope.intervalId);
                    $state.go('NewLoginForMLPAndNonMLP');
                } else {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('mode');
                    // clearInterval($scope.intervalId);
                    $state.go('NewLoginForMLPAndNonMLP');
                }
            });

        } catch (e) {
            localStorage.removeItem('userData');
            localStorage.removeItem('mode');
            // clearInterval($scope.intervalId);
            $state.go('NewLoginForMLPAndNonMLP');

        }

    }

    // checkMlpOrNonMlp = function () {



    // }

    try {
        NonMlpServices.getMechanicStatus($rootScope.userID).then(function (result) {
            if (result.Status) {
                if (result.mecValidationstatus == true) {
                    logoutFunction($rootScope.userID);
                }
            }
        });

    } catch (e) {
        console.log("getMechanicStatus service error");

    }



    // $(document).ready(function (e) {
    //     console.log("document ready");
    //     checkMlpOrNonMlp();

    // });

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

    //footer

    $scope.goTofacebook = function () {
        var options = {
            location: 'yes'
        };

        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowser.open('https://m.facebook.com/gulfmastermechanic/  ', '_blank', options)
                .then(function (event) {
                    // success
                })
                .catch(function (event) {
                    // error
                });
        }, false);
    }

    $scope.modeChange = function (modevalue) {
        //   console.log(modeProject);

        if (modevalue == 'Gulf') {
            modevalue = '0';
            console.log(modevalue);
            modeChangeApiCall(modevalue);
        }
        if (modevalue == 'S-oil') {
            modevalue = '1';
            console.log(modevalue);
            modeChangeApiCall(modevalue);
        }
    }

    modeChangeApiCall = function (mode) {
        LoginService.modeChangeApi(mode).then(function (result) {
            console.log(result);

            if (result.Status == true) {
                console.log(result.data);
                $scope.modeProject = result.data;
                localStorage.setItem("mode", result.data);
            }
        });
    }

    $scope.goTOchatBoxHome = function () {
        if (AppService.enableTracking) {

            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ChaticonpostloginClick', '1', { dimension6: 'Chaticonpostlogin', dimension7: "" }]);
        }
        $state.go('ChatBootPostLogin');
    }


    var visitorId = localStorage.getItem('visitorId');
    //alert(visitorId);
    //alert($rootScope.userData.usd_mobile);
    var u = encodeURI('https://analytics.firsthive.com/piwik.php?_cvar={"3":["Mobile","' + $rootScope.userData.usd_mobile + '"]}&action_name=View settings&idsite=123&rand=351459&h=18&m=13&s=3&rec=1&apiv=1&_id=' + visitorId + '&_idvc=19&res=320×480&');
    try {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url = u;
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);
    } catch (err) {
        console.log(err);

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Mechanical Home Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

    try {
        //First time user login Message
        //    if($rootScope.applogincount==0 ||$rootScope.applogincount=="0"){
        //     $rootScope.applogincount==2;
        //     var alertPopup = $ionicPopup.alert({
        //         template: "Congratulations! Now you are part of Gulf Master Mechanic Loyalty Program. Check out program brochure to know your extra earning !"
        //     });
        //    }

    } catch (err) {

    }

});