gulf.controller('AddMechanicNavigationCtrl', function ($scope, $state, AddMechanicService, $ionicPopup, ConverBase64, $rootScope, LoaderService, LoaderService, HeaderService, AppService) {
    //background image handling start

    // $('body').removeClass('home-bg');

    //   $('body').addClass('body-bg-1');

    //background image handling end  

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
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

    console.log("AddMechanicNavigationCtrl");


    $scope.addMechanicDirect = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'SelfClick', '1', { dimension6: 'Self', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $state.go('addMechanicDirect');
        $rootScope.addMechanicNotUploadded = false;
    }
    $scope.refferByRetailer = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ReferredbyRetailerClick', '1', { dimension6: 'ReferredbyRetailer', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $rootScope.referralType = "Retailer";
        $state.go('ReferrByRetailer');
    }
    $scope.refferByMechanic = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ReferredbyMechanicClick', '1', { dimension6: 'ReferredbyMechanic', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $rootScope.referralType = "Mechanic";
        $state.go('AddMechanicReferral');
    }

    $scope.nonmlpMechanic = function () {
        $state.go('NonMlpMechanic');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Add mechanic Type Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});