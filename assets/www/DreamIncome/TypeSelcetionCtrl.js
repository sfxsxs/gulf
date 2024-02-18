gulf.controller('TypeSelcetionCtrl', function ($scope, LoaderService, DreamIncomeService, $rootScope, ConverBase64, $ionicPopup, $state, HeaderService, AppService) {
    $scope.data = {};
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
    LoaderService.showLoading();
    DreamIncomeService.mechanictype().then(function (result) {
        LoaderService.hideLoading();
        console.log(result);
        if (result.Status == true) {
            $scope.mechanictype = result.data;

        } else {
            var alertPopup = $ionicPopup.alert({
                template: result.Message
            });
        }


    })

    $scope.MechnaicTypeSelction = function () {
        //	alert($scope.data.Type);
        if ($scope.data.Type != "" && $scope.data.Type != undefined) {
            LoaderService.showLoading();
            DreamIncomeService.updateMechanicType($scope.userID, $scope.data.Type).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);
                if (result.Status == true) {
                    $state.go('DreamIncomeMain');

                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }


            })
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Select Vehicle Type"
            });
        }


    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Type Selection Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});