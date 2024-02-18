gulf.controller('NonMlpHomeCtrl', function ($scope, LoginService, $state, $rootScope, $cordovaInAppBrowser, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice,
    $ionicPlatform, AppService, AddMechanicService, DashboardService, NonMlpServices, HeaderService) {
    $scope.userName = $rootScope.userData.usd_firstname;
    $scope.userLanguage = JSON.parse(localStorage.getItem("Language"));
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {};
    $scope.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.data.language = JSON.parse(localStorage.getItem("swithcLanguage"));
    $scope.selectedLanguage = "";
    $scope.intervalId;
    $scope.data.mode = localStorage.getItem("mode");
    $rootScope.panPopupDismiss = false;
    // $scope.modeProject = $scope.data.mode;
    // console.log($scope.modeProject);

    logoutFunction = function (userId) {
        try {
            HeaderService.logout(userId).then(function (result) {
                if (result.Status == true) {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('mode');
                    // clearInterval($scope.intervalId);
                    $state.go('NewLoginForMLPAndNonMLP');
                } else {
                    localStorage.removeItem('userData');
                    localStorage.removeItem('mode');
                    // clearInterval($scope.intervalId);
                    $state.go('NewLoginForMLPAndNonMLP');
                }
            });

        } catch (e) {
            localStorage.removeItem('userData');
            localStorage.removeItem('mode');
            // clearInterval($scope.intervalId);
            $state.go('NewLoginForMLPAndNonMLP');

        }

    }
    AddMechanicService.getLanguages().then(function (result) {

        console.log("Lang" + result);
        if (result.Status == true) {
            $scope.AvailabelLanguage = result.Data;
        }
    });

    DashboardService.appMultiData($scope.data.language).then(function (result) {

        console.log("language" + result.data);
        if (result.Status == true || result.Status == 'true') {
            $scope.localAppLanguage = result.data;
            $scope.selectedLanguage = $scope.data.language;
            // console.log($scope.data.localAppLanguage);
            localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
            localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));

        }

    });

    // if ($scope.data.language == null || $scope.data.language == undefined || $scope.data.language == "") {
    //     DashboardService.appMultiData("English").then(function (result) {

    //         console.log("language" + result.data);
    //         if (result.Status == true || result.Status == 'true') {
    //             $scope.localAppLanguage = result.data;
    //             $scope.selectedLanguage = $scope.data.language;
    //             // console.log($scope.data.localAppLanguage);
    //             localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
    //             localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));

    //         }
    //     });
    // } else {
    //     DashboardService.appMultiData($scope.data.language).then(function (result) {

    //         console.log("language" + result.data);
    //         if (result.Status == true || result.Status == 'true') {
    //             $scope.localAppLanguage = result.data;
    //             $scope.selectedLanguage = $scope.data.language;
    //             // console.log($scope.data.localAppLanguage);
    //             localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
    //             localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));

    //         }
    //     });
    // }

    $scope.switchLanguage = function (newLang) {

        DashboardService.appMultiData(newLang).then(function (result) {

            console.log("language" + result.data);
            if (result.Status == true || result.Status == 'true') {
                $scope.localAppLanguage = result.data;
                $scope.selectedLanguage = newLang;
                // console.log($scope.data.localAppLanguage);
                localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
                localStorage.setItem("swithcLanguage", JSON.stringify(newLang));
            }

        });

    }
    // Handle the earlier version of app with multilingual.
    if ($scope.data.language == null || $scope.data.language == undefined) {
        $scope.selectedLanguage = userData.lang_name;
        // $scope.switchLanguage();
        DashboardService.appMultiData($scope.selectedLanguage).then(function (result) {

            console.log("language" + result.data);
            if (result.Status == true || result.Status == 'true') {
                $scope.localAppLanguage = result.data;
                $scope.selectedLanguage = $scope.data.language;
                // console.log($scope.data.localAppLanguage);
                localStorage.setItem("gulfUserAppLanguage", JSON.stringify(result.data));
                localStorage.setItem("swithcLanguage", JSON.stringify($scope.selectedLanguage));
    
            }
    
        });
    }
    else{
        console.log("line 143---",$scope.data.language);
        $scope.selectedLanguage = $scope.data.language;
        // $scope.switchLanguage();
    }

    checkMlpOrNonMlp = function () {

        NonMlpServices.getMechanicStatus($rootScope.userID).then(function (result) {
            if (result.Status) {
                if (result.mecValidationstatus == true) {
                    logoutFunction($rootScope.userID);
                }
            }
        });
    }

    checkMlpOrNonMlp();

    if ($scope.data.mode != null) {
        if ($scope.data.mode == 'S-oil') {
            $scope.modeProject = $scope.data.mode;
            $scope.modevalue = '1';
            NonMlpServices.pointSummeryNONMLPSoil($rootScope.userID, $scope.modevalue).then(function (result) {
                console.log("summery");
                console.log(result.Status);
                console.log("summery");
                console.log(result.Status);
                if (result.Status) {
                    console.log(result.data[0]);
                    $scope.pointsEarned = result.data[0].pointsEarned;
                    $scope.pointBalance = result.data[0].pointBalance;
                    $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                    $scope.cashpoints = result.data[0].cashpoints;
                } else {
    
                    $scope.pointsEarned = "";
                    $scope.pointBalance = "";
                    $scope.pointsRedeemed = "";
                    $scope.cashpoints = "";
                }
            });
        }
        else if ($scope.data.mode == 'Gulf') {
            $scope.modeProject = $scope.data.mode;
            $scope.modevalue = '0';
            NonMlpServices.pointSummeryNONMLPGulf($rootScope.userID, $scope.modevalue).then(function (result) {
                console.log("summery");
                console.log(result.Status);
                console.log("summery");
                console.log(result.Status);
                if (result.Status) {
                    console.log(result.data[0]);
                    $scope.pointsEarned = result.data[0].pointsEarned;
                    $scope.pointBalance = result.data[0].pointBalance;
                    $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                    $scope.cashpoints = result.data[0].cashpoints;
                } else {
    
                    $scope.pointsEarned = "";
                    $scope.pointBalance = "";
                    $scope.pointsRedeemed = "";
                    $scope.cashpoints = "";
                }
            });
        }
    }
    else if ($scope.data.mode == null) {
        console.log($scope.data.mode);
        $scope.modevalue = '0';
        LoginService.modeChangeApi('0').then(function (result) {
            console.log(result);

            if (result.Status == true) {
                console.log(result.data);
                $scope.modeProject = result.data;
                localStorage.setItem("mode", result.data);
            }
        });

        NonMlpServices.pointSummeryNONMLPGulf($rootScope.userID, $scope.modevalue).then(function (result) {
            console.log("summery");
            console.log(result.Status);
            console.log("summery");
            console.log(result.Status);
            if (result.Status) {
                console.log(result.data[0]);
                $scope.pointsEarned = result.data[0].pointsEarned;
                $scope.pointBalance = result.data[0].pointBalance;
                $scope.pointsRedeemed = result.data[0].pointsRedeemed;
                $scope.cashpoints = result.data[0].cashpoints;
            } else {

                $scope.pointsEarned = "";
                $scope.pointBalance = "";
                $scope.pointsRedeemed = "";
                $scope.cashpoints = "";
            }
        });
    }



    getHomeBannerFunctionNonMlp = function (userId) {

        DashboardService.getHomeBanner(userId).then(function (result) {
            if (result.Status == true && result.data.viewStatus == "No") {
                if (result.data.banner_url == null || result.data.banner_url == "" || result.data.banner_url == undefined) {
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;"></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px">',
                        scope: $scope,

                    });
                } else if (result.data.banner_url != null || result.data.banner_url != "" || result.data.banner_url != undefined) {
                    $rootScope.banner_url = result.data.banner_url;
                    $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                    console.log($scope.dashboardImg);
                    confirmPopup = $ionicPopup.show({
                        template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;" ></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px" ng-click="goToBannerUrl()">',
                        scope: $scope,
                    });
                }
            } else {
                // if (result.data.banner_url == null || result.data.banner_url == "") {
                //     $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                //     console.log($scope.dashboardImg);
                //     confirmPopup = $ionicPopup.show({
                //         template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;"></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px">',
                //         scope: $scope,

                //     });               
                // } else {
                //     $rootScope.banner_url = result.data.banner_url;
                //     $scope.dashboardImg = AppService.url + result.data.bannerImgPath;
                //     console.log($scope.dashboardImg);
                //     confirmPopup = $ionicPopup.show({
                //         template: '<i class=" " ng-click="closePopup()"><img src="img/close.png" style=" width: 30px;float: right;margin-bottom: 3px;" ></i>' + ' <img src="' + $scope.dashboardImg + '" alt="dashboard-1" style="width:100%;height:300px" ng-click="goToBannerUrl()">',
                //         scope: $scope,
                //     });
                // }   
            }
        });
    }






    try {
        DashboardService.nonmlpUsertype($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                if (result.userTypeAssigned == false) {
                    $state.go('UpdateUserType');
                } else {
                    //check banner if userType Updated
                    if (userData && userData.usr_pk_id) {
                        console.log("userData userData", userData)
                        var userId = ConverBase64.convertBase64(userData.usr_pk_id);
                        console.log("$rootScope.viewStatus----", $rootScope.viewStatus);
                        if ($rootScope.viewStatus == true) {
                            try {
                                // $scope.intervalId = setInterval(() => getHomeBannerFunctionNonMlp(userId), 5000);
                                getHomeBannerFunctionNonMlp(userId);
                                // $rootScope.viewStatus = false;
                            } catch (ex) {

                            }
                        }
                    }

                }

            }
        });



    } catch (err) {

    }




    DashboardService.notificationCount($rootScope.userID).then(function (result) {
        if (result.Status) {
            if (result.Data.NotificationCount > 0) {

                $scope.shownotification = true;
                $scope.notificationCount = result.Data.NotificationCount;
            } else {
                $scope.shownotification = false;
            }

        } else {

        }


    });


    var confirmPopup;



    $scope.closePopup = function () {
        confirmPopup.close();
    };

    $scope.goToBannerUrl = function () {
        var options = {
            location: 'yes'
        };

        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowser.open($rootScope.banner_url, '_blank', options)
                .then(function (event) {
                    // success
                })
                .catch(function (event) {
                    // error
                });
        }, false);

    }



    //Get NON MLP Trasaction Points Summery Start
    // if ($scope.data.mode != null) {
    //     if ($scope.data.mode == 'S-oil') {
    //         $scope.modevalue = '1';
    //     }
    //     else if ($scope.data.mode == 'Gulf') {
    //         $scope.modevalue = '0';
    //     }
    // }
    // else if ($scope.data.mode == null) {
    //     $scope.modevalue = '0';
    // }
    // console.log($scope.modevalue);
    // NonMlpServices.pointSummeryNONMLP($rootScope.userID, $scope.modevalue).then(function (result) {
    //     console.log("summery");
    //     console.log(result.Status);
    //     if (result.Status) {
    //         console.log(result.data[0]);
    //         $scope.pointsEarned = result.data[0].pointsEarned;
    //         $scope.pointBalance = result.data[0].pointBalance;
    //         $scope.pointsRedeemed = result.data[0].pointsRedeemed;
    //     } else {

    //         $scope.pointsEarned = "";
    //         $scope.pointBalance = "";
    //         $scope.pointsRedeemed = "";
    //     }
    // });

    $scope.modeChange = function (modevalue) {
        //   console.log(modeProject);

        if (modevalue == 'Gulf') {
            modevalue = '0';
            console.log(modevalue);
            modeChangeApiCall(modevalue);
        }
        if (modevalue == 'S-oil') {
            modevalue = '1';
            console.log(modevalue);
            modeChangeApiCall(modevalue);
        }
    }

    modeChangeApiCall = function (mode) {
        LoginService.modeChangeApi(mode).then(function (result) {
            console.log(result);

            if (result.Status == true) {
                console.log(result.data);
                $scope.modeProject = result.data;
                localStorage.setItem("mode", result.data);
            }
        });
    }

    //Get NON MLP Trasaction Points Summery end

    $scope.goTofacebook = function () {
        var options = {
            location: 'yes'
        };

        document.addEventListener("deviceready", function () {

            $cordovaInAppBrowser.open('https://m.facebook.com/gulfmastermechanic/  ', '_blank', options)
                .then(function (event) {
                    // success
                })
                .catch(function (event) {
                    // error
                });
        }, false);
    }


    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
        if ($state.current.name == "NonMlpHome") {
            ionic.Platform.exitApp();
        }

    });


    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Home Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }


});