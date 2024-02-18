gulf.controller('DreamIncomePerformanceCtrl', function ($scope, DreamIncomeService, $rootScope, ConverBase64, $ionicPopup, $state, HeaderService, LoaderService, AppService, $ionicPlatform) {
    $scope.role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Loyalty User") {
        $scope.userID = $rootScope.userID;
    } else if ($scope.role == "6") {
        $scope.userID = $rootScope.mechanicUserIdForDreamIncome;
    }
    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($ionicHistory.currentStateName() === 'DreamIncomePerformance') {
            event.preventDefault();
        } else {
            $ionicHistory.goBack();
        }
    }, 100);
    LoaderService.showLoading();
    DreamIncomeService.dreamincomePerformance($scope.userID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                $scope.target = result.data.target;
                $scope.achieved = result.data.achieved;
                $scope.per = "66";
                $scope.days = result.data.days;
                $scope.bonus = result.data.bonus;
                $scope.target_date = result.data.target_date;
                var max = -219.99078369140625;
                forEach(document.querySelectorAll('.progress'), function (index, value) {
                    percent = $scope.per;
                    value.querySelector('.fill').setAttribute('style', 'stroke-dashoffset: ' + ((100 - percent) / 100) * max);
                    value.querySelector('.value').innerHTML = percent + '%';
                });

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
    });


    $scope.getProductEarningDetails = function () {
        // alert($scope.selectedColor);
        var token = $rootScope.token;
        $('#productEarningInDream').DataTable({
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
            "ajax": {
                url: AppService.url + "api_r3/public/getRecommditionsForDreamIncome?userId=" + $scope.userID + "&token=" + token,
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
                //   {
                //     "data": "imagePath",
                //           "mRender": function (data, type, full) {
                //               //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                //              return '<img class="img-responsive" src="'+AppService.url+data+'" alt="Gulf">';
                //           }
                //   },
                {
                    "data": "product_name"
                },
                {
                    "data": "product_sku"
                },
                //   {
                //             "data": "Weekly_Target"
                //         },
                {
                    "data": "Month_Target"
                }

            ]

        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Dream Income Performance Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});