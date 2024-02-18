gulf.controller('SetAndEditDreamIncomeCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, DreamIncomeService, LoaderService, AppService) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.getProductEarningDetails = function () {
        // alert($scope.selectedColor);
        var token = $rootScope.token;
        $('#productEarningfromResponse').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "language": {
                "emptyTable": "No results found"
            },
            "data": $rootScope.recomd,
            "columns": [
                //  {
                //    "data": "imagePath",
                //          "mRender": function (data, type, full) {
                //              //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                //             return '<img class="img-responsive" src="'+AppService.url+data+'" alt="Gulf">';
                //          }
                //  },
                {
                    "data": "product_name"
                },
                {
                    "data": "product_sku"
                },
                //  {
                //     "data": "Weekly_Target"
                // },
                {
                    "data": "Month_Target"
                }

            ]

        });
    }
    $scope.getProductEarningDetails();
    $scope.set = function () {
        LoaderService.showLoading();
        DreamIncomeService.setDreamIncome($rootScope.dreamid, $rootScope.userID).then(function (result) {
            LoaderService.hideLoading();
            if (result.Status == true) {
                $state.go('purchaseRecommendation');
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }


        })
    }
    $scope.edit = function () {
        $state.go('EditDreamIncome');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Set And Edit Dream Income Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})