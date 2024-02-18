
gulf.controller('CPTransactionReportCtrl', function ($scope, TransactionService, $rootScope, $state, HeaderService, LoaderService, $ionicPopup, $location, $anchorScroll, AppService, NonMlpServices, ConverBase64) {
    $scope.fromdate = "";
    $scope.todate = "";
    $scope.searchByCode = "";
    $scope.searchByBenifit = "";

    $scope.nonMlpEncodedUserId = ConverBase64.convertBase64($rootScope.userData.usr_pk_id);
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $rootScope.NonMlpUserID = $rootScope.userData.usr_pk_id;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $("#fromdateTransactionReportNonMlp").datepicker({

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
            $('#todateTransactionReportNonMlp').datepicker('setStartDate', minDate);
        } else {
            $scope.fromdate = "";
            $('#todateTransactionReportNonMlp').datepicker('setStartDate', "00-00-0000");
        }




    });

    $("#todateTransactionReportNonMlp").datepicker({

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
            $('#fromdateTransactionReportNonMlp').datepicker('setEndDate', maxDate);
        } else {
            $scope.todate = "";
            var maxDate = new Date();
            $('#fromdateTransactionReportNonMlp').datepicker('setEndDate', maxDate);
        }


    });

    //Get NON MLP Trasaction Points Summery Start
    if (mode != null) {
        if (mode == 'S-oil') {
            $scope.modevalue = '1';
            NonMlpServices.pointSummeryNONMLPSoil($scope.nonMlpEncodedUserId, $scope.modevalue).then(function (result) {
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
            NonMlpServices.pointSummeryNONMLPGulf($scope.nonMlpEncodedUserId, $scope.modevalue).then(function (result) {
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
        NonMlpServices.pointSummeryNONMLPGulf($scope.nonMlpEncodedUserId, $scope.modevalue).then(function (result) {
            console.log("summery");
            console.log(result.Status);
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

    //Get NON MLP Trasaction Points Summery end

    $scope.transactionReport = function () {
        var token = $rootScope.token;
        $('#transactionReportTableNonMlp').DataTable({
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
                url: AppService.url + "api_r3/public/transactionReportNONMLP?userId=" + $rootScope.NonMlpUserID + "&fromdate=" + $scope.fromdate + "&todate=" + $scope.todate + "&code=" + $scope.searchByCode + "&benefittype=" + $scope.searchByBenifit + "&token=" + token + "&oem=" + "",
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
                    "data": "ucr_credited_on"   // "code"   // changed on Apr10th - fh043
                },
                {
                    "data": "code"
                },
                {
                    "data": "benefit_type"
                },
                {
                    "data": "ucr_amount"   // "pdct_desc"  // changed on Apr10th - fh043
                }

            ]

        });
    }

    $(document).ready(function (e) {
        $scope.transactionReport();
    })


    $scope.orderStatuscheck = function () {
        $scope.transactionReport();

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Transaction Report Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }



});