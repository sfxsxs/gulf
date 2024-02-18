gulf.controller('CPBankDetailListCtrl', function ($scope, NonMlpServices, LoaderService, $rootScope, ConverBase64, $ionicPopup, $state, HeaderService, AppService, $cordovaInAppBrowser) {

    $scope.data = {};
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    LoaderService.showLoading();
    NonMlpServices.bankListNONMLP($rootScope.userID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        // $scope.Details=[{"latest":'0',"bankdetailId":"24461","beneficiary_name":"Axis fBank","beneficiary_account_no":"51548484848","beneficiary_bank_name":"Axis","beneficiary_ifsc_code":"Hshs544"},{"latest":false,"bankdetailId":"262","beneficiary_name":"Sbi","beneficiary_account_no":"518484548","beneficiary_bank_name":"Test","beneficiary_ifsc_code":"He545"},{"latest":"1","bankdetailId":"263","beneficiary_name":"Testing","beneficiary_account_no":"5184845454","beneficiary_bank_name":"Axis Bank","beneficiary_ifsc_code":"Udy8484"}];
        if (result.Status == true) {
            $scope.Details = result.Data;
        } else {
            var alertPopup = $ionicPopup.alert({
                template: result.Message
            });
        }
    })

    // $scope.BankDetailListLoad = function () {
    //     // alert($scope.selectedColor);
    //     $('#bankDetailTable').DataTable({
    //         "processing": true,
    //         "destroy": true,
    //         "searching": false,
    //         "bLengthChange": false,
    //         "serverSide": false,
    //         "paging": false,
    //         "ordering": false,
    //         "info": false,
    //         "paging": false,
    //         "ordering": false,
    //         "info": false,
    //         "language": {
    //             "emptyTable": "No results found"
    //         },
    //         "ajax": {
    //             url: AppService.url + "api_r3/public/bankListNONMLP?userId=" + $rootScope.userID,
    //             "type": "GET",
    //             dataType: "json",
    //             contentType: "application/json",
    //             error: function (jqXHR, textStatus, errorThrown) {
    //                 var alertPopup = $ionicPopup.alert({
    //                     template: "Server not responding ,Please try after some time"
    //                 });
    //             }

    //         },
    //         "columns": [
    //             {
    //                 "data": "beneficiary_name"
    //             },
    //             {
    //                 "data": "beneficiary_account_no"
    //             },
    //             {
    //                 "data": "beneficiary_bank_name"
    //             },
    //             {
    //                 "data": "beneficiary_ifsc_code"
    //             }

    //         ]

    //     });
    // }
    // $scope.BankDetailListLoad();

    $scope.addNewBankDeatil = function () {
        $rootScope.edit = false;
        $rootScope.AddBankDetailFromListPage = true;
        $state.go('CPBankAccountDetails');
    }
    $scope.next = function () {
        // alert($scope.data.bankAccountSelected);
        var bankid = $("input[name='bank-detail']:checked").val();
        //alert(bankid);

        NonMlpServices.setDefaultBankDetails(bankid, $rootScope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true || result.Status == "true") {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                }).then(function () {
                    //$state.go('NonMlpHome');
                    var userData = $rootScope.userData;
                    var encodedFHId = ConverBase64.convertBase64(userData.usr_unique_id);
                    console.log(userData.usr_unique_id);
                    console.log(encodedFHId);
                    $rootScope.encodedFHId = encodedFHId;
                    var url = AppService.placeOrderUrl + "login.php?uid=" + encodedFHId + "&pid=NTI1NA==&usid=" + $rootScope.userID;
                    console.log(url);
                    var options = {
                        location: 'yes'
                    };

                    document.addEventListener("deviceready", function () {

                        $cordovaInAppBrowser.open(url, '_blank', options)
                            .then(function (event) {
                                // success
                            })
                            .catch(function (event) {
                                // error
                            });
                    }, false);
                });


            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        })
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Bank Detail List Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});