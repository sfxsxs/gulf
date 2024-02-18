gulf.controller("MechProfileEarningCtrl", function ($scope, $state, $http, LoaderService, DashboardService, AddMechanicService, $rootScope, LoginService, UpdateMechanicProfileService, $ionicPopup, $stateParams, ConverBase64, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer) {
    $("#ui-datepicker-div").remove();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    $scope.data = {};
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    $scope.usd_code = "";
    var role = $rootScope.userData.role_fk_id;
    $scope.distributorShow = false;
    $scope.region = "";
    $rootScope.GOILRetID = "";
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    //$scope.selectedDistributor=""

    //  $scope.selectedDistributor.distributorname=""


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }
    $scope.all = true;

    $scope.radioChange = function () {
        // alert($scope.data.purchaseType);
        if ($scope.data.purchaseType == "Distributor") {
            $scope.distributorShow = true;
        } else {
            $scope.distributorShow = false;
        }

    }


    //header
    $scope.getselectval = function () {
        //  alert($scope.selectedDistributor.distributorname);
        //  alert($scope.selectedDistributor.distributorcode);
        // $scope.selectedvalues= 'Name: ' + $scope.selectedDistributor.distributorname + ' Id: ' + $scope.selectedDistributor.distributorcode;
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

    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }

    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myOrder = function () {
        $state.go('MyOrder');
    }

    //header
    $(document).ready(function (e) {

        $('#areavalidation').select2({
            dropdownParent: $('#areavalidationParent')
        });
        $('#langValidate').select2({
            dropdownParent: $('#langValidateParent')
        });

    });

    $scope.areaNotAvailable = false;

    console.log($stateParams.id);
    //alert($stateParams.id);
    var userIDToValidateMech = ConverBase64.convertBase64($stateParams.id);

    DashboardService.getMemberDashboard(userIDToValidateMech).then(function (result) {
        console.log("getMemberDashboard");
        console.log(result.data.couponpoints);
        $scope.couponpoints = result.data.couponpoints;
        $scope.currenttier = result.data.currenttier;
        $scope.othercontestpoints = result.data.othercontestpoints;
        $scope.pointsearned = result.data.pointsearned;
        $scope.tierpoints = result.data.tierpoints;

    });

    DashboardService.getMemberTier(userIDToValidateMech).then(function (result) {
        console.log("getMemberTier");
        LoaderService.hideLoading();
        console.log(result.data.currentachievement.coupon);
        $scope.currentperiod = result.data.currentperiod;
        $scope.currentachievementCoupon = result.data.currentachievement.coupon;
        $scope.currentachievementVol = result.data.currentachievement.vol;
        $scope.upgradationtonexttierCoupon = result.data.upgradationtonexttier.coupon;
        $scope.upgradationtonexttierVol = result.data.upgradationtonexttier.vol;

    });
    DashboardService.getTierList(userIDToValidateMech).then(function (result) {
        console.log("getTierList");
        console.log(result.Data);
        $scope.TierList = result.Data;

    });

    $scope.viewProfile = function () {
        $rootScope.mechProfileBySO = userIDToValidateMech;
        $state.go('MechProfileLink')

    }




    $scope.clickBack = function () {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        window.history.back();
    }

});