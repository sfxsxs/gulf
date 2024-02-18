gulf.controller('scanQrCodeNonMlpCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeCheckInService, $ionicPopup, LoaderService, $rootScope, ConverBase64, AppService, LoginService,PanUpdateService) {

    $scope.nonMlpEncodedUserId = $rootScope.userData.usr_pk_id;
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.amazoncode = "";
    $scope.contestCode = "";
    $scope.submitText = $scope.data.localAppLanguage.submit;
    $scope.qrsubmited = false;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

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
        //alert("tryr");
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
    
    $scope.submitCodes = function (){
        console.log(mode);
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
        console.log($scope.QrCodeData);
        console.log($scope.contestCode);
        if (($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") &&
            ($scope.contestCode == null || $scope.contestCode == undefined || $scope.contestCode == "")) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_enter_QR_code
            });
            return;
        }

        if ($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) {
            // $scope.submitText = $scope.data.localAppLanguage.submit;
            $scope.submitText = "submitting...";
            $scope.qrsubmited = true;
            LoaderService.showLoading();
            
            CodeCheckInService.sendQrCode($scope.QrCodeData, $scope.nonMlpEncodedUserId, $scope.nonMlpEncodedUserId, $scope.contestCode).then(function (result) {
                
                if (result != "") {

                    if (result.Status == true) {
                        $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
                        $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
                        $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;
                        $rootScope.Totalcodes = result.data[0].Totalcodes;
                        $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
                        $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
                        $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
                        $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
                        $rootScope.TotalbalancePointstilldate = result.data[0].TotalbalancePointstilldate;
                        $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
                        $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
                        $rootScope.promocodevalid = result.data[0].promocodevalid;
                        $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;

                        //$rootScope.TotalEarnedPointsForCodeCheckin=result.data[0].TotalEarnedPointsViaScan;
                        if (result.data[0].Totalcodes == 1) {
                            $scope.msg = " ";
                            if ($rootScope.TotalValidCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.code_check_in_successful;
                            }
                            if ($rootScope.TotalInvalidCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.sorry_you_seem_to_have_entered_an_invalid_code_please_check_and_enter_the_correct_code;
                            }
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                            }
                            if ($rootScope.TotalUsedCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.sorry_this_code_is_already_used
                            }

                            try {
                                TTS
                                    .speak({
                                        text: $scope.msg,
                                        locale: 'en-gb',
                                        rate: 0.95
                                    }, function () {

                                        LoaderService.hideLoading();
                                        $scope.submitText = $scope.data.localAppLanguage.submit;
                                        $scope.qrsubmited = false;
                                        $state.go('singelCodeCheckIn');

                                    },
                                        function (reason) {
                                            LoaderService.hideLoading();
                                            $scope.submitText = $scope.data.localAppLanguage.submit;
                                            $scope.qrsubmited = false;
                                            $state.go('singelCodeCheckIn');
                                        });
                            } catch (err) {
                                LoaderService.hideLoading();
                                $scope.submitText = $scope.data.localAppLanguage.submit;
                                $scope.qrsubmited = false;
                                $state.go('singelCodeCheckIn');
                            }

                        } else {
                            LoaderService.hideLoading();
                            $scope.submitText = $scope.data.localAppLanguage.submit;
                            $scope.qrsubmited = false;
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                                var alertPopup = $ionicPopup.alert({
                                    title: '<b> Error </b>',
                                    template: $scope.msg
                                });
                            }
                            else{
                                $state.go('singelCodeCheckIn');
                            }
                        }


                    } else {
                        LoaderService.hideLoading();
                        $scope.submitText = $scope.data.localAppLanguage.submit;
                        $scope.qrsubmited = false;
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: show_msg
                        });
                    }
                } else {
                    LoaderService.hideLoading();
                    $scope.submitText = $scope.data.localAppLanguage.submit;
                    $scope.qrsubmited = false;

                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: "Something Went Wrong Please, Try Again"
                    });
                }
            });
        } else {

            // if ($scope.amazoncode != "" && $scope.amazoncode != undefined) {
            //     LoaderService.showLoading();
            //     CodeCheckInService.sendQrCode($scope.QrCodeData, $scope.nonMlpEncodedUserId, $scope.nonMlpEncodedUserId, $scope.contestCode, $scope.amazoncode).then(function (result) {
            //         LoaderService.hideLoading();
            //         if (result != "") {
            //             // console.log(result.data[0].TotalValidCodes.length);
            //             // console.log(result.data[0].TotalInvalidCodes.length);
            //             // console.log(result.data[0].TotalUsedCodes.length);

            //             if (result.Status == true) {
            //                 $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
            //                 $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
            //                 $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;
            //                 $rootScope.Totalcodes = result.data[0].Totalcodes;
            //                 $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
            //                 $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
            //                 $rootScope.TotalbalancePointstilldate = result.data[0].TotalbalancePointstilldate;
            //                 $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
            //                 $rootScope.promocodevalid = result.data[0].promocodevalid;
            //                 $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;
            //                 $rootScope.promocodemsg = result.data[0].promocodemsg;
            //                 $rootScope.amazoncodemsg = result.data[0].amazoncodemsg;



            //                 //$rootScope.TotalEarnedPointsForCodeCheckin=result.data[0].TotalEarnedPointsViaScan;
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

            //                     try {
            //                         TTS
            //                             .speak({
            //                                 text: $scope.msg,
            //                                 locale: 'en-gb',
            //                                 rate: 0.95
            //                             }, function () {

            //                                 $state.go('singelCodeCheckIn');

            //                             },
            //                                 function (reason) {
            //                                     $state.go('singelCodeCheckIn');
            //                                 });
            //                     } catch (err) {
            //                         $state.go('singelCodeCheckIn');
            //                     }

            //                 } else {

            //                     $state.go('singelCodeCheckIn');
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
            // $scope.submitText = $scope.data.localAppLanguage.submit;
            $scope.submitText = "submitting...";
            $scope.qrsubmited = true;
            LoaderService.showLoading();
            CodeCheckInService.codeCheckinSoilNew($scope.QrCodeData, $scope.nonMlpEncodedUserId, $scope.nonMlpEncodedUserId, $scope.contestCode).then(function (result) {
                
                if (result != "") {

                    if (result.Status == true) {
                        $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
                        $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
                        $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;
                        $rootScope.Totalcodes = result.data[0].Totalcodes;
                        $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
                        $rootScope.TotalInvalidCodes = result.data[0].TotalInvalidCodes;
                        $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
                        $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
                        $rootScope.TotalbalancePointstilldate = result.data[0].TotalbalancePointstilldate;
                        $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
                        $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
                        $rootScope.promocodevalid = result.data[0].promocodevalid;
                        $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;

                        //$rootScope.TotalEarnedPointsForCodeCheckin=result.data[0].TotalEarnedPointsViaScan;
                        if (result.data[0].Totalcodes == 1) {
                            $scope.msg = " ";
                            if ($rootScope.TotalValidCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.code_check_in_successful;
                            }
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                            }
                            if ($rootScope.TotalInvalidCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.sorry_you_seem_to_have_entered_an_invalid_code_please_check_and_enter_the_correct_code;
                            }
                            if ($rootScope.TotalUsedCodes == 1) {
                                $scope.msg = $scope.data.localAppLanguage.sorry_this_code_is_already_used
                            }

                            try {
                                TTS
                                    .speak({
                                        text: $scope.msg,
                                        locale: 'en-gb',
                                        rate: 0.95
                                    }, function () {
                                        LoaderService.hideLoading();
                                        $scope.submitText = $scope.data.localAppLanguage.submit;
                                        $scope.qrsubmited = false;
                                        $state.go('singelCodeCheckIn');

                                    },
                                        function (reason) {
                                            LoaderService.hideLoading();
                                            $scope.submitText = $scope.data.localAppLanguage.submit;
                                            $scope.qrsubmited = false;
                                            $state.go('singelCodeCheckIn');
                                        });
                            } catch (err) {
                                LoaderService.hideLoading();
                                $scope.submitText = $scope.data.localAppLanguage.submit;
                                $scope.qrsubmited = false;
                                $state.go('singelCodeCheckIn');
                            }

                        } else {
                            LoaderService.hideLoading();
                            $scope.submitText = $scope.data.localAppLanguage.submit;
                            $scope.qrsubmited = false;
                            if ($rootScope.TotalInvalidCodes > 0) {
                                $scope.msg = result.data[0].qrCodemsg;
                                var alertPopup = $ionicPopup.alert({
                                    title: '<b> Error </b>',
                                    template: $scope.msg
                                });
                            }
                            else{
                                $state.go('singelCodeCheckIn');
                            }
                            // $state.go('singelCodeCheckIn');
                        }


                    } else {
                        LoaderService.hideLoading();
                        $scope.submitText = $scope.data.localAppLanguage.submit;
                        $scope.qrsubmited = false;
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: show_msg
                        });
                    }
                } else {
                    LoaderService.hideLoading();
                    $scope.submitText = $scope.data.localAppLanguage.submit;
                    $scope.qrsubmited = false;
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: "Something Went Wrong Please, Try Again"
                    });
                }
            });
        } else {

            // if ($scope.amazoncode != "" && $scope.amazoncode != undefined) {
            //     LoaderService.showLoading();
            //     CodeCheckInService.sendQrCode($scope.QrCodeData, $scope.nonMlpEncodedUserId, $scope.nonMlpEncodedUserId, $scope.contestCode, $scope.amazoncode).then(function (result) {
            //         LoaderService.hideLoading();
            //         if (result != "") {
            //             // console.log(result.data[0].TotalValidCodes.length);
            //             // console.log(result.data[0].TotalInvalidCodes.length);
            //             // console.log(result.data[0].TotalUsedCodes.length);

            //             if (result.Status == true) {
            //                 $rootScope.MechanicMobileForCodeCheckin = result.data[0].UserMobile;
            //                 $rootScope.MechanicNameForCodeCheckin = result.data[0].UserName;
            //                 $rootScope.TotalEarnedPointsForCodeCheckin = result.data[0].TotalEarnedPoints;
            //                 $rootScope.Totalcodes = result.data[0].Totalcodes;
            //                 $rootScope.TotalValidCodes = result.data[0].TotalValidCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
            //                 $rootScope.TotalInactiveCodes = result.data[0].TotalInactiveCodes;
            //                 $rootScope.TotalUsedCodes = result.data[0].TotalUsedCodes;
            //                 $rootScope.TotalbalancePointstilldate = result.data[0].TotalbalancePointstilldate;
            //                 $rootScope.prdctPointsPC = result.data[0].prdctPointsPC;
            //                 $rootScope.prdctPointsAM = result.data[0].prdctPointsAM;
            //                 $rootScope.promocodevalid = result.data[0].promocodevalid;
            //                 $rootScope.amazoncodevalid = result.data[0].amazoncodevalid;
            //                 $rootScope.promocodemsg = result.data[0].promocodemsg;
            //                 $rootScope.amazoncodemsg = result.data[0].amazoncodemsg;



            //                 //$rootScope.TotalEarnedPointsForCodeCheckin=result.data[0].TotalEarnedPointsViaScan;
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

            //                     try {
            //                         TTS
            //                             .speak({
            //                                 text: $scope.msg,
            //                                 locale: 'en-gb',
            //                                 rate: 0.95
            //                             }, function () {

            //                                 $state.go('singelCodeCheckIn');

            //                             },
            //                                 function (reason) {
            //                                     $state.go('singelCodeCheckIn');
            //                                 });
            //                     } catch (err) {
            //                         $state.go('singelCodeCheckIn');
            //                     }

            //                 } else {

            //                     $state.go('singelCodeCheckIn');
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
        window.history.back();
    }

    if($scope.modeProject == 'Gulf'){
        
        PanUpdateService.showPANPopup($scope.nonMlpEncodedUserId).then(function(response){
            if(response.data.Status == true){
                if(response.data.Data.pan_availability == 2){
                    $state.go('PanSubmittedMsg',{status:'Rejected'}) 
                }else{

                    if($rootScope.panPopupDismiss == false){
                        $state.go('PanUpdatePopup');
                    }
                }
            }
        })
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Scan QR Code Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});