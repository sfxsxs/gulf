gulf.controller('ChangePasswordCtrl', function ($scope, LoginService, $rootScope, ConverBase64, $ionicPopup, HeaderService, $state, AppService) {
    console.log($rootScope.userID);
    //$scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.Qa = false;
    if (role == "21") {
        $scope.Qa = true;
    }
    $scope.codeVerification = function () {
        $state.go('CodeVerification');
        /*         var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: "Coming Soon"
                });*/

    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }
    $scope.changePassword = function () {


        if ($scope.oldPassword != "" && $scope.oldPassword != undefined && $scope.newPassword != "" && $scope.newPassword != undefined && $scope.conformPassword != "" && $scope.conformPassword != undefined) {

            if ($scope.newPassword == $scope.conformPassword) {

                LoginService.changePassword($rootScope.userID, $scope.oldPassword, $scope.newPassword, $scope.conformPassword).then(function (result) {

                    if (result.Status == true) {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Success </b>',
                            template: result.Message
                        });
                        if (userData && userData.user_category == "Loyalty User") {
                            $state.go('MechDashboard');
                        } else if (role == "6" || role == "12" || role == "13" || role == "14" || role == "28" || role == "30" || role == "27") {
                            $state.go('Dashboard');
                        } else if (role == "21") {
                            $state.go('CodeVerification');
                        }
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
            _paq.push(['setDocumentTitle', "Change Password Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})
