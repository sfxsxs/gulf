gulf.controller('CodeCheckinCongratulationCtrl', function ($scope, $state, $rootScope, $ionicPopup, LoaderService, DashboardService, TransactionService, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, HeaderService, AppService) {

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
                    template: result.Message
                });
            }
        });
    }


    //header

    $scope.home = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }
    //footer

    $scope.valid = false;
    $scope.inValid = false;
    $scope.used = false;
    $scope.inactive = false;
    $scope.promoShow = false;
    $scope.amazonShow = false;

    if ($rootScope.TotalValidCodes == 1) {
        $scope.valid = true;
    }
    if ($rootScope.TotalValidCodes == 1 && $rootScope.promocodevalid) {
        $scope.valid = true;
    }
    // if ($rootScope.TotalValidCodes == 1 && $rootScope.amazoncodevalid) {
    //     $scope.valid = true;
    // }

    if ($rootScope.TotalInactiveCodes == 1) {
        $scope.inactive = true;
    }
    if ($rootScope.TotalInactiveCodes == 1 && $rootScope.promocodevalid == false) {
        $scope.inactive = true;
    }
    if ($rootScope.TotalInactiveCodes == 1 && $rootScope.promocodevalid == true) {
        $scope.inactive = true;
    }

    if ($rootScope.TotalInvalidCodes == 1) {
        $scope.inValid = true;
    } 
    if ($rootScope.TotalInvalidCodes == 1 && $rootScope.promocodevalid == false) {
        $scope.inValid = true;
    }
    if ($rootScope.TotalInvalidCodes == 1 && $rootScope.promocodevalid == true) {
        $scope.inValid = true;
    }
   

    if ($rootScope.TotalUsedCodes == 1) {
        $scope.used = true;
    } 
    if ($rootScope.TotalUsedCodes == 1 && $rootScope.promocodevalid == true) {
        $scope.used = true;
    }
    // if ($rootScope.TotalInvalidCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     $scope.inValid = true;
    // }
    // if ($rootScope.TotalInactiveCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     $scope.inactive = true;
    // }
    // if ($rootScope.TotalUsedCodes == 1 && $rootScope.amazoncodevalid == true) {
    //     $scope.used = true;
    // }
    // if ($rootScope.amazoncodevalid === "") {
    //     $scope.amazonShow = false;
    // } else {
    //     $scope.amazonShow = true;

    // }
    if ($rootScope.promocodevalid === "") {
        $scope.promoShow = false;
    } else {
        $scope.promoShow = true;

    }

    $scope.scanNextCode = function () {
        $state.go('QrCode');
    }

    $scope.EnterPromoCode = function () {
        $state.go('AmazonPromoCode');
    }

    try {

        var userData = JSON.parse(localStorage.getItem("userData"));
        if (userData.role_fk_id == "5") {
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
            // DashboardService.getTierList($rootScope.userID).then(function(result){
            //     console.log("getTierList");
            //     console.log(result.Data);
            //          $scope.TierList=result.Data;

            // });

            if (mode != null) {
                if (mode == 'S-oil') {
                    $scope.modevalue = '1';
                    TransactionService.pointSummerySoil($rootScope.userID).then(function (result) {
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
                else if (mode  == 'Gulf') {
                    $scope.modevalue = '0';
                    TransactionService.pointSummeryGulf($rootScope.userID).then(function (result) {
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
                $scope.modevalue = '0';
                TransactionService.pointSummeryGulf($rootScope.userID).then(function (result) {
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
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Code Check In Congratulation Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});