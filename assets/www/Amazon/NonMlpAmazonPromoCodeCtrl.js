gulf.controller("NonMlpAmazonPromoCodeCtrl", function ($scope, $state, $rootScope, CodeCheckInService, ConverBase64, AddMechanicService, $ionicPopup, LoginService, LoaderService, UpdateMechanicProfileService, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $location, $anchorScroll, CodeCheckInService) {
    $scope.nonMlp;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Regular User") {
        $scope.nonMlp = true;
    } else if (userData && userData.user_category == "Loyalty User") {
        $scope.nonMlp = false;
    }



    $scope.submitPromoCode = function () {

        console.log($scope.searchData);

        if ($scope.promoCode != null || $scope.promoCode != undefined) {
            LoaderService.showLoading();
            CodeCheckInService.promocodeCheckin($scope.promoCode, $rootScope.userID).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];
                    if (result.Status == true) {
                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
                        });
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: "Something Went Wrong Please , Try Again"
                    });
                }
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Amazon Id"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Amazon Promo Code Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});