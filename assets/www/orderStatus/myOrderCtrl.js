gulf.controller('MyOrderCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService) {
    console.log("MyOredrCtrl");

    //     $('#orderList').DataTable( {
    //    "processing": true,
    //        "destroy": true,
    //        "searching": false,
    //        "bLengthChange": false,
    //        "serverSide": false,
    //        "pageLength": 10
    // });
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
                var msg_code = result.message_code;
                var show_msg = $scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: show_msg
                });
            }
        });
    }


    //header

    

    $scope.orderStatuscheck = function () {
        console.log($scope.orderNumber);

        if ($scope.orderNumber == "" || $scope.orderNumber == undefined) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_enter_order_number
            });
        } else {
            var token = $rootScope.token;
            $('#orderList').DataTable({
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
                    url: AppService.url + "api_r3/public/getOrderList?userid=" + $rootScope.userID + "&fromdate=" + $scope.fromDate + "&todate=" + $scope.toData + "&searchterm=" + "" + "&orderid=" + $scope.orderNumber + "&roleid=" + $rootScope.userRole + "&token=" + token,
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
                        "data": "ord_number"
                    },
                    {
                        "data": "cart_prod_name"
                    },
                    {
                        "data": "status_name"
                    },
                    {
                        "data": "total_points_redeemed",
                        "render":function(data,type,full){
                            if(data== "" || data == null){
                                return 0;
                            }else{
                                return data;
                            }
                        }
                    },
                    {
                        "data": "points_redeemed_excl_tax",
                        "render":function(data,type,full){
                            if(data== "" || data == null){
                                return 0;
                            }else{
                                return data;
                            }
                        }
                    },
                    {
                        "data": "tds_payable",
                        "render":function(data,type,full){
                            if(data== "" || data == null){
                                return 0;
                            }else{
                                return data;
                            }
                        }
                    }

                ]

            });

        }
    }
    $scope.orderHistory = function () {
        $state.go('OrderHistory');
    }

    // $scope.orderStatuscheck();
})