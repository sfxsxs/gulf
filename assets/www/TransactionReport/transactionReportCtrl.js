gulf.controller("TransactionReportCtrl", function ($scope, $rootScope, $http, TransactionService, AppService, $state, HeaderService, $ionicPopup, $ionicPlatform, AddMechanicService, ConverBase64, LoaderService) {

    //background image handling start

    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    //         $('#transactionReportTable').DataTable( {
    //        "processing": true,
    //        "destroy": true,
    //        "searching": false,
    //        "bLengthChange": false,
    //        "serverSide": false,
    //        "pageLength": 10
    // });

    //background image handling end     

    //header
    $scope.data = {};
    $scope.mech = false;
    $scope.so = false;
    $scope.showAh = false;
    $scope.showTh = false
    $scope.showSo = false;
    $scope.searchByCode = "";
    $scope.searchByBenifit = "";
    var selectedSOId = "";
    var selecteduserThId = "";
    var selecteduserAHId = "";
    $scope.showTransactionPoints = false;
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
        AddMechanicService.getAreaForSO("", "", "", $rootScope.userID).then(function (result) {
            //console.log(result);

            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea)
            console.log($scope.AvailabelArea.length);
        });
    }
    if (role == "14") {
        //Th login
        $scope.showAh = false;
        $scope.showTh = false
        $scope.showSo = true;
    } else if (role == "13") {
        //Ah login
        $scope.showAh = false;
        $scope.showTh = true
        $scope.showSo = true;
    } else if (role == "12" || role == "28" || role == "30") {
        //rh login
        $scope.showAh = true;
        $scope.showTh = true
        $scope.showSo = true;
    }


    if ($scope.mech == false && $scope.so == false) {
        LoaderService.showLoading();
        if (role == "14") {
            //Th login
            AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelSo = result.data;


                }
            });

        } else if (role == "13") {
            //Ah login
            AddMechanicService.getUsers(role, $rootScope.userID, "14").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelTH = result.data;
                }
            });
            AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelSo = result.data;


                }
            });

        } else if (role == "12" || role == "28" || role == "30") {
            //rh login

            AddMechanicService.getUsers(role, $rootScope.userID, "13").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelAH = result.data;
                }
            });


            AddMechanicService.getUsers(role, $rootScope.userID, "14").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelTH = result.data;
                }
            });
            AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
                LoaderService.hideLoading();
                console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
                if (result.Status == true) {
                    // $scope.AvailabelAH = result.data;
                    $scope.AvailabelSo = result.data;


                }
            });
        };

    }

    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6") {
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

    $scope.data = {};


    console.log("transaction");
    $scope.mech = false;
    $scope.so = false;

    var role = $rootScope.userData.role_fk_id;
    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6") {
        $scope.so = true;
    }

    var todayDate = new Date().getDate();

    /*    $("#fromdate").datepicker({
            autoclose: true,
            todayHighlight: false,
            format: "dd-mm-yyyy",
            endDate: "0",
            //startDate: '1d',
            disableTouchKeyboard: true

        }).on('changeDate', function (e) {});


        $("#todate").datepicker({
            autoclose: true,
            todayHighlight: false,
            format: "dd-mm-yyyy",
            endDate: "0",
            //startDate: '1d',
            disableTouchKeyboard: true

        }).on('changeDate', function (e) {});*/


    $("#fromdateTransactionReport").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        var maxDate = new Date();
        console.log(maxDate);
        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todateTransactionReport').datepicker('setStartDate', minDate);
        } else {
            $scope.fromdate = "";
            $('#todateTransactionReport').datepicker('setStartDate', "00-00-0000");
        }




    });

    $("#todateTransactionReport").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdateTransactionReport').datepicker('setEndDate', maxDate);
        } else {
            $scope.todate = "";
            var maxDate = new Date();
            $('#fromdateTransactionReport').datepicker('setEndDate', maxDate);
        }

        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    });
    /*  $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
           $(".datepicker-days").hide();
           $("#todateTransactionReport").css("display","none");
      });*/



    $scope.search = function () {
        console.log($scope.fromdate);
        console.log($scope.data.mechIdOrMob);
        console.log($scope.todate);
        console.log($scope.data.selectedArea);
        if ($scope.data.mechIdOrMob == undefined) {
            $scope.data.mechIdOrMob = "";
        }
        var index = 0;
        var token = $rootScope.token;
        /*  if (($scope.data.mechIdOrMob == undefined && $scope.fromdate == undefined && $scope.todate == undefined && $scope.data.selectedArea == undefined) || ($scope.data.mechIdOrMob == "" && $scope.fromdate == "" && $scope.todate == "" && $scope.data.selectedArea == "")) {
              console.log("all empty");
              var alertPopup = $ionicPopup.alert({
                  title: '<b> Error </b>',
                  template: "Please Select the filter"
              });
              return false;
          }*/
        if ($scope.mech != true) {
            $('#transactionReportTable').DataTable({
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
                    url: AppService.url + "api_r3/public/transactionReport?userId=" + $rootScope.userID + "&fromDate=" + $scope.fromdate + "&toDate=" + $scope.todate + "&mechIdOrMob=" + $scope.data.mechIdOrMob + "&areaName=" + $scope.data.selectedArea + "&soFilter=" + selectedSOId + "&thFilter=" + selecteduserThId + "&ahFilter=" + selecteduserAHId + "&code=" + $scope.searchByCode + "&benefittype=" + $scope.searchByBenifit + "&token=" + token + "&oem=" + "",
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
                        "data": "mechCode",
                        "mRender": function (data, type, full) {
                            if (data) {
                                return '<span>' + full.mechName + '</span><br/><span>' + data + '</span>';
                            }
                        }
                    },
                    {
                        "data": "area_name"
                    },
                    {
                        "data": "mechMobile",
                        "mRender": function (data, type, full) {
                            if (data) {
                                return '<a href=tel:' + data + '>' + data + '</a> ';
                            }
                        }
                    },

                    {
                        "data": "ucr_amount"
                    }

                ]

            });
        }


        if ($scope.mech == true) {
            var token = $rootScope.token;

            $('#transactionReportTable1').DataTable({
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
                    url: AppService.url + "api_r3/public/transactionReport?userId=" + $rootScope.userID + "&fromDate=" + $scope.fromdate + "&toDate=" + $scope.todate + "&mechIdOrMob=" + $scope.data.mechIdOrMob + "&code=" + $scope.searchByCode + "&benefittype=" + $scope.searchByBenifit + "&token=" + token,
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
                        "data": "ucr_credited_on"
                    },
                    {
                        "data": "code"
                    },
                    {
                        "data": "benefit_type"   // "code" changed Apr13th 2020 fh043
                    },
                    {
                        "data": "ucr_amount"
                    },
                    {
                        "data": "tier_amount"
                    }

                ]

            });
        }

    }


    $scope.validate = function (data) {
        alert(data);
    }

    if ($scope.mech == true || $scope.so == true) {
        $scope.showTransactionPoints = true;
        console.log(mode);
        if (mode != null) {
            if (mode == 'S-oil') {
                $scope.modevalue = '1';
                TransactionService.pointSummerySoil($rootScope.userID, $scope.modevalue).then(function (result) {
                    console.log("summery");
                    console.log(result.Status);
                    if (result.Status) {
                        console.log(result.data[0]);
                        $scope.pointsEarned = result.data[0].pointsEarned;
                        $scope.pointBalanceShowIntransaction = result.data[0].pointBalance;
                        $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                    } else {
        
                        $scope.pointsEarned = "";
                        $scope.pointBalance = "";
                        $scope.pointsRedeemed = "";
                    }
                });
            }
            else if (mode == 'Gulf') {
                $scope.modevalue = '0';
                TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                    console.log("summery");
                    console.log(result.Status);
                    if (result.Status) {
                        console.log(result.data[0]);
                        $scope.pointsEarned = result.data[0].pointsEarned;
                        $scope.pointBalanceShowIntransaction = result.data[0].pointBalance;
                        $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                    } else {
        
                        $scope.pointsEarned = "";
                        $scope.pointBalance = "";
                        $scope.pointsRedeemed = "";
                    }
                });
            }
        }
        else if (mode == null) {
            $scope.modevalue = '0';
            TransactionService.pointSummeryGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                console.log("summery");
                console.log(result.Status);
                if (result.Status) {
                    console.log(result.data[0]);
                    $scope.pointsEarned = result.data[0].pointsEarned;
                    $scope.pointBalanceShowIntransaction = result.data[0].pointBalance;
                    $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                } else {
    
                    $scope.pointsEarned = "";
                    $scope.pointBalance = "";
                    $scope.pointsRedeemed = "";
                }
            });
        }
    }



    $(document).ready(function (e) {
        $('#areaTransactionReport').select2({
            dropdownParent: $('#parentareaTransactionReport')
        });
        $('#soListtran').select2({
            dropdownParent: $('#parentSoListtran')
        });
        $('#thListtran').select2({
            dropdownParent: $('#parentThListtran')
        });
        $('#ahListtran').select2({
            dropdownParent: $('#parentAhListtran')
        });
    });

    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
    }

    $scope.onAHChange = function () {
        console.log("AHHHHHHHH+" + $scope.data.selectedAH);
        if ($scope.data.selectedAH != "") {
            LoaderService.showLoading();
            selecteduserAHId = ConverBase64.convertBase64($scope.data.selectedAH);
            AddMechanicService.getUsers("13", selecteduserAHId, "14").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelTH = result.data;
                    $scope.data.selectedTH = "";
                    $scope.data.selectedSo = "";
                }
            });
        }

    }

    $scope.onTHChange = function () {
        console.log("THHHHHHHHHHH" + $scope.data.selectedTH);
        if ($scope.data.selectedTH != "") {
            LoaderService.showLoading();
            selecteduserThId = ConverBase64.convertBase64($scope.data.selectedTH);
            AddMechanicService.getUsers(role, selecteduserThId, "6").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelSo = result.data;
                    $scope.data.selectedSo = "";
                }
            });
        }
    }
    $scope.onSOChange = function () {
        console.log($scope.data.selectedSo);
        selectedSOId = ConverBase64.convertBase64($scope.data.selectedSo);

    }

    $(document).ready(function (e) {
        $scope.search();
    });



    var visitorId = localStorage.getItem('visitorId');
    var u = encodeURI('https://analytics.firsthive.com/piwik.php?_cvar={"5":["page","Transaction"]}&action_name=View settings&idsite=123&rand=351459&h=18&m=13&s=3&rec=1&apiv=1&_id=' + visitorId + '&_idvc=19&res=320×480&');

    try {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url = u;
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);

    } catch (err) {

        console.log(err);
    }


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Transaction Report Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});