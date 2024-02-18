gulf.controller("redeemCtrl", function ($scope, $state, $rootScope, ConverBase64, AddMechanicService, $ionicPopup, LoginService, LoaderService, UpdateMechanicProfileService, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $location, $anchorScroll, CodeCheckInService) {


    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.redeemNowMechanic = function () {

        LoaderService.showLoading();
        AddMechanicService.checkMapping(ConverBase64.convertBase64($scope.searchData)).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {
                    //                         console.log(result.data[0]);
                    //                         alert(result.data[0].pointBalance);
                    var pointsEarned = result.data.uad_totalpoints_balance;
                    if (parseInt(pointsEarned) > 500) {
                        localStorage.setItem("mechanicUserID", ConverBase64.convertBase64(result.data.usr_pk_id));
                        $rootScope.FhIdofMechanic = ConverBase64.convertBase64(result.data.usr_unique_id);

                        LoaderService.showLoading();
                        var mob = result.data.mobile;
                        mob = ConverBase64.convertBase64(mob);
                        CodeCheckInService.sendOTP(mob).then(function (result) {
                            LoaderService.hideLoading();
                            if (result != "") {
                                console.log(result);
                                if (result.Status == true) {
                                    $rootScope.redeemOTPMobile = result.data[0].usd_mobile;

                                    $state.go('redeemMechOTP');
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
                            title: '',
                            template: "Sorry, your Mechanic need to earn atleast 500 points to be eligible for redemption. Visit Dashboard, click on 'Points Earned' to know your Mechanic's number of points earned."
                        });
                        alertPopup.then(function (res) {
                            $state.go('Home');
                        });
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

    }

    $scope.searchByIdOrMobileNumber = function () {

        console.log($scope.searchData);
        console.log($rootScope.userID);

        if ($scope.searchData != null || $scope.searchData != undefined) {
            var encodeSearchData = ConverBase64.convertBase64($scope.searchData);
            if (parseInt(pointsEarned) > 500) {
                CodeCheckInService.checkRedemptionBlockedOrNot(encodeSearchData, $rootScope.userID).then(function (result) {
                    if (result.Status == true && result.blockstatus == "No") {
                        $scope.redeemNowMechanic();
                    } else {
                        $ionicPopup.alert({
                            template: result.Alert
                        });
                    }
                });
            }else {
                        var alertPopup = $ionicPopup.alert({
                            title: '',
                            template: "Sorry, your Mechanic need to earn atleast 500 points to be eligible for redemption. Visit Dashboard, click on 'Points Earned' to know your Mechanic's number of points earned."
                        });
                        alertPopup.then(function (res) {
                            $state.go('Home');
                        });
                    }


        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mobile/Id"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Mechanical Redeem Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});