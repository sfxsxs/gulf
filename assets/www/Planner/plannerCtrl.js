gulf.controller('plannerCtrl', function ($scope, $rootScope, $state, ConverBase64, PlannerService, AppService, HeaderService, $ionicPopup, LoaderService, TransactionService, RecommendationService, $ionicHistory) {
    LoaderService.showLoading();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

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

    $scope.roleID = role;
    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
        $scope.mechnaicId = $rootScope.userID;
        $scope.soId = "";
        RecommendationService.getCustomerList($rootScope.userID).then(function (result) {
            LoaderService.hideLoading();
            console.log("cust Data" + result);
            if (result.Status == true) {
                $scope.AvailabelCustomer = result.data;
            } else {
                var msg_code = result.message_code;
                var show_msg = $scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    template: show_msg
                });
            }
        });
    } else if (role == "6" || role == "12" || role == "13" || role == "14" || role == "28" || role == "30" || role == "27") {
        $scope.so = true;
        $scope.mechanicName = $rootScope.soAddCustomer_MechnaicName;
        $scope.mechnaicId = $rootScope.soAddCustomer_MechnaicID;
        $scope.soId = $rootScope.userID;
    }

    /*====== */

    $(document).ready(function (e) {
        $('#plannerNameList').select2({
            dropdownParent: $('#parentplannerNameList')
        });
        $('#vehicalype').select2({
            dropdownParent: $('#vehicalypeParent')
        });
        $('#brandList').select2({
            dropdownParent: $('#brandListParent')
        });
        $('#productList').select2({
            dropdownParent: $('#productListParent')
        });
    });



    /*   ======*/

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
                    template: show_msg
                });
            }
        });
    }


    //header
    console.log("PlannerCtrl");

    LoaderService.hideLoading();
    var todayDate = new Date().getDate();

    $scope.AvailabelVehicalType = [{ ve_type: "Two wheeler", value: "MCO" }, { ve_type: "Passenger Car Motor", value: "PCMO" }, { ve_type: "Commercial Vehicle", value: "DEO" }];

    $scope.vehicalTypeChanged = function () {

        LoaderService.showLoading();


        RecommendationService.getRecommendationsMake($scope.vehicalType).then(function (result) {
            LoaderService.hideLoading();
            $scope.brand = "";
            $scope.modelOfVehical = "";
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelBrand = result.data;

            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    }
    $scope.brandChanged = function () {
        LoaderService.showLoading();
        $scope.modelOfVehical = "";

        RecommendationService.getRecommendationsModelForCustomer($scope.brand, $scope.vehicalType).then(function (result) {
            LoaderService.hideLoading();
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelmodelOfVehical = result.data;
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    }

    $("#AddplannerDate").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        //endDate: "0",
        startDate: '+1d',
        disableTouchKeyboard: true,
        backdrop: 'static',
        keyboard: false

    }).on('changeDate', function (e) {
        e.preventDefault();
        e.stopPropagation();

    });


    $("#fromdatePlannerReport").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        //endDate: "0",
        // startDate: '+1d',
        disableTouchKeyboard: true,
        clearBtn: true


    }).on('changeDate', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var maxDate = new Date();
        console.log(maxDate);
        /* var minDate = new Date(e.date.valueOf());
         $('#todatePlannerReport').datepicker('setStartDate', minDate);*/

        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todatePlannerReport').datepicker('setStartDate', minDate);
        } else {
            $scope.fromdate = "";
            //  $('#todatePlannerReport').datepicker('setStartDate', "00-00-0000");
        }



    });

    $("#todatePlannerReport").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        //endDate: "0",
        startDate: '+1d',
        disableTouchKeyboard: true,
        clearBtn: true


    }).on('changeDate', function (e) {

        e.stopPropagation();

        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdatePlannerReport').datepicker('setEndDate', maxDate);
        } else {
            $scope.todate = "";
        }


    });

    $scope.addPlaneer = function () {
        $rootScope.addplannerback = true;

        if ($scope.name != "" && $scope.name != undefined && $scope.mobile != "" && $scope.mobile != undefined && $scope.servicingDue != "" && $scope.servicingDue != undefined) {
            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.name)) {
                $scope.name = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }

            $scope.mString = ($scope.mobile).toString();
            $scope.cmobileNo = ConverBase64.convertBase64($scope.mString);
            console.log("inside");
            LoaderService.showLoading();
            PlannerService.addPlanner($scope.mechnaicId, $scope.name, $scope.cmobileNo, $scope.servicingDue, $scope.soId, $scope.roleID, $scope.vehicalType, $scope.brand, $scope.modelOfVehical).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);
                if (result.Status == true) {
                    $rootScope.plannerMessage = result.Message;
                    $state.go('AddPlannerSucess');
                } else {
                    $ionicPopup.alert({
                        template: result.Message
                    });

                }

            });

        } else {
            $ionicPopup.alert({
                template: $scope.data.localAppLanguage.please_enter_all_data
            });
        }


    }


    $scope.search = function () {


        console.log($scope.fromdate);
        console.log($scope.plannerNameOrMob);
        //alert($scope.plannerName);
        console.log($scope.todate);
        $scope.cmobileNo = $scope.plannerNameOrMob;
        if ($scope.plannerNameOrMob != undefined) {
            $scope.mString = ($scope.plannerNameOrMob).toString();
            $scope.cmobileNo = ConverBase64.convertBase64($scope.mString);
        }
        if ($scope.plannerName != undefined && $scope.plannerName != "") {
            // alert("inside");
            /* $scope.nString = ($scope.plannerName).toString();
             $scope.cplannername = ConverBase64.convertBase64($scope.nString);*/
            $scope.cplannername = $scope.plannerName;
        }




        if (($scope.plannerNameOrMob == undefined && $scope.fromdate == undefined && $scope.todate == undefined && $scope.plannerName == undefined) || ($scope.mechIdOrMob == "" && $scope.fromdate == "" && $scope.todate == "" && $scope.plannerName == "")) {
            console.log("all empty");
            var alertPopup = $ionicPopup.alert({
                template: $scope.data.localAppLanguage.please_select_filter
            });
            return false;
        }
        if ($scope.plannerNameOrMob == undefined && $scope.fromdate == "" && $scope.todate == "" && $scope.plannerName == undefined) {
            var alertPopup = $ionicPopup.alert({
                template: $scope.data.localAppLanguage.please_select_filter
            });
            return false;
        }
        if ($scope.plannerNameOrMob == undefined) {
            $scope.cmobileNo = "";
        }
        if ($scope.plannerName == undefined) {
            $scope.plannerName = "";
        }

        if ($scope.fromdate == undefined) {
            $scope.fromdate = "";
        }
        if ($scope.todate == undefined) {
            $scope.todate = "";
        }


        var index = 0;
        var token = $rootScope.token;
        $('#plannerList').DataTable({
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
                url: AppService.url + "api_r3/public/plannerReport?mechId=" + $rootScope.userID + "&mobileNo=" + $scope.cmobileNo + "&customerName=" + $scope.cplannername + "&fromDate=" + $scope.fromdate + "&toDate=" + $scope.todate + "&token=" + token,
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
                    "data": "client_name"
                },
                {
                    "data": "mob_no"
                },
                {
                    "data": "created_on"
                },
                {
                    "data": "servicing_due"
                },
                {
                    "data": "servicing_due",
                    "render": function (data, type, full) {

                        var custId = full.cust_pk_id;
                        var plannerDate = data;
                        var editRoute = '#/EditPlanner/' + custId + '/' + plannerDate;
                        return '<a href="' + editRoute + '">' + '<button style="background-color:#f15a22;">Edit</button></a>';


                    }

                }

            ]

        });

    }

    $scope.clickBack = function () {
        $(".datepicker").hide();
        if ($rootScope.addplannerback == true) {
            //  window.location=history.go(-2);
            $ionicHistory.goBack(-1);
        } else {
            window.history.back();
        }

    }

    $scope.AddMorePlanner = function () {
        $state.go('AddPlaneer');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Planner Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});