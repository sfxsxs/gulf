gulf.controller('OrderStatusCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService, ConverBase64) {
    //     $('#orderList').DataTable( {
    //    "processing": true,
    //        "destroy": true,
    //        "searching": false,
    //        "bLengthChange": false,
    //        "serverSide": false,
    //        "pageLength": 10
    // });
    console.log('order');


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
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header

    var todayDate = new Date().getDate();

    $("#fromdateOrderStatus").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        var maxDate = new Date();
        console.log(maxDate);
        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todateOrderStatus').datepicker('setStartDate', minDate);
        } else {
            $scope.fromDate = "";
            $('#todateOrderStatus').datepicker('setStartDate', "00-00-0000");
        }



    });

    $("#todateOrderStatus").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdateOrderStatus').datepicker('setEndDate', maxDate);
        } else {
            $scope.toData = "";
            var maxDate = new Date();
            $('#fromdateOrderStatus').datepicker('setEndDate', maxDate);
        }
        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    });


    $scope.orderStatusReportTable = function () {
        console.log($scope.orderNumber);
        console.log($scope.MechIdOrNumber);
        console.log($scope.fromDate);
        console.log($scope.toData);
        if (($scope.orderNumber == "" && $scope.MechIdOrNumber == "" && $scope.fromDate == "" && $scope.toData == "") || ($scope.orderNumber == undefined && $scope.MechIdOrNumber == undefined && $scope.fromDate == undefined && $scope.toData == undefined)) {
            var alertPopup = $ionicPopup.alert({
                template: $scope.data.localAppLanguage.please_select_filter
            });
        } else {
            var mob;
            if ($scope.MechIdOrNumber != "" && $scope.MechIdOrNumber != undefined) {
                mob = $scope.MechIdOrNumber.toString();
                mob = ConverBase64.convertBase64(mob);
            }
            var index = 0;
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
                    "emptyTable": "No results found"
                },
                "ajax": {
                    url: AppService.url + "api_r3/public/getOrderList?userid=" + $rootScope.userID + "&fromdate=" + $scope.fromDate + "&todate=" + $scope.toData + "&searchterm=" + mob + "&orderid=" + $scope.orderNumber + "&roleid=" + $rootScope.userRole,
                    "type": "GET",
                    dataType: "json",
                    contentType: "application/json",
                    error: function (jqXHR, textStatus, errorThrown) {
                        var alertPopup = $ionicPopup.alert({
                            template: "Server not responding ,Please try after some time"
                        });
                    }

                },
                "columns": [
                    /*  {
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
            _paq.push(['setDocumentTitle', "Order Status Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})