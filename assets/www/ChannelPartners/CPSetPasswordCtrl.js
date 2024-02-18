gulf.controller('CPSetPasswordCtrl', function ($scope, ChannelPartnersServices, $rootScope, ConverBase64, $ionicPopup, HeaderService, $state, LoaderService, AppService) {


    console.log('CPSetPasswordCtrl', $rootScope.CPUSerID);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.cpSetPassword = function () {

        if ($scope.newPasswordCP != "" && $scope.newPasswordCP != undefined && $scope.conformPasswordCP != "" && $scope.conformPasswordCP != undefined) {

            if ($scope.newPasswordCP == $scope.conformPasswordCP) {
                // $state.go('NewLoginForMLPAndNonMLP');
                LoaderService.showLoading();
                ChannelPartnersServices.setPassword($rootScope.CPUSerID, $scope.newPasswordCP, $scope.conformPasswordCP).then(function (result) {
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Success </b>',
                            template: result.Message
                        }).then(function () {
                            //$state.go('NewLoginForMLPAndNonMLP');
                            //NonMlpRegistration
                            $state.go('NonMlpRegistration');
                        });


                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: result.Message
                        });
                    }
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: "Password and Confirm Password is not Matching"
                });
            }


        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Please Enter all mandatory Fields"
            });
        }



    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Set password Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})
