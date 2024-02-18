gulf.controller('GulfQrCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, $ionicPopup, LoaderService, HeaderService, AppService, LoginService) {
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.contestCode = "";
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    $scope.amazonCode = "";
    $scope.QrCodeData = "";

    var userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData.usr_pk_id);
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || role == "27") {
            $state.go('Dashboard');
        }
    }

    $scope.addMechanic = function () {
        $state.go('AddMechanic');
    }
    $scope.myProfile = function () {
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }

    $scope.couponCode = function () {
        $state.go('CouponCode');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }
    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myorder = function () {
        $state.go('MyOrder');
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

    //header

    $scope.home = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }

    //footer

    console.log($state.params.obj);
    console.log("GulfQrCtrl");

    $scope.ScanBarCode = function () {

        $ionicPlatform.ready(function () {
            //$cordovaFlashlight.switchOn();
            $cordovaBarcodeScanner.scan({
                targetWidth: 300,
                targetHeight: 300
            }).then(function (imageData) {
                // alert("Hello");
                //alert(imageData.text);
                // var text = imageData.text.split("http://");
                // $scope.QrCodeData = text[1];

                var a = imageData.text.split('http://');
                var b = a[0];
                var c = a[1];
                console.log('b data', b);
                console.log('a data', a);
                if (b == '') {
                    console.log("if");
                    $scope.QrCodeData = c;
                } else {
                    console.log("else");
                    $scope.QrCodeData = imageData.text;
                }

                console.log("Barcode Format -> " + imageData.format);
                console.log("Cancelled -> " + imageData.cancelled);
            }, function (error) {
                console.log("An error happened -> " + error);
            });
        });
    };

    $scope.contestCodeScan = function () {
        $ionicPlatform.ready(function () {
            //$cordovaFlashlight.switchOn();
            $cordovaBarcodeScanner.scan({
                targetWidth: 300,
                targetHeight: 300
            }).then(function (imageData) {
                // alert("Hello");
                //alert(imageData.text);
                // $scope.contestCode = imageData.text
                // var text = imageData.text.split("http://");
                // $scope.contestCode = text[1];
                
                var a = imageData.text.split('http://');
                var b = a[0];
                var c = a[1];
                console.log('b data', b);
                console.log('a data', a);
                if (b == '') {
                    console.log("if");
                    $scope.contestCode = c;
                } else {
                    console.log("else");
                    $scope.contestCode = imageData.text;
                }

                console.log("Barcode Format -> " + imageData.format);
                console.log("Cancelled -> " + imageData.cancelled);
            }, function (error) {
                console.log("An error happened -> " + error);
            });
        });
    }

    $scope.submitCodes = function () {
        if ($scope.modeProject != null) {
            if ($scope.modeProject == 'S-oil') {
                $scope.submitSoilQrCodeData();
            }
            else if ($scope.modeProject == 'Gulf') {
                $scope.submitGulfQrCodeData();
            }
        }
        else if ($scope.modeProject == null) {
            $scope.submitGulfQrCodeData();
        }
    }

    $scope.submitGulfQrCodeData = function () {

        if (($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") &&
            ($scope.contestCode == null || $scope.contestCode == undefined || $scope.contestCode == "")) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_enter_QR_code
            });
            return;
        }

        if ($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) {
            // LoaderService.showLoading();
            if ($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null) {
                
                $scope.mechUserId = userData.usr_pk_id;
            } else {
                // $scope.mechUserId = userData.usr_pk_id;
                console.log('else part')
                if(userData.role_fk_id == 6){
                    $scope.mechUserId = $rootScope.CodeCheckInId;
                }else{
                    $scope.mechUserId = userData.usr_pk_id;
                }
                
            }

            console.log($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null)
            console.log($rootScope.CodeCheckInId);
            console.log($scope.QrCodeData);
            console.log($scope.mechUserId)
            console.log(userData.usr_pk_id)
            console.log( $scope.contestCode)

            CodeCheckInService.sendQrCode($scope.QrCodeData, $scope.mechUserId, userData.usr_pk_id, $scope.contestCode).then(function (result) {

                LoaderService.hideLoading();
                if ($scope.contestCode == "") {
                    $rootScope.promocodeEntered = false;
                } else {
                    $rootScope.promocodeEntered = true;
                }
                if (result != "") {

                    if (result.Status == true) {
                        $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
                        $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
                        $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;

                        // $rootScope.TotalNONmlpEarnedPoints = result.data[0].TotalNONmlpEarnedPoints;
                        // $rootScope.TotalmlpEarnedPoints = result.data[0].TotalmlpEarnedPoints;

                        $rootScope.Totalcodes = result.data[0].Totalcodes;
                        $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
                        $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
                        $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
                        $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;

                        $rootScope.promodeStatus = result.data[0].promocodevalid;
                        $rootScope.promocodePoints = result.data[0].prdctPointsPC;

                        /* prdctPointsPC, prdctPointsAM, promocodevalid, amazoncodevalid added on nov8*/
                        $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
                        $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
                        $rootScope.promocodevalid = result.data[0].promocodevalid;
                        $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;


                        if (result.data[0].Totalcodes == 1) {
                            $scope.msg = " ";
                            if ($rootScope.TotalValidCodes == 1) {
                                $scope.msg = "Your code has been checked-In successfully ";
                            }
                            if ($rootScope.TotalInvalidCodes == 1) {
                                $scope.msg = "You have entered wrong Code";
                            }
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                            }
                            if ($rootScope.TotalUsedCodes == 1) {
                                $scope.msg = "You have entered duplicate Code";
                            }
                            if ($rootScope.TotalInactiveCodes == 1) {
                                $scope.msg = "Hi, This code is expired and you can now earn loyalty benefits by scanning cash coupon itself.";
                            }

                            try {
                                TTS
                                    .speak({
                                        text: $scope.msg,
                                        locale: 'en-gb',
                                        rate: 0.95
                                    }, function () {

                                        $state.go('CodeCheckInCongratulations');

                                    },
                                        function (reason) {
                                            $state.go('CodeCheckInCongratulations');
                                        });
                            } catch (err) {
                                $state.go('CodeCheckInCongratulations');
                            }

                        } else {
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                                var alertPopup = $ionicPopup.alert({
                                    title: '<b> Error </b>',
                                    template: $scope.msg
                                });
                            }
                            else{
                                $state.go('CodeCheckInCongratulations');
                            }
                            // $state.go('MutipleCodeCheckInCongratulations');
                            // $state.go('CodeCheckInCongratulations');
                        }


                    } else {
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: show_msg
                        });
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: "Something Went Wrong Please, Try Again"
                    });
                }
            });
        }
        else {
            // if ($scope.amazonCode != "" && $scope.amazonCode != undefined) {

            //     LoaderService.showLoading();
            //     if ($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null) {
            //         $scope.mechUserId = userData.usr_pk_id;
            //     } else {
            //         $scope.mechUserId = $rootScope.CodeCheckInId;
            //     }
            //     CodeCheckInService.sendQrCode($scope.QrCodeData, $scope.mechUserId, userData.usr_pk_id, $scope.contestCode, $scope.amazonCode).then(function (result) {

            //         LoaderService.hideLoading();
            //         if ($scope.contestCode == "") {
            //             $rootScope.promocodeEntered = false;
            //         } else {
            //             $rootScope.promocodeEntered = true;
            //         }
            //         if (result != "") {
            //             // console.log(result.data[0].TotalValidCodes.length);
            //             // console.log(result.data[0].TotalInvalidCodes.length);
            //             // console.log(result.data[0].TotalUsedCodes.length);

            //             if (result.Status == true) {
            //                 $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserName;
            //                 $rootScope.MechanicNameForCodeCheckin = result.data[0].UserMobile;
            //                 $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;

            //                 // $rootScope.TotalNONmlpEarnedPoints = result.data[0].TotalNONmlpEarnedPoints;
            //                 // $rootScope.TotalmlpEarnedPoints = result.data[0].TotalmlpEarnedPoints;

            //                 $rootScope.Totalcodes = result.data[0].Totalcodes;
            //                 $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
            //                 $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
            //                 $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;

            //                 $rootScope.promodeStatus = result.data[0].promocodevalid;
            //                 $rootScope.promocodePoints = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
            //                 $rootScope.promocodevalid = result.data[0].promocodevalid;
            //                 $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;
            //                 if (result.data[0].Totalcodes == 1) {
            //                     $scope.msg = " ";
            //                     if ($rootScope.TotalValidCodes == 1) {
            //                         $scope.msg = "Your code has been checked-In successfully ";
            //                     }
            //                     if ($rootScope.TotalInvalidCodes == 1) {
            //                         $scope.msg = "You have entered wrong Code";
            //                     }
            //                     if ($rootScope.TotalUsedCodes == 1) {
            //                         $scope.msg = "You have entered duplicate Code";
            //                     }
            //                     if ($rootScope.TotalInactiveCodes == 1) {
            //                         $scope.msg = "Hi, this code is expired and you can now earn loyalty benefits by scanning cash coupon itself.";
            //                     }

            //                     try {
            //                         TTS
            //                             .speak({
            //                                 text: $scope.msg,
            //                                 locale: 'en-gb',
            //                                 rate: 0.95
            //                             }, function () {

            //                                 $state.go('CodeCheckInCongratulations');

            //                             },
            //                                 function (reason) {
            //                                     $state.go('CodeCheckInCongratulations');
            //                                 });
            //                     } catch (err) {
            //                         $state.go('CodeCheckInCongratulations');
            //                     }

            //                 } else {

            //                     //$state.go('MutipleCodeCheckInCongratulations');
            //                     $state.go('CodeCheckInCongratulations');
            //                 }


            //             } else {
            //                 var msg_code = result.message_code;
            //                 var show_msg = $scope.data.localAppLanguage[msg_code];
            //                 var alertPopup = $ionicPopup.alert({
            //                     title: '<b> Error </b>',
            //                     template: show_msg
            //                 });
            //             }
            //         } else {
            //             var alertPopup = $ionicPopup.alert({
            //                 title: '<b> Error </b>',
            //                 template: "Something Went Wrong Please, Try Again"
            //             });
            //         }
            //     });
            // } else {
            //     var alertPopup = $ionicPopup.alert({
            //         title: '<b> Error </b>',
            //         template: $scope.data.localAppLanguage.please_enter_QR_code
            //     });
            // }

        }
    };

    $scope.submitSoilQrCodeData = function () {

        if (($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") &&
            ($scope.contestCode == null || $scope.contestCode == undefined || $scope.contestCode == "")) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_enter_QR_code
            });
            return;
        }

        if ($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) {
            LoaderService.showLoading();
            if ($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null) {
                $scope.mechUserId = userData.usr_pk_id;
            } else {
                // $scope.mechUserId = userData.usr_pk_id;
                console.log('else part')
                if(userData.role_fk_id == 6){
                    $scope.mechUserId = $rootScope.CodeCheckInId;
                }else{
                    $scope.mechUserId = userData.usr_pk_id;
                }
                
            }

            console.log($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null)
            console.log($rootScope.CodeCheckInId);
            console.log($scope.QrCodeData);
            console.log($scope.mechUserId)
            console.log(userData.usr_pk_id)
            console.log( $scope.contestCode)

            CodeCheckInService.codeCheckinSoilNew($scope.QrCodeData, $scope.mechUserId, userData.usr_pk_id, $scope.contestCode).then(function (result) {

                LoaderService.hideLoading();
                if ($scope.contestCode == "") {
                    $rootScope.promocodeEntered = false;
                } else {
                    $rootScope.promocodeEntered = true;
                }
                if (result != "") {

                    if (result.Status == true) {
                        $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
                        $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
                        $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;

                        // $rootScope.TotalNONmlpEarnedPoints = result.data[0].TotalNONmlpEarnedPoints;
                        // $rootScope.TotalmlpEarnedPoints = result.data[0].TotalmlpEarnedPoints;

                        $rootScope.Totalcodes = result.data[0].Totalcodes;
                        $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
                        $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
                        $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
                        $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;

                        $rootScope.promodeStatus = result.data[0].promocodevalid;
                        $rootScope.promocodePoints = result.data[0].prdctPointsPC;

                        /* prdctPointsPC, prdctPointsAM, promocodevalid, amazoncodevalid added on nov8*/
                        $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
                        $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
                        $rootScope.promocodevalid = result.data[0].promocodevalid;
                        $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;


                        if (result.data[0].Totalcodes == 1) {
                            $scope.msg = " ";
                            if ($rootScope.TotalValidCodes == 1) {
                                $scope.msg = "Your code has been checked-In successfully ";
                            }
                            if ($rootScope.TotalInvalidCodes == 1) {
                                $scope.msg = "You have entered wrong Code";
                            }
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                            }
                            if ($rootScope.TotalUsedCodes == 1) {
                                $scope.msg = "You have entered duplicate Code";
                            }
                            if ($rootScope.TotalInactiveCodes == 1) {
                                $scope.msg = "Hi, This code is expired and you can now earn loyalty benefits by scanning cash coupon itself.";
                            }

                            try {
                                TTS
                                    .speak({
                                        text: $scope.msg,
                                        locale: 'en-gb',
                                        rate: 0.95
                                    }, function () {

                                        $state.go('CodeCheckInCongratulations');

                                    },
                                        function (reason) {
                                            $state.go('CodeCheckInCongratulations');
                                        });
                            } catch (err) {
                                $state.go('CodeCheckInCongratulations');
                            }

                        } else {
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                                var alertPopup = $ionicPopup.alert({
                                    title: '<b> Error </b>',
                                    template: $scope.msg
                                });
                            }
                            else{
                                $state.go('CodeCheckInCongratulations');
                            }
                            // $state.go('CodeCheckInCongratulations');
                        }


                    } else {
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: show_msg
                        });
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: "Something Went Wrong Please, Try Again"
                    });
                }
            });
        }
        else {
            // if ($scope.amazonCode != "" && $scope.amazonCode != undefined) {

            //     LoaderService.showLoading();
            //     if ($rootScope.CodeCheckInId == undefined || $rootScope.CodeCheckInId == "" || $rootScope.CodeCheckInId == null) {
            //         $scope.mechUserId = userData.usr_pk_id;
            //     } else {
            //         $scope.mechUserId = $rootScope.CodeCheckInId;
            //     }
            //     CodeCheckInService.codeCheckinSoilNew($scope.QrCodeData, $scope.mechUserId, userData.usr_pk_id, $scope.contestCode).then(function (result) {

            //         LoaderService.hideLoading();
            //         if ($scope.contestCode == "") {
            //             $rootScope.promocodeEntered = false;
            //         } else {
            //             $rootScope.promocodeEntered = true;
            //         }
            //         if (result != "") {
            //             // console.log(result.data[0].TotalValidCodes.length);
            //             // console.log(result.data[0].TotalInvalidCodes.length);
            //             // console.log(result.data[0].TotalUsedCodes.length);

            //             if (result.Status == true) {
            //                 $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserName;
            //                 $rootScope.MechanicNameForCodeCheckin = result.data[0].UserMobile;
            //                 $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;

            //                 // $rootScope.TotalNONmlpEarnedPoints = result.data[0].TotalNONmlpEarnedPoints;
            //                 // $rootScope.TotalmlpEarnedPoints = result.data[0].TotalmlpEarnedPoints;

            //                 $rootScope.Totalcodes = result.data[0].Totalcodes;
            //                 $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
            //                 $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
            //                 $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;

            //                 $rootScope.promodeStatus = result.data[0].promocodevalid;
            //                 $rootScope.promocodePoints = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
            //                 $rootScope.promocodevalid = result.data[0].promocodevalid;
            //                 $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;
            //                 if (result.data[0].Totalcodes == 1) {
            //                     $scope.msg = " ";
            //                     if ($rootScope.TotalValidCodes == 1) {
            //                         $scope.msg = "Your code has been checked-In successfully ";
            //                     }
            //                     if ($rootScope.TotalInvalidCodes == 1) {
            //                         $scope.msg = "You have entered wrong Code";
            //                     }
            //                     if ($rootScope.TotalUsedCodes == 1) {
            //                         $scope.msg = "You have entered duplicate Code";
            //                     }
            //                     if ($rootScope.TotalInactiveCodes == 1) {
            //                         $scope.msg = "Hi, this code is expired and you can now earn loyalty benefits by scanning cash coupon itself.";
            //                     }

            //                     try {
            //                         TTS
            //                             .speak({
            //                                 text: $scope.msg,
            //                                 locale: 'en-gb',
            //                                 rate: 0.95
            //                             }, function () {

            //                                 $state.go('CodeCheckInCongratulations');

            //                             },
            //                                 function (reason) {
            //                                     $state.go('CodeCheckInCongratulations');
            //                                 });
            //                     } catch (err) {
            //                         $state.go('CodeCheckInCongratulations');
            //                     }

            //                 } else {

            //                     //$state.go('MutipleCodeCheckInCongratulations');
            //                     $state.go('CodeCheckInCongratulations');
            //                 }
            //             } else {
            //                 var msg_code = result.message_code;
            //                 var show_msg = $scope.data.localAppLanguage[msg_code];
            //                 var alertPopup = $ionicPopup.alert({
            //                     title: '<b> Error </b>',
            //                     template: show_msg
            //                 });
            //             }
            //         } else {
            //             var alertPopup = $ionicPopup.alert({
            //                 title: '<b> Error </b>',
            //                 template: "Something Went Wrong Please, Try Again"
            //             });
            //         }
            //     });
            // } else {
            //     var alertPopup = $ionicPopup.alert({
            //         title: '<b> Error </b>',
            //         template: $scope.data.localAppLanguage.please_enter_QR_code
            //     });
            // }

        }
    };

    $scope.qrCodeBack = function () {


        var role = $rootScope.userData.role_fk_id;

        if (role == "5") {
            window.history.back();
        } else if (role == "6" || role == "27") {
            $state.go('CouponCode');
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Code Check In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});