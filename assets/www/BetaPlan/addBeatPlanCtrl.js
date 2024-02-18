gulf.controller("AddBeatPlanCtrl", function ($scope, $rootScope, $http, TransactionService, AppService, $state, HeaderService, $ionicPopup, $ionicPlatform, AddMechanicService, LoaderService, ConverBase64, PlannerService) {

    $scope.data = {};
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    var role = $rootScope.userData.role_fk_id;
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    $scope.todate = "";
    $scope.fromdate = "";
    $scope.showAh = false;
    $scope.showTh = false
    $scope.showSo = false;
    var selectedSOId = "";
    var selecteduserThId = "";
    var selecteduserAHId = "";

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
    } else if (role == "12") {
        //rh login
        $scope.showAh = true;
        $scope.showTh = true
        $scope.showSo = true;
    }
    else if (role == "6" || role == "27") {
        //so login
        $scope.showAh = false;
        $scope.showTh = false
        $scope.showSo = false;
        selectedSOId = $rootScope.userID;
        LoaderService.showLoading();
        AddMechanicService.getBeatPlanSoAreaList("", "", "", selectedSOId).then(function (result) {
            //console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea)
            console.log($scope.AvailabelArea.length);

            var fruits = result.Data;
            var jsonData = [];
            for (var i = 0; i < fruits.length; i++) {
                jsonData.push(fruits[i].pm_po_name);
            }
            $('#areaListinValidateReport').select2({
                tags: true,
                data: jsonData,
                placeholder: "Add your tags here"
            });

        });

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

    } else if (role == "12") {
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



    /*   $scope.search();

*/
    $(document).ready(function (e) {
        $('#areaListinValidateReport').select2({
            dropdownParent: $('#parentAreaListinValidateReport')
        });
        $('#soListAddBeat').select2({
            dropdownParent: $('#parentSoListAddBeat')
        });
        $('#thListAddBeat').select2({
            dropdownParent: $('#parentThListAddBeat')
        });
        $('#ahListAddBeat').select2({
            dropdownParent: $('#parentAhListAddBeat')
        });
    });
    var todayDate = new Date().getDate();

    if (role == "6" || role == "27") {
        startDate = '0d'


    } else {
        startDate = '+1d';
    }
    $("#dateToAddBeatPlan").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        startDate: startDate,
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


    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
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
        console.log("THHHHHHHHHHH" + $scope.data.selectedTH);
        $scope.data.selectedSo = "";
        if ($scope.data.selectedTH != "") {
            LoaderService.showLoading();
            selecteduserThId = ConverBase64.convertBase64($scope.data.selectedTH);
            AddMechanicService.getUsers("14", selecteduserThId, "6").then(function (result) {
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
        LoaderService.showLoading();
        AddMechanicService.getBeatPlanSoAreaList("", "", "", selectedSOId).then(function (result) {
            //console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea)
            console.log($scope.AvailabelArea.length);

            var fruits = result.Data;
            var jsonData = [];
            for (var i = 0; i < fruits.length; i++) {
                jsonData.push(fruits[i].pm_po_name);
            }
            $('#areaListinValidateReport').select2({
                tags: true,
                data: jsonData,
                placeholder: "Add your tags here"
            });

        });


    }


    $scope.addBeatPlan = function () {
        //var sel = document.getElementById("areaListinValidateReport");
        $scope.data.selectedArea = $("#areaListinValidateReport").val();
        //alert($scope.data.selectedArea);
        LoaderService.showLoading();
        PlannerService.addBeatPlan($rootScope.userID, $scope.dateForAddPlan, selectedSOId, role, $scope.data.selectedArea).then(function (result) {
            LoaderService.hideLoading();
            if (result.Status == true) {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
                alertPopup.then(function (res) {
                    if (role == "12" || role == "13" || role == "14") {
                        $state.go('RH_AH_TH_home');
                    } else {
                        $state.go('Home');
                    }

                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    }

    $scope.dateSelectedForReport = function () {
        //  alert($scope.dateForAddPlan);
        if (selectedSOId != "" && selectedSOId != undefined) {
            LoaderService.showLoading();
            PlannerService.EditAreaForBeatPlan(selectedSOId, $scope.dateForAddPlan).then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    if (result.data != "") {
                        var areas = result.data.split(',');
                        console.log(areas);
                        $("#areaListinValidateReport").val(areas);
                        var html = '';
                        for (var i = 0; i < $scope.AvailabelArea.length; i++) {
                            for (var j = 0; j < areas.length; j++) {
                                if ($scope.AvailabelArea[i].pm_po_name == areas[j]) {
                                    html += '<option value="' + $scope.AvailabelArea[i].pm_po_name + '" selected="selected">' + $scope.AvailabelArea[i].pm_po_name + '</option>';
                                    break;
                                } else {
                                    html += '<option value="' + $scope.AvailabelArea[i].pm_po_name + '" >' + $scope.AvailabelArea[i].pm_po_name + '</option>';
                                }

                            }
                        }

                        $('#areaListinValidateReport').html(html);
                        var a = new Array();
                        $("#areaListinValidateReport").children("option").each(function (x) {
                            test = false;
                            b = a[x] = $(this).val();
                            for (i = 0; i < a.length - 1; i++) {
                                if (b == a[i]) test = true;
                            }
                            if (test) $(this).remove();
                        });
                        $("#areaListinValidateReport").val(areas);
                        //                    var map = {};
                        //$('select option').each(function () {
                        //    if (map[this.value]) {
                        //        $(this).remove()-
                        //    }
                        //    map[this.value] = true;
                        //})
                    }


                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Select SO"
            });
        }
    }



    //                     $scope.data.selectedArea = result.data;
    //                      var areas = result.data.split(',');
    //                                               var html = '';
    //                   for (var i = 0; i < $scope.AvailabelArea.length; i++) {
    //                                             for (var j = 0; j < areas.length; j++) {
    //                                                   if($scope.AvailabelArea[i].pm_po_name == areas[j] ){
    //                                                      html += '<option value="' + $scope.AvailabelArea[i].pm_po_name + '" selected="selected">' + $scope.AvailabelArea[i].pm_po_name + '</option>';
    //                                                        break;
    //                                                      }else{
    //                                                      html += '<option value="' + $scope.AvailabelArea[i].pm_po_name + '" >' + $scope.AvailabelArea[i].pm_po_name + '</option>';
    //                                                      }
    //                                                   
    //                                               }
    //                    }
    //                                               $('#areaListinValidateReport').html(html);

    //                    var valoresArea=result.data // it has the multiple values to set, separated by comma
    //var arrayArea = valoresArea.split(',');
    //                    $('#areaListinValidateReport').select2('val', arrayArea);
    ////$('#areaListinValidateReport').val(arrayArea);
    //                     $scope.data.selectedArea = result.data;

    //                     var selectedValues = new Array();
    //    selectedValues[0] = "Chudenapura";
    //    selectedValues[1] = "Kengeri";
    //                    $scope.data.selectedAre = result.data;
    //                    $('#areaListinValidateReport').val(selectedValues);
    //                    
    //   $('#areaListinValidateReport').select2('val', selectedValues);
    //                   if(result.data != ""){
    //                       
    //                        $('#areaListinValidateReport').val(["Chudenapura","Kengeri"]);
    //                       //areaListinValidateReport
    //                     //  $scope.data.selectedArea = result.data;
    //                       
    //                         //('#area').val(["ItemtoSelect1","ItemtoSelect2"]);
    //                   }


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Add Beat Plan Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});