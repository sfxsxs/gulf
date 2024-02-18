gulf.controller('UpdateUserTypeCtrl', function ($scope, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, $cordovaDevice, $ionicPlatform, AppService, NonMlpServices) {

    //$scope.mobileNumber = $rootScope.NonMlpRecievedMobile ;
    $scope.data = {};
    //$rootScope.NonMlpUserID;
    var userId;
    var roleId;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.usr_pk_id) {
        console.log("userData userData", userData)
        userId = ConverBase64.convertBase64(userData.usr_pk_id);
        roleId = userData.role_fk_id;

    }

    $scope.UpdateUserType = function () {
        // alert($scope.data.userType);

        if ($scope.data.updateUserType != "" && $scope.data.updateUserType != null && $scope.data.updateUserType != undefined) {





            LoaderService.showLoading();
            NonMlpServices.updateUsertypenmlp(userId, $scope.data.updateUserType).
                then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
                        });
                        $state.go('NonMlpHome');


                    }
                    else {

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
            _paq.push(['setDocumentTitle', "Non MLP Update User Type Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});