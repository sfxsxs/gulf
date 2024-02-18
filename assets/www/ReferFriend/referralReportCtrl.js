gulf.controller('referralReportCtrl', function ($scope, $ionicPopup, $rootScope, AddMechanicService, ReferFriendService, $state, ConverBase64, HeaderService, LoaderService, AppService) {

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

    var area = userData.area_name;
    var city = userData.city_name;
    var state = userData.state_name;
    var usertype = userData.user_category;
    var mechtype = userData.user_type;
    var userId = userData.usr_pk_id;


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }

    $scope.refer = function () {
        $state.go('AddReferFriend');
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





    $scope.referlReport = function () {
        $('#ReferralSatusReport').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": $scope.data.localAppLanguage.no_result_found
            },
            "ajax": {
                url: AppService.url + "api_r3/public/referalreport?state=" + state + "&userId=" + userId + "&city=" + city + "&area=" + area + "&usertype=" + usertype + "&mechtype=" + mechtype,
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
                    "data": "mobile"
                },
                {
                    "data": "refered_name"  //reffering mechnic name required 
                },
                {
                    "data": "point_credited_amount"  //reffering mechnic name required 
                },
                {
                    "data": "refered_on"
                },
                {
                    "data": "milestone1_points"  //reffering mechnic name required 
                },
                {
                    "data": "milestone2_points"  //reffering mechnic name required 
                },


                {
                    "data": "date_of_first_scan" //date of first scan required
                },
                {
                    "data": "date_of_second_mileestone" //date of second mileestone required
                },


                // {
                //     "data": "user_category"
                // },
                // {
                //     "data": "user_subcategory"
                // },
                // {
                //     "data": "refering_region"
                // },
                // {
                //     "data": "refeing_statename"
                // },
                // {
                //     "data": "referred_city"
                // },

            ]

        });

    }

    $(document).ready(function () {
        $scope.referlReport();
    })


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Refer Friend Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})