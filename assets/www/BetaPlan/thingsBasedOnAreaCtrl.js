gulf.controller("ThingsBasesOnAreaCtrl", function ($scope, $rootScope, $http, TransactionService, AppService, $state, HeaderService, $ionicPopup, $ionicPlatform, AddMechanicService, LoaderService, ConverBase64) {


    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.data = {
        "data.selectedArea": " "
    };
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    $scope.todate = "";
    $scope.fromdate = "";

    /*   $scope.search();

*/
    $scope.showAh = false;
    $scope.showTh = false
    $scope.showSo = false;
    var selectedSOId = "";
    var selecteduserThId = "";
    var selecteduserAHId = "";

    var role = $rootScope.userData.role_fk_id;
    if (role == "5") {
        $scope.mech = true;
    } else if (role == "6" || role == "12" || role == "13" || role == "14" || role == "28" || role == "30" || role == "27") {
        $scope.so = true;
        selectedSOId = $rootScope.userID
        var d = new Date();
        var dd = d.getDate();
        var m = d.getMonth() + 1;
        //alert(parseInt(d.getMonth())+1);
        var y = d.getFullYear();
        var todaysDateTogerArea = dd + '-' + m + '-' + y;
        $scope.fromdate = todaysDateTogerArea;

        AddMechanicService.getAreaForBetaPlan(todaysDateTogerArea, "").then(function (result) {
            //console.log(result);

            $scope.AvailabelArea = result.data;

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

    LoaderService.hideLoading();
    var todayDate = new Date().getDate();


    $("#fromdateThingsArea").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        disableTouchKeyboard: true,
        startDate: "0",
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();

    });

    $(document).ready(function (e) {
        $('#areaDropDown').select2({
            dropdownParent: $('#areaParent')
        });
        $('#soListBeatArea').select2({
            dropdownParent: $('#parentSoListBeatArea')
        });
        $('#thListBeatArea').select2({
            dropdownParent: $('#parentThListBeatArea')
        });
        $('#ahListBeatArea').select2({
            dropdownParent: $('#parentAhListBeatArea')
        });
    });



    $("#AreaCoountBeat").on("click", "input", function () {
        // your code goes here
        var value = $(this).val();

        $rootScope.ToDoThingsArea = value;
        $state.go('ThingsToDo');

    });
    var vak = false;

    $scope.search = function () {
        var token = $rootScope.token;

        $('#AreaCoountBeat').DataTable({
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
                url: AppService.url + "api_r3/public/getareaforbeatplandata?soId=" + selectedSOId + "&Date=" + $scope.fromdate + '&areaName=' + $scope.data.selectedArea + "&token=" + token,
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
                    "data": "area",
                    "mRender": function (data, type, full) {
                        //<a class="btn btn-info btn-sm" href=#/mechValidation/' + data + '>' + 'Validate' + '</a>'
                        if (data) {
                            $('.activeAccount').prop('checked', false);

                            return '<input type="Button" style=" background-color: transparent; border: transparent;    border-bottom: 2px solid #fff;" class="activeAccount" value="' + full.area + '" >';
                        }
                    }
                },
                {
                    "data": "count",
                }


            ]

        });





    }

    $scope.onAHChange = function () {
        console.log("AHHHHHHHH+" + $scope.data.selectedAH);
        $scope.data.selectedTH = "";
        $scope.data.selectedSo = "";
        if ($scope.data.selectedAH != "") {
            LoaderService.showLoading();
            selecteduserAHId = ConverBase64.convertBase64($scope.data.selectedAH);
            AddMechanicService.getUsers("13", selecteduserAHId, "14").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelTH = result.data;
                }
            });
        }

    }

    $scope.onTHChange = function () {
        var role = $rootScope.userData.role_fk_id;
        console.log("THHHHHHHHHHH" + $scope.data.selectedTH);
        $scope.data.selectedSo = "";
        if ($scope.data.selectedTH != "") {
            LoaderService.showLoading();
            selecteduserThId = ConverBase64.convertBase64($scope.data.selectedTH);
            AddMechanicService.getUsers(role, selecteduserThId, "6").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelSo = result.data;
                }
            });
        }
    }
    $scope.onSOChange = function () {
        console.log($scope.data.selectedSo);
        selectedSOId = ConverBase64.convertBase64($scope.data.selectedSo);

    }


    $scope.search();


    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Things Based On Area Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }


});