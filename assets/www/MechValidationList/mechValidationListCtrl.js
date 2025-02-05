gulf.controller("MechValidationListCtrl", function ($scope, $rootScope, $http, MechValidationListService, $state, ConverBase64, HeaderService, $ionicPopup, AppService, LoaderService, AddMechanicService) {
    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');
    $scope.data = "";


    /*     $scope.validationSearchList();*/

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

    //header
    $(document).ready(function (e) {
        $('#areaValidateMechanicList').select2({
            dropdownParent: $('#parentAreaValidateMechanicList')
        });
    });

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

    LoaderService.showLoading();
    AddMechanicService.getAreaForSO("", "", "", $rootScope.userID).then(function (result) {
        //console.log(result);
        LoaderService.hideLoading();
        $scope.AvailabelArea = result.Data;
        console.log($scope.AvailabelArea)
        console.log($scope.AvailabelArea.length);
    });
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

    //header
    $rootScope.validateMechanicNotUploadded = false;
    MechValidationListService.getMechPendingList($rootScope.userID, "", "").then(function (result) {
        //console.log(result);
        var table;
        if (result != "") {
            var index = 0;
            // var token= $rootScope.token;
            table = $('#mechList').DataTable({
                "data": result.data,
                "bPaginate": false,
                "bLengthChange": false,
                "searching": false,
                "paging": false,
                "ordering": false,
                "info": false,
                "language": {
                    "emptyTable": "No results found"
                },
                "columns": [

                    {
                        "data": "usd_firstname"
                    },
                    {
                        // "data": "usd_mobile"
                        "data": "usd_mobile",
                        "mRender": function (data, type, full) {
                            if (data) {
                                return '<a href=tel:' + data + '>' + data + '</a> ';
                            }
                        }
                    },
                    {
                        "data": "area_name"
                    },
                    {
                        "data": "usr_pk_id",
                        "mRender": function (data, type, full) {
                            //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                            return '<a class="btn btn-info btn-sm" style="width:70px" href=#/mechValidation/' + data + '>' + 'Validate' + '</a>';
                        }

                    },
                    {
                        "data": "usr_pk_id",
                        "mRender": function (data, type, full) {
                            return '<button value=' + data + ' style="width:70px" class="btn btn-info btn-sm reject">' + 'Reject' + '</button>';
                        }

                    }

                ]
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Something Went Wrong Please , Try Again"
            });
        }


    });

    $scope.validationSearchList = function () {
        var index = 0;
        var token = $rootScope.token;
        $('#mechList').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,

            //"data":result.data,
            "ajax": {
                url: AppService.url + "api_r3/public/mechanicsList?userId=" + $rootScope.userID + "&status=" + "3" + "&area=" + $scope.data.selectedAreaInActiveMechanic + "&mobile=" + $scope.MechIdOrNumberrr + "&token=" + token,
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
                    "data": "usd_firstname"
                },
                {
                    // "data": "usd_mobile"
                    "data": "usd_mobile",
                    "mRender": function (data, type, full) {
                        if (data) {
                            return '<a href=tel:' + data + '>' + data + '</a> ';
                        }
                    }
                },
                {
                    "data": "area_name"
                },
                {
                    "data": "usr_pk_id",
                    "mRender": function (data, type, full) {
                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                        return '<a class="btn btn-info btn-sm" href=#/mechValidation/' + data + '>' + 'Validate' + '</a>';
                    }

                },
                {
                    "data": "usr_pk_id",
                    "mRender": function (data, type, full) {
                        return '<button value=' + data + ' class="btn btn-info btn-sm reject">' + 'Reject' + '</button>';
                    }

                }

            ]

        });
    }


    $('#mechList').on('click', '.reject', function (e) {


        console.log(e.currentTarget.value);
        $scope.mecid = ConverBase64.convertBase64(e.currentTarget.value);
        AddMechanicService.rejectMechBySo($scope.mecid, $rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Status </b>',
                    template: result.Message
                });
                $scope.validationSearchList();
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Status </b>',
                    template: result.Message
                });

            }

            // LoaderService.hideLoading();

        });
    });

});