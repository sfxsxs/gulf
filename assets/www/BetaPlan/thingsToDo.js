gulf.controller("ThingsToDoCtrl", function ($scope, $rootScope, $http, TransactionService,
    AppService, $state, HeaderService, $ionicPopup, $ionicPlatform, AddMechanicService,
    LoaderService, ConverBase64, $timeout) {

    $scope.data = {
        "selectedArea": ""
    };
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
    var latitude;
    var longitude;
    $scope.disabledvalue = false;

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    /*   $scope.search();

*/
    var role = $rootScope.userData.role_fk_id;
    if (role == "5") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        selectedSOId = $rootScope.userID;
        $scope.so = true;
        $scope.so = true;
        var d = new Date();
        var dd = d.getDate();
        var m = d.getMonth() + 1;
        //alert(parseInt(d.getMonth())+1);
        var y = d.getFullYear();
        todaysDateTogerArea = dd + '-' + m + '-' + y;
        $scope.fromdate = todaysDateTogerArea;
        $scope.data.selectedArea = $rootScope.ToDoThingsArea;

        AddMechanicService.getAreaForBetaPlan(todaysDateTogerArea, $rootScope.ToDoThingsArea).then(function (result) {
            //console.log(result);

            $scope.AvailabelArea = result.data;

        });
    } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
        var d = new Date();
        var dd = d.getDate();
        var m = d.getMonth() + 1;
        //alert(parseInt(d.getMonth())+1);
        var y = d.getFullYear();
        todaysDateTogerArea = dd + '-' + m + '-' + y;
        $scope.fromdate = todaysDateTogerArea;
        $scope.data.selectedArea = $rootScope.ToDoThingsArea;

        AddMechanicService.getAreaForBetaPlan(todaysDateTogerArea, $rootScope.ToDoThingsArea).then(function (result) {
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
    $(document).ready(function (e) {
        $('#areaDropDown').select2({
            dropdownParent: $('#areaParent')
        });
        $('#soListThingsToDo').select2({
            dropdownParent: $('#parentSoListThingsToDo')
        });
        $('#thListThingsToDo').select2({
            dropdownParent: $('#parentThListThingsToDo')
        });
        $('#ahListThingsToDo').select2({
            dropdownParent: $('#parentAhListThingsToDo')
        });
    });
    var todayDate = new Date().getDate();


    $("#fromdateThings").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
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


    $("#activeMechnaic1").on("click", ".pending", function () {
        // your code goes here
        var value = $(this).val();

        var str_array = value.split(',');
        if (str_array[3] == "Completed") {
            var str = "Pending";
        } else {
            var str = "Completed";
        }


        var confirmPopup = $ionicPopup.show({

            //            title: 'Do you want to change the status for Mechanic ' + str_array[0] + ' from '+ str_array[2] + ' as "'+str+'"',
            title: 'Do you want to update  the status as completed',

            scope: $scope,
            buttons: [
                {
                    text: 'Yes',
                    type: 'button-positive',
                    onTap: function () {
                        if (latitude && longitude) {
                            $scope.updateStatus(str_array[1], str_array[3]);
                        } else {
                            $ionicPopup.alert({
                                template: 'Please allow your location'
                            });
                        }

                    }
                },
                {
                    text: 'No',
                    type: 'button-positive',
                    onTap: function () {
                        confirmPopup.close();
                    }
                },
                {
                    text: 'Cancel',
                    type: 'button-positive',
                    onTap: function () {
                        confirmPopup.close();
                    }
                },
            ]
        });
    });
    var vak = false;

    $scope.search = function () {
        var token = $rootScope.token;
        $('#activeMechnaic1').DataTable({
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
                url: AppService.url + "api_r3/public/beatplanlistforso?soId=" + selectedSOId + "&areaName=" + $scope.data.selectedArea + "&Date=" + $scope.fromdate + "&token=" + token,
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
                    "data": "status",
                    "mRender": function (data, type, full) {
                        if ($scope.so) {
                            if (data) {
                                if (full.itstoday == 'Yes') {
                                    if (data == "Completed") {
                                        $('.pending').prop('checked', true);
                                        return '<input type="checkbox" class="pending" value="' + full.MecName + ',' + full.beat_pk_id + ',' + full.area + ',' + full.status + '" >';
                                    } else {
                                        $('.pending').prop('checked', false);
                                        return '<input type="checkbox" class="pending" value="' + full.MecName + ',' + full.beat_pk_id + ',' + full.area + ',' + full.status + '" >';
                                    }
                                } else {
                                    if (data == "Completed") {
                                        $('.completed').prop('checked', true);
                                        return '<input type="checkbox" class="completed" value="' + full.MecName + ',' + full.beat_pk_id + '" disabled>';
                                    } else {
                                        $('.pending').prop('checked', false);
                                        return '<input type="checkbox" value="' + full.MecName + ',' + full.beat_pk_id + '" disabled>';
                                    }
                                }


                            }
                        } else {
                            return "";
                        }
                    }
                },

                {
                    "data": "MecName"
                },
                {
                    "data": "status"
                }


            ]

        });





    }



    $scope.search();


    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
    }

    $scope.updateStatus = function (data, status) {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'BeatPlanUpdateClick', '1', { dimension6: 'BeatPlanUpdate', dimension7: $rootScope.userData.usd_mobile }]);
        }
        if (status == "Completed") {
            statusData = "N";
        } else {
            statusData = "Y";
        }
        AddMechanicService.updateBetaPlan(data, statusData, latitude, longitude).then(function (result) {
            console.log(result);
            if (result != "") {
                if (result.Status == true) {

                    $state.go('ThingsToDoBasedOnArea');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }

            //$scope.AvailabelArea = result.data;

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
        //alert(selectedSOId);
        var d = new Date();
        var dd = d.getDate();
        var m = d.getMonth() + 1;
        //alert(parseInt(d.getMonth())+1);
        var y = d.getFullYear();
        todaysDateTogerArea = dd + '-' + m + '-' + y;
        AddMechanicService.getAreaForBetaPlan(todaysDateTogerArea, $rootScope.ToDoThingsArea).then(function (result) {
            //console.log(result);

            $scope.AvailabelArea = result.data;

        });

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Things To Do Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

    $scope.showLocation = function () {
        $ionicPlatform.ready(function () {
            LoaderService.showLoading();

            console.log("Platform ready");

            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                console.log("Location is " + (enabled ? "enabled" : "disabled"));
                console.log(enabled);
                if (enabled) {
                    var options = {
                        enableHighAccuracy: true,
                        maximumAge: 60000
                    }
                    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                    function onSuccess(position) {
                        console.log('Latitude: ' + position.coords.latitude + '\n' +
                            'Longitude: ' + position.coords.longitude + '\n' +
                            'Altitude: ' + position.coords.altitude + '\n' +
                            'Accuracy: ' + position.coords.accuracy + '\n' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                            'Heading: ' + position.coords.heading + '\n' +
                            'Speed: ' + position.coords.speed + '\n' +
                            'Timestamp: ' + position.timestamp + '\n');
                        latitude = position.coords.latitude;
                        longitude = position.coords.longitude;

                        LoaderService.hideLoading();
                        var alertPopup = $ionicPopup.alert({
                            template: "Geo Tagging Completed Sucessfully"
                        });
                        $scope.disabledvalue = true;
                        console.log(latitude + "----------" + longitude);
                        // console.log(long + "----------" + long);

                    };

                    function onError(error) {
                        LoaderService.hideLoading();
                        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    }

                } else {
                    LoaderService.hideLoading();
                    var alertPopup = $ionicPopup.alert({
                        template: "Please Turn On GPS"
                    });
                }
            }, function (error) {
                LoaderService.hideLoading();
                console.error("The following error occurred: " + error);
            });
        });
    }


    // $scope.initMap = function () {
    //     var options = {
    //         enableHighAccuracy: true,
    //         maximumAge: 60000
    //     }

    //     var currentPos = {
    //                 lat: 12.9482,
    //                 lng: 77.5972
    //             };

    //     $scope.map = new google.maps.Map(document.getElementById('map'), {
    //         zoom: 20,
    //         center: currentPos
    //     });

    //     if (window.cordova) {
    //         navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    //         function onSuccess(position) {
    //             console.log("getGeoLocation called success", position);

    //             latitude = position.coords.latitude;
    //             longitude = position.coords.longitude;

    //             var currentPos = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };

    //             $scope.map = new google.maps.Map(document.getElementById('map'), {
    //                 zoom: 20,
    //                 center: currentPos
    //             });

    //             var marker = new google.maps.Marker({
    //                 position: currentPos,
    //                 map: $scope.map
    //             });

    //         };

    //         function onError(error) {
    //             console.log("getGeoLocation called error", error);
    //         }
    //     }
    // }

    // try{
    //     $scope.initMap();
    // }catch(ex){}

});
