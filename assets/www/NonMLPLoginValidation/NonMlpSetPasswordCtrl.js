// gulf.controller('NonMlpSetPasswordCtrl', function ($scope, NonMlpServices, $rootScope, ConverBase64, $ionicPopup, HeaderService, $state, LoaderService, AppService, LoginService) {


//     $rootScope.encodedNonMlpUSerID = ConverBase64.convertBase64($rootScope.NonMlpUSerID);
//     //$rootScope.encodeNonMlpUSerIDLogin =ConverBase64.convertBase64(result.data[0].userId);
//     var mode = localStorage.getItem("mode");
//     $scope.modeProject = mode;
//     console.log($scope.modeProject);


//     $scope.NonMlpSetPassword = function () {


//         if ($scope.nonMlpnewPassword != "" && $scope.nonMlpnewPassword != undefined && $scope.nonMlpconformPassword != "" && $scope.nonMlpconformPassword != undefined) {

//             if ($scope.nonMlpnewPassword == $scope.nonMlpconformPassword) {
//                 // LoaderService.showLoading();
//                 // NonMlpServices.setPassword($rootScope.encodeNonMlpUSerIDLogin, $scope.nonMlpnewPassword, $scope.nonMlpconformPassword).then(function (result) {
//                 //     LoaderService.hideLoading();
//                 //     if (result.Status == true) {
//                 //         var alertPopup = $ionicPopup.alert({
//                 //             title: '<b> Success </b>',
//                 //             template: result.Message
//                 //         }).then(function () {
//                 //             if ($rootScope.user_category == "Loyalty User") {
//                 //                 LoginService.userLogin($rootScope.encoded_usd_mobile, $scope.nonMlpnewPassword).then(function (result) {
//                 //                     if (result.Status == true) {
//                 //                         localStorage.setItem("userData", JSON.stringify(result.Data[0]));
//                 //                         $rootScope.token = result.token;
//                 //                         console.log("login-token" + $rootScope.token);
//                 //                         localStorage.setItem("token", JSON.stringify(result.token));
//                 //                         $rootScope.userData = result.Data[0];
//                 //                         $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
//                 //                         $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
//                 //                         $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
//                 //                         $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
//                 //                         $rootScope.userRole = result.Data[0].role_fk_id;
//                 //                         if (result.Data[0].user_category == "Loyalty User") {
//                 //                             $rootScope.applogincount = result.Data[0].applogincount;
//                 //                             $rootScope.viewStatus = true;

//                 //                             if ((result.Data[0].usd_longitude == null || result.Data[0].usd_longitude == "" || result.Data[0].usd_longitude == undefined)
//                 //                                 || (result.Data[0].usd_firstname == null || result.Data[0].usd_firstname == "" || result.Data[0].usd_firstname == undefined)
//                 //                                 || (result.Data[0].usd_pincode == null || result.Data[0].usd_pincode == "" || result.Data[0].usd_pincode == undefined)
//                 //                                 || (result.Data[0].state_name == null || result.Data[0].state_name == "" || result.Data[0].state_name == undefined)
//                 //                                 || (result.Data[0].area_name == null || result.Data[0].area_name == "" || result.Data[0].area_name == undefined)
//                 //                                 || (result.Data[0].usd_latitude == null || result.Data[0].usd_latitude == "" || result.Data[0].usd_latitude == undefined)
//                 //                                 || (result.Data[0].usd_mobile == null || result.Data[0].usd_mobile == "" || result.Data[0].usd_mobile == undefined)
//                 //                                 || (result.Data[0].city_name == null || result.Data[0].city_name == "" || result.Data[0].city_name == undefined)
//                 //                                 || (result.Data[0].usd_address1 == null || result.Data[0].usd_address1 == "" || result.Data[0].usd_address1 == undefined)
//                 //                             ) {
//                 //                                 localStorage.removeItem('userData');
//                 //                                 localStorage.setItem("MlpTemporaryProfileData", JSON.stringify(result.Data[0]));
//                 //                                 $state.go('MlpRegistration');

//                 //                             } else {
//                 //                                 try {
//                 //                                     TTS
//                 //                                         .speak({
//                 //                                             text: result.Message,
//                 //                                             locale: 'en-gb',
//                 //                                             rate: 0.95
//                 //                                         }, function () {

//                 //                                             $state.go('MechanicHome');

//                 //                                         },
//                 //                                             function (reason) {
//                 //                                                 $state.go('MechanicHome');
//                 //                                             });
//                 //                                 } catch (err) {
//                 //                                     $state.go('MechanicHome');
//                 //                                 }
//                 //                             }


//                 //                         }

//                 //                     }

//                 //                 })

//                 //             } else {
//                 //                 $state.go('NonMlpRegistration');
//                 //             }

//                 //             // $state.go('NonMlpUserType');
//                 //         });


//                 //     } else {
//                 //         var alertPopup = $ionicPopup.alert({
//                 //             title: '<b> Error </b>',
//                 //             template: result.Message
//                 //         });
//                 //     }
//                 // });
//             } else {
//                 var alertPopup = $ionicPopup.alert({
//                     title: '<b> Error </b>',
//                     template: "Password and Confirm Password is not Matching"
//                 });
//             }


//         } else {
//             var alertPopup = $ionicPopup.alert({
//                 title: '<b> Error </b>',
//                 template: "Please Enter all mandatory Fields"
//             });
//         }



//     }

//     try {
//         if (AppService.enableTracking) {
//             _paq.push(['setDocumentTitle', "Non MLP Set Password Page"]);
//             _paq.push(['trackPageView']);
//         }
//     } catch (err) {
//         console.log(err);
//     }

// })
gulf.controller('NonMlpSetPasswordCtrl', function ($scope, NonMlpServices, $rootScope, ConverBase64, $ionicPopup, HeaderService, $state, LoaderService, AppService, LoginService) {

    $rootScope.encodedNonMlpUSerID = ConverBase64.convertBase64($rootScope.NonMlpUSerID);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.NonMlpSetPassword = function () {
        // Password validation regular expression
        var passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9]).{1,8}$/;
        if ($scope.nonMlpnewPassword && $scope.nonMlpconformPassword) {
            // if ($scope.nonMlpnewPassword && $scope.nonMlpconformPassword) {
                if ($scope.nonMlpnewPassword.length > 8 || $scope.nonMlpconformPassword.length > 8) {
                    // Password length should not be more than 8 characters
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: "Password should not be more than 8 characters."
                    });
                    return;
                }

            if ($scope.nonMlpnewPassword == $scope.nonMlpconformPassword) {
                if (passwordPattern.test($scope.nonMlpnewPassword)) {
                    LoaderService.showLoading();
                    NonMlpServices.setPassword($rootScope.encodeNonMlpUSerIDLogin,ConverBase64.convertBase64($scope.nonMlpnewPassword), ConverBase64.convertBase64($scope.nonMlpconformPassword)).then(function (result) {
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Success </b>',
                            template: result.Message
                        }).then(function () {
                            if ($rootScope.user_category == "Loyalty User") {
                                LoginService.userLogin($rootScope.encoded_usd_mobile, $scope.nonMlpnewPassword).then(function (result) {
                                    if (result.Status == true) {
                                        localStorage.setItem("userData", JSON.stringify(result.Data[0]));
                                        $rootScope.token = result.token;
                                        console.log("login-token" + $rootScope.token);
                                        localStorage.setItem("token", JSON.stringify(result.token));
                                        $rootScope.userData = result.Data[0];
                                        $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                        $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                        $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                        $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
                                        $rootScope.userRole = result.Data[0].role_fk_id;
                                        if (result.Data[0].user_category == "Loyalty User") {
                                            $rootScope.applogincount = result.Data[0].applogincount;
                                            $rootScope.viewStatus = true;

                                            if ((result.Data[0].usd_longitude == null || result.Data[0].usd_longitude == "" || result.Data[0].usd_longitude == undefined)
                                                || (result.Data[0].usd_firstname == null || result.Data[0].usd_firstname == "" || result.Data[0].usd_firstname == undefined)
                                                || (result.Data[0].usd_pincode == null || result.Data[0].usd_pincode == "" || result.Data[0].usd_pincode == undefined)
                                                || (result.Data[0].state_name == null || result.Data[0].state_name == "" || result.Data[0].state_name == undefined)
                                                || (result.Data[0].area_name == null || result.Data[0].area_name == "" || result.Data[0].area_name == undefined)
                                                || (result.Data[0].usd_latitude == null || result.Data[0].usd_latitude == "" || result.Data[0].usd_latitude == undefined)
                                                || (result.Data[0].usd_mobile == null || result.Data[0].usd_mobile == "" || result.Data[0].usd_mobile == undefined)
                                                || (result.Data[0].city_name == null || result.Data[0].city_name == "" || result.Data[0].city_name == undefined)
                                                || (result.Data[0].usd_address1 == null || result.Data[0].usd_address1 == "" || result.Data[0].usd_address1 == undefined)
                                            ) {
                                                localStorage.removeItem('userData');
                                                localStorage.setItem("MlpTemporaryProfileData", JSON.stringify(result.Data[0]));
                                                $state.go('MlpRegistration');

                                            } else {
                                                try {
                                                    TTS
                                                        .speak({
                                                            text: result.Message,
                                                            locale: 'en-gb',
                                                            rate: 0.95
                                                        }, function () {

                                                            $state.go('MechanicHome');

                                                        },
                                                            function (reason) {
                                                                $state.go('MechanicHome');
                                                            });
                                                } catch (err) {
                                                    $state.go('MechanicHome');
                                                }
                                            }


                                        }

                                    }

                                })

                            } else {
                                $state.go('NonMlpRegistration');
                            }

                            // $state.go('NonMlpUserType');
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
                    template: "Password and Confirm Password do not match."
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Please enter all mandatory fields."
            });
        }
    };

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Set Password Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});
