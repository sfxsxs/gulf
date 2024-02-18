gulf.controller('CPRecomendationDeatilCtl', function ($scope, AppService, $state, $rootScope, HeaderService, RecommendationService, LoaderService, $ionicPopup) {
    // $scope.selectedMake = "";
    $scope.all = false;

    $scope.nonMlp;
    $scope.isOtherCustomer;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Channel Partner") {
        $scope.isOtherCustomer = true;
    } else {
        $scope.isOtherCustomer = false;
        if (userData && userData.user_category == "Loyalty User") {
            $scope.nonMlp = false;
        } else {
            $scope.nonMlp = true;
        }
    }

    // alert("Hello");
    LoaderService.showLoading();
    /*   RecommendationService.getRecommendationsModel("").then(function (result) {
           console.log("state Data" + result);
           if (result.Status == true) {
               $scope.AvailabelModel = result.data;
           }
       });*/

    $(document).ready(function (e) {
        $('#make').select2({ dropdownParent: $('#makeParent') });
        $('#model').select2({ dropdownParent: $('#modelParent') });
    });

    RecommendationService.getRecommendationsMake($rootScope.RecommendationSegment).then(function (result) {
        LoaderService.hideLoading();
        console.log("state Data" + result);
        if (result.Status == true) {
            $scope.AvailabeMake = result.data;
        }
    });

    $scope.makeChanged = function () {
        RecommendationService.getRecommendationsModel($scope.selectedMake, $rootScope.RecommendationSegment).then(function (result) {
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelModel = result.data;
            }
        });
    }
    $scope.modelChanged = function () {
        $scope.all = true;
        LoaderService.showLoading();
        RecommendationService.getRecommendationList($scope.selectedMake, $scope.selectedModel, $rootScope.RecommendationSegment).then(function (result) {
            LoaderService.hideLoading();
            console.log("state Data" + result);
            if (result != "") {
                $scope.decriptionImg = AppService.url + result.data[0].imagePath;
                $scope.recomendationHeader = result.data[0].recommend;
                $scope.productDescription = result.data[0].re_pd_desc;

            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something Went Wrong Please , Try Again"
                });
            }

        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Recomendation Detail Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});