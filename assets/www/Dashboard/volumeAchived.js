gulf.controller("VolumeAchivedCtrl", function ($scope, $rootScope, $http, TransactionService, AppService, $state, HeaderService, $ionicPopup, $ionicPlatform, AddMechanicService, LoaderService, ConverBase64) {


    $scope.data = {
        "selectedAreaInVolume": ""
    };
    var role = $rootScope.userData.role_fk_id;
    $scope.showAh = false;
    $scope.showTh = false
    $scope.showSo = false;
    var selectedSOId = "";
    var selecteduserThId = "";
    var selecteduserAHId = "";
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    $scope.todate = "";
    $scope.fromdate = "";

    /*   $scope.search();
   
   */
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

    var role = $rootScope.userData.role_fk_id;
    if (role == "5") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;

    }
    LoaderService.showLoading();
    AddMechanicService.getAreaForSO("", "", "", $rootScope.userID).then(function (result) {
        //console.log(result);
        LoaderService.hideLoading();
        $scope.AvailabelArea = result.Data;
        console.log($scope.AvailabelArea)
        console.log($scope.AvailabelArea.length);
    });
    $(document).ready(function (e) {
        $('#areaListVolumeReport').select2({
            dropdownParent: $('#parentareaListVolumeReport')
        });
        $('#soListVolume').select2({
            dropdownParent: $('#parentSoListVolume')
        });
        $('#thListVolume').select2({
            dropdownParent: $('#parentThListVolume')
        });
        $('#ahListVolume').select2({
            dropdownParent: $('#parentAhListVolume')
        });
    });
    var todayDate = new Date().getDate();


    $("#fromdateVolume").datepicker({

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

    $("#todateVolume").datepicker({

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
        var token = $rootScope.token;

        $('#activeMechnaic').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,
            "scrollX": true,
            "language": {
                "emptyTable": "No results found"
            },
            "ajax": {
                url: AppService.url + "api_r3/public/getSODetailedMechDetails?soId=" + $rootScope.userID + "&status=VolumesAchieved&fromDate=" + $scope.fromdate + "&toDate=" + $scope.todate + "&areaName=" + $scope.data.selectedAreaInVolume + "&soFilter=" + selectedSOId + "&thFilter=" + selecteduserThId + "&ahFilter=" + selecteduserAHId + "&token=" + token,
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
                {
                    "data": "name",
                    "mRender": function (data, type, full) {
                        if (data) {
                            return '<span>' + data + '</span><br/><span>' + full.usd_code + '</span>';
                        }
                    }
                },
                {
                    "data": "totalVolume"
                }

            ]

        });





    }



    $scope.search();


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
                    $scope.AvailabelSo = result.data
                    $scope.data.selectedSo = "";
                }
            });
        }
    }
    $scope.onSOChange = function () {
        console.log($scope.data.selectedSo);
        $scope.AvailabelArea = "";
        $scope.data.selectedArea = "";
        selectedSOId = ConverBase64.convertBase64($scope.data.selectedSo);
        if (selectedSOId != "" && selectedSOId != undefined) {
            LoaderService.showLoading();
            AddMechanicService.getAreaForSO("", "", "", selectedSOId).then(function (result) {
                //console.log(result);
                LoaderService.hideLoading();
                $scope.AvailabelArea = result.Data;
                console.log($scope.AvailabelArea)
                console.log($scope.AvailabelArea.length);
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Volume Archived Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});