
gulf.controller('TermandConditionCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService, DashboardService) {
    console.log("TermandConditionCtrl");

    $scope.mech = false;
    $scope.so = false;
    $scope.loyality = false;
    $scope.regular = false;
    $scope.customer = false;
    $scope.tc = "";
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.user_category == "Loyalty User") {
        $scope.loyality = true;
        $scope.regular = false;
        $scope.customer = false;

    }
    if (userData && userData.user_category == "Regular User") {
        $scope.loyality = false;
        $scope.regular = true;
        $scope.customer = false;

    }
    if (userData && userData.user_category == "Channel Partner") {
        $scope.loyality = false;
        $scope.regular = false;
        $scope.customer = true;

    }
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;

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
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }
    $scope.acceptTermandCondtion = function () {
        var termandConditionAccess = document.getElementById("agreeForTandC").checked;
        if (termandConditionAccess == true) {

            $scope.tc = "1"
            DashboardService.tcupdate($rootScope.userID, $scope.tc).then(function (result) {
                if (result.Status) {
                } else {

                }
                var userData = JSON.parse(localStorage.getItem("userData"));
                if (userData && userData.user_category == "Loyalty User") {
                    $state.go('MechanicHome');

                }
                if (userData && userData.user_category == "Regular User") {

                    $state.go('NonMlpHome');

                }
                if (userData && userData.user_category == "Channel Partner") {

                    $state.go('CPHome');
                }


            });

        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Its important you read terms and conditions and agree to it in the checkbox given below"
            });
        }

    }


    //header

})