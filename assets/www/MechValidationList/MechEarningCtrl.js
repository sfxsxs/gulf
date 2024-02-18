//MechEarningCtrl
gulf.controller("MechEarningCtrl", function ($scope, $rootScope, $http, MechValidationListService, $state, ConverBase64, HeaderService, $ionicPopup, AppService, LoaderService, AddMechanicService) {
    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');
    $scope.data = "";
    $scope.MechIdOrNumberrr = "";


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
    $scope.onLoadMechEarningSearchList = function () {
        MechValidationListService.getUserId($rootScope.userID, $scope.MechIdOrNumberrr).then(function (result) {
            console.log("getUserId");
            console.log(result);
            var table;
            if (result != "") {
                var index = 0;
                // var token= $rootScope.token;
                table = $('#MechEarningList').DataTable({
                    "data": result.data,
                    "bPaginate": false,
                    "bLengthChange": false,
                    "searching": false,
                    // "destroy":true,
                    "paging": false,
                    "ordering": false,
                    "info": false,
                    "language": {
                        "emptyTable": "No results found"
                    },
                    "columns": [

                        {
                            "data": "name"
                        },
                        {

                            "data": "usd_mobile"

                        },

                        {
                            "data": "usr_pk_id",
                            "mRender": function (data, type, full) {

                                return '<a class="btn  btn-sm" style="width:70px;background-color:#fff;color:#030303;" href=#/MechProfileEarning/' + data + '>' + 'View' + '</a>';
                            }

                        },


                    ]
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: "Something Went Wrong Please , Try Again"
                });
            }


        });

    }



    $scope.mechnicEarningSearchList = function () {
        var index = 0;
        var token = $rootScope.token;
        $('#MechEarningList').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            "paging": false,
            "ordering": false,
            "info": false,

            //"data":result.Data, ConverBase64.convertBase64($scope.MechIdOrNumberrr);
            "ajax": {
                url: AppService.url + "api_r3/public/getUserId?soId=" + $rootScope.userID + "&search=" + ConverBase64.convertBase64($scope.MechIdOrNumberrr) + "&token=" + token,
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
                    "data": "name"
                },
                {

                    "data": "usd_mobile"

                },

                {
                    "data": "usr_pk_id",
                    "mRender": function (data, type, full) {

                        return '<a class="btn  btn-sm" style="width:70px;background-color:#fff;color:#030303;" href=#/MechProfileEarning/' + data + '>' + 'View' + '</a>';
                    }

                },


            ]

        });
    }


    $scope.onLoadMechEarningSearchList();

});