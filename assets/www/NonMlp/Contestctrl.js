
gulf.controller('Contestctrl', function ($scope, NonMlpServices, $rootScope, $state, HeaderService, LoaderService, $ionicPopup, $location, $anchorScroll, AppService, ConverBase64) {
    $scope.fromdate = "";
    $scope.todate = "";
    $scope.name = "";
    $scope.loyality = false;
    $scope.regular = false;
    $scope.customer = false;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
    if (userData && userData.user_category == "Loyalty User") {
        $scope.loyality = true;
        $scope.regular = false;
        $scope.customer = false;

    }
    if (userData && userData.user_category == "Regular User") {
        $scope.loyality = false;
        $scope.regular = true;
        $scope.customer = false;

    }
    if (userData && userData.user_category == "Channel Partner") {
        $scope.loyality = false;
        $scope.regular = false;
        $scope.customer = true;

    }

    $scope.nonMlpEncodedUserId = ConverBase64.convertBase64($rootScope.NonMlpUserID);

    $("#fromdateContest").datepicker({

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
            $('#todateContest').datepicker('setStartDate', minDate);
        } else {
            $scope.fromdate = "";
            $('#todateContest').datepicker('setStartDate', "00-00-0000");
        }




    });

    $("#todateContest").datepicker({

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
            $('#fromdateContest').datepicker('setEndDate', maxDate);
        } else {
            $scope.todate = "";
            var maxDate = new Date();
            $('#fromdateContest').datepicker('setEndDate', maxDate);
        }


    });

    $scope.getContestReport = function () {

        LoaderService.showLoading();
        NonMlpServices.contestReportNONMLP($rootScope.userID, $scope.fromdate, $scope.todate, $scope.name).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            var msg_code = result.message_code;
            var show_msg = $scope.data.localAppLanguage[msg_code];
            if (result.Status == true) {
                $scope.contestShow = true;
                $scope.contestData = result.data;

            } else {
                $scope.contestShow = false;
                // var alertPopup = $ionicPopup.alert({
                //     template: result.show_msg,
                //     show_msg : "No records found"
                // });

            }
        })

        //   $('#ContestReort').DataTable({
        //     "processing": true,
        //     "destroy": true,
        //     "searching": false,
        //     "bLengthChange": false,
        //     "serverSide": false,
        //     "pageLength": 10,
        //     "paging": false,
        //     "ordering": false,
        //     "info": false,
        //     "language": {
        //         "emptyTable": "No results found"
        //     },
        //     "ajax": {
        //         url:AppService.url +"api_r3/public/contestReportNONMLP?userId="+$scope.nonMlpEncodedUserId+"&fromdate=" + $scope.fromdate + "&todate=" + $scope.todate ,
        //         "type": "GET",
        //         dataType: "json",
        //         contentType: "application/json",
        //         error: function (jqXHR, textStatus, errorThrown) {
        //             var alertPopup = $ionicPopup.alert({
        //                 template: "Server not responding ,Please try after some time"
        //             });
        //         }

        //     },
        //     "columns": [

        //         {
        //             "data": "cc_startdate",
        //              "render": function (data, type, full) {
        //                     return data+ " "+full.cc_enddate;
        //             }
        //         },
        //         {
        //             "data": "contest_name"
        //         },
        //         {
        //              "data": "contest_name"

        //         },
        // ]

        // });
    }


    $scope.getContestReport();

    /*$scope.orderStatuscheck = function(){
        $scope.transactionReport ();
    
    }*/
    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Contest Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});