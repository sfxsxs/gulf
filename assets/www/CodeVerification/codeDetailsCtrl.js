
gulf.controller('CodeDetailsCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, HeaderService, AppService) {


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.Qa = false;
    $scope.otherRole = false;
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
    } else if (role == "21") {
        $scope.Qa = true;
    } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
        $scope.otherRole = true;
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
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header

    $scope.changepassword = function () {
        $state.go('ChangePassword');
    }
    $scope.codeVerification = function () {
        $state.go('CodeVerification');
        /*         var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: "Coming Soon"
                });*/

    }
    console.log($rootScope.codeList[0].QRCode);
    $scope.QRCode = $rootScope.codeList[0].QRCode
    $scope.ProductSegment = $rootScope.codeList[0].ProductDescription
    $scope.ProductSKU = $rootScope.codeList[0].ProductSKUGroup
    $scope.PointsEarned = $rootScope.codeList[0].PointsEarned
    $scope.MechanicID = $rootScope.codeList[0].MechanicID
    $scope.MechanicName = $rootScope.codeList[0].MechanicName
    $scope.MechanicMobile = $rootScope.codeList[0].MechanicMobile
    $scope.status = $rootScope.codeList[0].status
    $scope.QRCode = $rootScope.codeList[0].QRCode
    //$rootScope.codeList[0].pdct_mlp_points;

    /*$('#codeList').DataTable( {
                  "data":$rootScope.codeList,
            "bPaginate": false,
        "info": false,
        "bLengthChange": false,
         "sPaginationType":"full_numbers",
           "iDisplayLength": 5,
          "searching": false,
            "columns": [
                { "data": "QRCode" },
                { "data": "ProductDescription" },
                { "data": "ProductSKU" },
                { "data": "PointsEarned" },
                { "data": "MechanicID" },
                { "data": "MechanicName" },
                { "data": "MechanicMobile" },
                { "data": "status" }
                
            ]
        } );*/

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Code Details Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});