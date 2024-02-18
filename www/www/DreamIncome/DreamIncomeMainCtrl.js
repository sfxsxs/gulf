gulf.controller('DreamIncomeMainCtrl', function ($scope, LoaderService, $rootScope, ConverBase64, $ionicPopup, $state, HeaderService, DreamIncomeService, AppService) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.role = $rootScope.userData.role_fk_id;
    $scope.setDreamIncome = function () {
        if ($scope.role == "5") {
            $scope.userID = $rootScope.userID;
        } else if ($scope.role == "6" || $scope.role == "27") {
            $scope.userID = $rootScope.mechanicUserIdForDreamIncome;
        }
        LoaderService.showLoading();
        DreamIncomeService.checkDreamIncome($scope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {
                    $state.go('DreamIncome');

                } else {
                    $state.go('purchaseRecommendation');
                    // var alertPopup = $ionicPopup.alert({
                    //     template: result.Message
                    // });
                }
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }
        });

    }
    $scope.viewRecommendations = function () {
        $state.go('purchaseRecommendation');
    }
    $scope.performance = function () {
        $state.go('DreamIncomePerformance');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Dream Income Main Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});