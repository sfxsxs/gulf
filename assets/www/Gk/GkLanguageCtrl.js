gulf.controller('GkLanguageCtrl', function ($scope, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, $cordovaDevice, $ionicPlatform, AppService, NonMlpServices) {

    $scope.mobileNumber = $rootScope.NonMlpRecievedMobile;
    $scope.data = {};
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    NonMlpServices.appLanguages().then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result.Status == true) {
            $scope.listOfLanguages = result.data;
        } else {
            var alertPopup = $ionicPopup.alert({
                template: result.Message
            });
        }

    });


    $scope.submitLanguage = function () {
        // alert($scope.data.userSelectedLanguage);

        if ($scope.data.userSelectedLanguage != "" && $scope.data.userSelectedLanguage != null && $scope.data.userSelectedLanguage != undefined) {
            LoaderService.showLoading();

            NonMlpServices.nonmlplanguageupdate($scope.data.userSelectedLanguage, $rootScope.userID).
                then(function (result) {
                    LoaderService.hideLoading();
                    console.log(result);
                    if (result.Status == true) {
                        $state.go('GkSetPassword');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }

                });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Select User Type"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "GK Language Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});