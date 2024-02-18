gulf.controller('ProductEarningDetailCtrl', function ($scope, AppService, $state, $rootScope, HeaderService, TransactionService, $ionicPopup) {

    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
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

    $(document).ready(function (e) {
        $('#brand').select2({ dropdownParent: $('#parentBrand') });
        $('#color').select2({ dropdownParent: $('#colorParent') });
    });

    if ($rootScope.ProductEarningDetailData == "MCO") {
        $scope.prdocutDetailHeader = $scope.data.localAppLanguage.two_wheeler_engine_oil;
    }
    if ($rootScope.ProductEarningDetailData == "PCMO") {
        $scope.prdocutDetailHeader = $scope.data.localAppLanguage.passenger_car_motor_oil;
    }
    if ($rootScope.ProductEarningDetailData == "DEO") {
        $scope.prdocutDetailHeader = $scope.data.localAppLanguage.commercial_vehicle_oil;
    }


    TransactionService.getProductPackColor($rootScope.ProductEarningDetailData).then(function (result) {
        console.log(result.Status);
        if (result.Status) {
            //console.log(result.data[0]);
            $scope.AvailabelColor = result.data;
        } else {
        }


    });

    TransactionService.getBrandName($rootScope.ProductEarningDetailData).then(function (result) {
        console.log(result.Status);
        if (result.Status) {
            //console.log(result.data[0]);
            $scope.AvailabelBrand = result.Data;
        } else {
        }


    });
    var token = $rootScope.token;
    $(document).ready(function (e) {
        $('#productEarning').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": $scope.data.localAppLanguage.no_result_found
            },
            "ajax": {
                url: AppService.url + "api_r3/public/getProductList?segmentName=" + $rootScope.ProductEarningDetailData + "&token=" + token,
                "type": "GET",
                dataType: "json",
                contentType: "application/json",
                error: function (jqXHR, textStatus, errorThrown) {
                    var alertPopup = $ionicPopup.alert({
                        template: $scope.data.localAppLanguage.server_not_responding_please_try_after_sometime
                    });
                }

            },
            "columns": [
                {
                    "data": "imagePath",
                    "mRender": function (data, type, full) {
                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                        return '<img class="img-responsive" src="' + AppService.url + data + '" alt="Gulf">';
                    }
                },
                {
                    "data": "pdct_name"
                },
                {
                    "data": "pdct_sku"
                },
                {
                    "data": "pdct_mlp_points"
                }

            ]

        });
    });



    $scope.getProductEarningDetails = function () {
        // alert($scope.selectedColor);
        var token = $rootScope.token;
        $('#productEarning').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": $scope.data.localAppLanguage.no_result_found
            },
            "ajax": {
                url: AppService.url + "api_r3/public/getProductList?segmentName=" + $rootScope.ProductEarningDetailData + "&color=" + $scope.selectedColor + "&brandName=" + $scope.selectedBrand + "&token=" + token,
                "type": "GET",
                dataType: "json",
                contentType: "application/json",
                error: function (jqXHR, textStatus, errorThrown) {
                    var alertPopup = $ionicPopup.alert({
                        template: $scope.data.localAppLanguage.server_not_responding_please_try_after_sometime
                    });
                }

            },
            "columns": [
                {
                    "data": "imagePath",
                    "mRender": function (data, type, full) {
                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                        return '<img class="img-responsive" src="' + AppService.url + data + '" alt="Gulf">';
                    }
                },
                {
                    "data": "pdct_name"
                },
                {
                    "data": "pdct_sku"
                },
                {
                    "data": "pdct_mlp_points"
                }

            ]

        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Product Earning Details Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})