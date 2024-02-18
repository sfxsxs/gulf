gulf.controller('OrderHistoryCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService) {
    console.log('order');

    //        $('#orderListHistory').DataTable( {
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
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header

    var todayDate = new Date().getDate();

    $("#fromdate").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        /*  var maxDate = new Date();
          console.log(maxDate);
          var minDate = new Date(e.date.valueOf());
          $('#todate').datepicker('setStartDate', minDate);*/


        var maxDate = new Date();
        console.log(maxDate);
        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todate').datepicker('setStartDate', minDate);
        } else {
            $scope.fromDate = "";
            $('#todate').datepicker('setStartDate', "00-00-0000");
        }



    });

    $("#todate").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        /* var maxDate = new Date(e.date.valueOf());
         $('#fromdate').datepicker('setEndDate', maxDate);*/
        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdate').datepicker('setEndDate', maxDate);
        } else {
            $scope.toData = "";
            var maxDate = new Date();
            $('#fromdate').datepicker('setEndDate', maxDate);
        }

    });


    $scope.orderStatuscheck = function () {
        console.log($scope.orderNumber);
        console.log($scope.fromDate);
        console.log($scope.toData);
        if (($scope.orderNumber == "" && $scope.MechIdOrNumber == "" && $scope.fromDate == "" && $scope.toData == "") || ($scope.orderNumber == undefined && $scope.MechIdOrNumber == undefined && $scope.fromDate == undefined && $scope.toData == undefined)) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_select_filter
            });
        } else {
            var index = 0;
            $('#orderListHistory').DataTable({
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
                    url: AppService.url + "api_r3/public/getOrderList?userid=" + $rootScope.userID + "&fromdate=" + $scope.fromDate + "&todate=" + $scope.toData + "&searchterm=" +
                        "" + "&orderid=" + $scope.orderNumber + "&roleid=" + $rootScope.userRole,
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
                    /*   {
                           "data": "ord_number",
                           "mRender": function (data, type, full) {
                               index = index + 1;
                               return index;
                           }
   
                   },*/
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


    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Order History Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})