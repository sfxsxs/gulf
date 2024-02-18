gulf.controller('GkSetPasswordCtrl', function ($scope, NonMlpServices, $rootScope, ConverBase64, $ionicPopup, HeaderService, $state, LoaderService, AppService) {



    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.NonMlpSetPassword = function () {
        var passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>])(?=.*[0-9]).{1,8}$/;


        if ($scope.nonMlpnewPassword != "" && $scope.nonMlpnewPassword != undefined && $scope.nonMlpconformPassword != "" && $scope.nonMlpconformPassword != undefined) {

            if ($scope.nonMlpnewPassword == $scope.nonMlpconformPassword) {
                if (passwordPattern.test($scope.nonMlpnewPassword)) {
                LoaderService.showLoading();
                NonMlpServices.setPassword($rootScope.userID, ConverBase64.convertBase64($scope.nonMlpnewPassword), ConverBase64.convertBase64($scope.nonMlpconformPassword)).then(function (result) {
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Success </b>',
                            template: result.Message
                        }).then(function () {
                            $state.go('GkRegistration');
                            //$state.go('SelectLanguage');
                        });


                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: result.Message
                        });
                    }
                });
            } else {
                // Password does not meet the criteria
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: "Password must contain at least one uppercase letter, one special character, one number, and be 8 characters or less."
                });
            }
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
            _paq.push(['setDocumentTitle', "GK Set Password Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})
