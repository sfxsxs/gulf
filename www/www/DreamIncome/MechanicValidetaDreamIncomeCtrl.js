gulf.controller("MechanicValidetaDreamIncomeCtrl", function ($scope, $state, $rootScope, ConverBase64, AddMechanicService, $ionicPopup, LoginService, LoaderService, UpdateMechanicProfileService, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $location, $anchorScroll, CodeCheckInService) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.searchByIdOrMobileNumber = function () {

        console.log($scope.searchData);

        if ($scope.searchData != null || $scope.searchData != undefined) {
            LoaderService.showLoading();
            AddMechanicService.checkReferral("Myprofile", ConverBase64.convertBase64($scope.searchData), "").then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {
                        $rootScope.mechanicUserIdForDreamIncome = ConverBase64.convertBase64(result.data[0].usr_pk_id);
                        // $state.go('DreamIncomeMain')
                        LoaderService.showLoading();
                        LoginService.myProfileData($rootScope.mechanicUserIdForDreamIncome).then(function (result) {
                            console.log(result);
                            LoaderService.hideLoading();
                            if (result != "") {
                                if (result.Status == true) {
                                    $scope.mechanic_type = result.Data[0].mechanic_type;
                                    if ($scope.mechanic_type == null || $scope.mechanic_type == "") {
                                        $state.go('TypeSelcetion');
                                    } else {
                                        $state.go('DreamIncomeMain');
                                    }
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
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mobile/Id"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Mechanic Validation Dream Income Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});