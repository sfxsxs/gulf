gulf.controller('effortAppCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService, $window, $sce) {
    console.log("effortAppCtrl");


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.height = $window.innerHeight - 25;
    $scope.height = $scope.height + 'px';
    $scope.width = $window.innerWidth;
    console.log($scope.height);
    console.log($scope.width);
    $scope.effortApp = function () {
        $state.go('EffortApp');
    }
    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || $scope.role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || $scope.role == "27") {
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
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.encryptcode = userData.encryptcode;
    //Live URL =https://gulfkonnect.in/GKPWA_APP/#/login/L6CiRcQuSTjhCsQeXaVM2g../1
    //Testing URL =https://gulfkonnect.in/GKPWA/#/login/
    $scope.iframeURL = $sce.trustAsResourceUrl("https://gulfkonnect.in/GKPWA_APP/#/login/" + $scope.encryptcode + "/1");
    console.log($scope.iframeURL);




})