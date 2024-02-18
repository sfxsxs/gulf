gulf.controller("MechDashboardCtrl", function ($scope, $state, $rootScope, ConverBase64, DashboardService, LoaderService, AppService, TransactionService, HeaderService, $ionicPopup) {


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    $scope.couponpoints = "";
    $scope.currenttier = "";
    $scope.othercontestpoints = "";
    $scope.pointsearned = "";
    $scope.tierpoints = "";
    $scope.currentperiod = "";
    $scope.currentachievementCoupon = "";
    $scope.currentachievementVol = "";
    $scope.upgradationtonexttierCoupon = "";
    $scope.upgradationtonexttierVol = "";
    $scope.TierList = [];
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || role == "27") {
            $state.go('Dashboard');
        }
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
        $state.go('CouponCode');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
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
        $state.go('OrderStatus');
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
                    template: result.Message
                });
            }
        });
    }


    //header

    //footer
    $scope.home = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }

    //footer


    //LoaderService.showLoading();
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.user_category == "Loyalty User") {
        LoaderService.showLoading();

        DashboardService.getMemberDashboard($rootScope.userID).then(function (result) {
            console.log("getMemberDashboard");
            console.log(result.data.couponpoints);
            $scope.couponpoints = result.data.couponpoints;
            $scope.currenttier = result.data.currenttier;
            $scope.othercontestpoints = result.data.othercontestpoints;
            $scope.pointsearned = result.data.pointsearned;
            $scope.tierpoints = result.data.tierpoints;

        });

        DashboardService.getMemberTier($rootScope.userID).then(function (result) {
            console.log("getMemberTier");
            LoaderService.hideLoading();
            console.log(result.data.currentachievement.coupon);
            $scope.currentperiod = result.data.currentperiod;
            $scope.currentachievementCoupon = result.data.currentachievement.coupon;
            $scope.currentachievementVol = result.data.currentachievement.vol;
            $scope.upgradationtonexttierCoupon = result.data.upgradationtonexttier.coupon;
            $scope.upgradationtonexttierVol = result.data.upgradationtonexttier.vol;

        });
        DashboardService.getTierList($rootScope.userID).then(function (result) {
            console.log("getTierList");
            console.log(result.Data);
            $scope.TierList = result.Data;

        });

        if (mode != null) {
            if (mode == 'S-oil') {
                $scope.modeProject = mode;
                $scope.modevalue = '1';
                TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                    LoaderService.hideLoading();
                    console.log("summery");
                    console.log(result.Status);
                    if (result != "") {
                        if (result.Status) {
                            console.log(result.data[0]);
                            $scope.pointsEarned = result.data[0].pointsEarned;
                            $scope.pointBalance = result.data[0].pointBalance;
                            $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                            $scope.cashPoint = result.data[0].cashpoints;
                            //alert(result.data[0].tierpoints);
                            $scope.tierPoint = result.data[0].tierpoints;
                            $scope.contentPoint = result.data[0].contestpoints;
                            $scope.LuckyPoint = result.data[0].luckydrawpoints;
                            $scope.promoPoint = result.data[0].promopoints;
        
                        } else {
        
                            $scope.pointsEarned = "";
                            $scope.pointBalance = "";
                            $scope.pointsRedeemed = "";
                            $scope.cashPoint = "";
                            $scope.tierPoint = "";
                            $scope.contentPoint = "";
                            $scope.LuckyPoint = "";
                            $scope.promoPoint = "";
                        }
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: "Something Went Wrong Please , Try Again"
                        });
                    }       
                });
            }
            else if (mode == 'Gulf') {
                $scope.modeProject = mode;
                $scope.modevalue = '0';
                TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                    LoaderService.hideLoading();
                    console.log("summery");
                    console.log(result.Status);
                    if (result != "") {
                        if (result.Status) {
                            console.log(result.data[0]);
                            $scope.pointsEarned = result.data[0].pointsEarned;
                            $scope.pointBalance = result.data[0].pointBalance;
                            $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                            $scope.cashPoint = result.data[0].cashpoints;
                            //alert(result.data[0].tierpoints);
                            $scope.tierPoint = result.data[0].tierpoints;
                            $scope.contentPoint = result.data[0].contestpoints;
                            $scope.LuckyPoint = result.data[0].luckydrawpoints;
                            $scope.promoPoint = result.data[0].promopoints;
        
                        } else {
        
                            $scope.pointsEarned = "";
                            $scope.pointBalance = "";
                            $scope.pointsRedeemed = "";
                            $scope.cashPoint = "";
                            $scope.tierPoint = "";
                            $scope.contentPoint = "";
                            $scope.LuckyPoint = "";
                            $scope.promoPoint = "";
                        }
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: "Something Went Wrong Please , Try Again"
                        });
                    }
                });
            }
        }
        else if (mode == null) {
            console.log(mode);
            $scope.modevalue = '0';
            LoginService.modeChangeApi('0').then(function (result) {
                console.log(result);
    
                if (result.Status == true) {
                    console.log(result.data);
                    $scope.modeProject = result.data;
                    localStorage.setItem("mode", result.data);
                }
            });
    
            TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                LoaderService.hideLoading();
                console.log("summery");
                console.log(result.Status);
                if (result != "") {
                    if (result.Status) {
                        console.log(result.data[0]);
                        $scope.pointsEarned = result.data[0].pointsEarned;
                        $scope.pointBalance = result.data[0].pointBalance;
                        $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                        $scope.cashPoint = result.data[0].cashpoints;
                        //alert(result.data[0].tierpoints);
                        $scope.tierPoint = result.data[0].tierpoints;
                        $scope.contentPoint = result.data[0].contestpoints;
                        $scope.LuckyPoint = result.data[0].luckydrawpoints;
                        $scope.promoPoint = result.data[0].promopoints;
    
                    } else {
    
                        $scope.pointsEarned = "";
                        $scope.pointBalance = "";
                        $scope.pointsRedeemed = "";
                        $scope.cashPoint = "";
                        $scope.tierPoint = "";
                        $scope.contentPoint = "";
                        $scope.LuckyPoint = "";
                        $scope.promoPoint = "";
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: "Something Went Wrong Please , Try Again"
                    });
                }
    
    
            });
        }
    }


    DashboardService.appData("1", $rootScope.userData.role_fk_id).then(function (result) {

        console.log(result.data[0].ma_bgimg);
        if (result.Status == true) {
            $scope.dashboardImg = AppService.url + result.data[0].ma_bgimg;
            console.log($scope.dashboardImg);
        }
        DashboardService.appData("2", $rootScope.userData.role_fk_id).then(function (result1) {
            LoaderService.hideLoading();
            console.log(result1.data[0].ma_flash_content);
            if (result1.Status == true) {
                $scope.flashNews = result1.data[0].ma_flash_content;
            }

        });
    });

    var visitorId = localStorage.getItem('visitorId');
    var u = encodeURI('https://analytics.firsthive.com/piwik.php?_cvar={"5":["page","Dashboard"]}&action_name=View settings&idsite=123&rand=351459&h=18&m=13&s=3&rec=1&apiv=1&_id=' + visitorId + '&_idvc=19&res=320×480&');

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
            _paq.push(['setDocumentTitle', "Mechanic Dashboard Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});