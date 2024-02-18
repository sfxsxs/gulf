gulf.controller('CPMyRewardsCtrl', function ($scope, $state, $ionicPopup, AppService, $rootScope, HeaderService) {
    console.log('order');

    $scope.fromDate = "";
    $scope.toData = "";
    $scope.orderNumber = "";
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

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
        var token = $rootScope.token;
        console.log($scope.orderNumber);
        console.log($scope.fromDate);
        console.log($scope.toData);
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
                url: AppService.url + "api_r3/public/getOrderList?userid=" + $rootScope.userID +
                    "&fromdate=" + $scope.fromDate + "&todate=" + $scope.toData + "&searchterm=" +
                    "" + "&orderid=" + $scope.orderNumber + "&roleid=" + $rootScope.userRole + "&token=" + token,
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
                    "data": "ord_number"
                },
                {
                    "data": "ord_number"
                },
                {
                    "data": "cart_prod_name"
                },
                {
                    "data": "status_name"
                }

            ]

        });



    }

    $(document).ready(function (e) {
        $scope.orderStatuscheck();

    })


    $scope.clickBack = function () {
        $(".datepicker").hide();
        window.history.back();
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner My Rewards Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})