gulf.controller('HomePageCtrl', function ($scope, $cordovaBarcodeScanner, $ionicPlatform, $cordovaInAppBrowser, NonMlpServices, $ionicPopup, $cordovaCamera, $state, HeaderService, $rootScope, DashboardService, AppService) {
    $('body').addClass('home-bg');
    $('body').removeClass('body-bg-1');

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.data = {};
    $scope.userLanguage = JSON.parse(localStorage.getItem("Language"));
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var language = JSON.parse(localStorage.getItem("swithcLanguage"));
    console.log(language);

    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }

    DashboardService.appMultiData(language).then(function (result) {

        console.log("language" + result.data);

        if (result.Status == true || result.Status == 'true') {

            $scope.localAppLanguage = result.data;
            $scope.selectedLanguage = language;
            // console.log($scope.data.localAppLanguage);
            localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
            localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
        }
    });


    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else {
            $state.go('Dashboard');
        }
    }
    $scope.PendingValidation = function () {
        $state.go('PendingValidationList');
        // var alertPopup = $ionicPopup.alert({
        //     title: '',
        //     template: 'Coming Soon...'
        // });
        //$state.go('UpdateMechanicProfile');
    }

    $scope.addMechanic = function () {
        $state.go('AddMechanic');
    }
    $scope.myProfile = function () {
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }

    $scope.couponCode = function () {
        //$state.go('CouponCode');

    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.mechEarning = function () {
        $state.go('MechEarning');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.gulfCorner = function () {
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
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }

    logoutFunction = function (userId) {
        try {
            HeaderService.logout(userId).then(function (result) {
                if (result.Status == true) {
                    localStorage.removeItem('userData');
                    $state.go('NewLoginForMLPAndNonMLP');
                } else {
                    localStorage.removeItem('userData');
                    $state.go('NewLoginForMLPAndNonMLP');
                }
            });

        } catch (e) {
            localStorage.removeItem('userData');
            $state.go('NewLoginForMLPAndNonMLP');

        }

    }

    // checkMlpOrNonMlp = function () {



    // }

    // checkMlpOrNonMlp();

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


    //header

    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        if ($state.current.name == "Home") {
            ionic.Platform.exitApp();
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

    getHomeBannerFunction = function (userId) {

        DashboardService.getHomeBanner($rootScope.userID).then(function (result) {
            if (result.Status == true && result.data.viewStatus == "No") {
                if (result.data.banner_url == null || result.data.banner_url == "" || result.data.banner_url == undefined) {
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;"></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px">',
                        scope: $scope,

                    });
                } else if (result.data.banner_url != null || result.data.banner_url != "" || result.data.banner_url != undefined) {
                    $rootScope.banner_url = result.data.banner_url;
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;" ></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px" ng-click="goToBannerUrl()">',
                        scope: $scope,
                    });
                }
            }
            /*   DashboardService.appData("2", $rootScope.userData.role_fk_id).then(function (result1) {
                   if (result1.Status == true) {
                       $scope.flashNews = result1.data[0].ma_flash_content;
                   }
       
               });*/
        });
    }


    //Calling the POPUP Start

    try {
        getHomeBannerFunction($rootScope.userID);

    } catch (ex) {

    }
    //Calling the POPUP End  

    // if ($rootScope.viewStatus == true) {
    //     try {
    //         getHomeBannerFunction($rootScope.userID);
    //         $rootScope.viewStatus = false;   
    //     } catch (ex) {

    //     }
    // }

    $scope.closePopup = function () {
        confirmPopup.close();
    };

    $scope.goToBannerUrl = function () {
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


    console.log("HomePageCtrl 123");

    /*  $scope.codeCheckIn = function () {
        $state.go('CouponCode');
    }
*/
    $scope.addMechanic = function () {
        console.log("wwwwwwwww");
        $state.go('AddMechanic');
    }

    $scope.gotoUpdateMechanicProfile = function () {
        $state.go('UpdateMechanicProfile');
    }
    $scope.goToDashBoard = function () {
        $state.go('Dashboard')
    }


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

    var visitorId = localStorage.getItem('visitorId');
    //alert(visitorId);
    // alert($rootScope.userData.usd_mobile);
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
            _paq.push(['setDocumentTitle', "Home Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})