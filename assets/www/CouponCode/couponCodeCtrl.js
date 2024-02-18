gulf.controller('CouponCodeCtrl', function ($scope, LoginService, $rootScope, ConverBase64, $ionicPopup, $state, HeaderService, AppService, PanUpdateService) {


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
        if($scope.modeProject == 'Gulf'){
            // PanUpdateService.showPANPopup(userData.usr_pk_id).then(function(response){
            //     if(response.data.Status == true){
            //         $state.go('PanUpdatePopup');
            //     }
            // })
        }

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
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header

    console.log("Coupon Code");

    $scope.soRole = false;

    if ($rootScope.userRole == "6" || role == "27") {
        $scope.soRole = true;
    }
    $scope.codeCheckIn = function () {
        if ($rootScope.userRole == "6" || role == "27") {

            $state.go('CodeCheckIn');
        } else if (userData.user_category == "Loyalty User") {
            $rootScope.CodeCheckInId = $rootScope.userID
            $state.go('QrCode');
        }
    }


    $scope.codeVerification = function () {
        $state.go('CodeVerification');
    }


    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Coupon Code Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});