gulf.controller('purchaseRecommendationCtl', function ($scope, AppService, $state, $rootScope, HeaderService, TransactionService, $ionicPopup, $ionicPlatform, $ionicHistory, LoaderService, DreamIncomeService) {
    $scope.role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Loyalty User") {
        $scope.userID = $rootScope.userID;
    } else if ($scope.role == "6" || $scope.role == "27") {
        $scope.userID = $rootScope.mechanicUserIdForDreamIncome;
    }

    // $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
    //           if($state.current.name=="purchaseRecommendation"){
    //             e.preventDefault();
    //             e.stopPropagation();
    //             }
    //     });


    $ionicPlatform.registerBackButtonAction(function (event) {
        if ($ionicHistory.currentStateName() === 'purchaseRecommendation') {
            event.preventDefault();
        } else {
            $ionicHistory.goBack();
        }
    }, 100);
    $scope.editDreamIncome = function () {
        $state.go('EditDreamIncome');
    }
    $scope.getProductEarningDetails = function () {
        var token = $rootScope.token;
        // alert($scope.selectedColor);
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
    $scope.getProductEarningDetails();
    LoaderService.showLoading();
    DreamIncomeService.dreamincomePerformance($scope.userID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                $scope.target = result.data.target;
                $scope.achieved = result.data.achieved;
                $scope.per = result.data.per;
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

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Purchase Recommendation Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})