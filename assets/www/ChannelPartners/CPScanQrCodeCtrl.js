gulf.controller('CPScanQrCodeCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, ChannelPartnersServices, $ionicPopup, LoaderService, $rootScope, ConverBase64, AppService, CodeCheckInService, LoginService) {

    $scope.nonMlpEncodedUserId = ConverBase64.convertBase64($rootScope.userData.usr_pk_id);
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.submitText = $scope.data.localAppLanguage.submit;
    $scope.qrsubmited = false;
    var userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData.usr_pk_id);
    // $scope.isScanned = false;
    // $scope.paymentType;
    $scope.amazonCode = "";
    $scope.promotxt = false;
    $scope.promoselect = true;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);


    $scope.getPromoCodes = function (custId) {
        LoaderService.showLoading();
        ChannelPartnersServices.getPendingPromocodes(custId).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result && result.Status == true) {
                $scope.promoCodeList = result.Data;
                $scope.contestCode = result.Data[0].promo_code;
            }
        });
    }
    $scope.onPromoChange = function () {
        console.log($scope.contestCode);
        if ($scope.contestCode == "Enter Promocode") {
            $scope.promoselect = false;
            $scope.promotxt = true;
            $scope.contestCode = "";

        } else {
            $scope.promotxt = false;
            $scope.promoselect = true;
        }

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

    
    $scope.getPromoCodes($scope.nonMlpEncodedUserId);


    $scope.ScanBarCode = function () {
        console.log("ScanBarCode -> ");

        $ionicPlatform.ready(function () {
            console.log("ionicPlatform.ready -> ");
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

                // $scope.QrCodeData = imageData.text
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
                // $scope.contestCode = imageData.text;
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

    $scope.submitRequest = function () {

        if ($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Alert! </b>',
                template: $scope.data.localAppLanguage.please_enter_QR_code
            });
        } else if ($scope.paymentType == null || $scope.paymentType == undefined || $scope.paymentType == "") {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Alert! </b>',
                template: "Please select Cashback Type"
            });
        } else {

        }
    }

    // $scope.DBT=function(){

    //     $state.go('CPBankAccountDetails');
    // }
    //  $scope.paytm=function(){


    //    var confirmPopup = $ionicPopup.confirm({
    //      title: 'Paytm',
    //      template: 'Are you sure?'
    //   });

    //   confirmPopup.then(function(res) {
    //      if(res) {
    //               $scope.cashbackType="paytm";

    //                 LoaderService.showLoading();
    // ChannelPartnersServices.customerOrderPlacing($rootScope.wtencodeNonMlpUSerIDLogin,$scope.cashbackType,"",
    //                                               "","","",$rootScope.customerAmount).then(function (result)
    //                    {
    //                             LoaderService.hideLoading();
    //                             if(result.Status == true){
    //                                 var alertPopup = $ionicPopup.alert({
    //                                         template: result.Message
    //                                     });

    //                             }else{
    //                                  var alertPopup = $ionicPopup.alert({
    //                                         template: result.Message
    //                                     });
    //                             }

    //                     });
    //      } else {
    //         console.log("not sure");
    //      }
    //   });


    // }
    $scope.submitCodes = function (){
        if ($scope.modeProject != null) {
            if ($scope.modeProject == 'S-oil') {
                $scope.submitSoilCodes();
            }
            else if ($scope.modeProject == 'Gulf') {
                $scope.submitGulfCodes();
            }
        }
        else if ($scope.modeProject == null) {
            $scope.submitGulfCodes();
        }
    }

    $scope.submitGulfCodes = function () {
        
        if ($scope.contestCode == null || $scope.contestCode == undefined) {
            $scope.contestCode = "";
        }
        if ($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") {
            $scope.QrCodeData = "";
        }

        
        if ($scope.QrCodeData != "" || $scope.contestCode != "") {

            $scope.submitText = "submitting...";
            $scope.qrsubmited = true;
            LoaderService.showLoading();

            CodeCheckInService.sendQrCode($scope.QrCodeData, userData.usr_pk_id, userData.usr_pk_id, $scope.contestCode).then(function (result) {
                LoaderService.hideLoading();
                $scope.submitText = $scope.data.localAppLanguage.submit;
                $scope.qrsubmited = false;
                if (result != "") {
                    console.log("result submitQrCodeData");
                    console.log(result);

                    //$scope.points= 10;
                    var msg = "";
                    if (result.data[0].TotalEarnedPoints > 0) {
                        if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {

                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg + result.data[0].promocodemsg ;
                            msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg ;

                            $state.go('CPScanCodeCheckInResult');
                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg + result.data[0].promocodemsg;
                            msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode == undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg + result.data[0].qrCodemsg ;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg + result.data[0].qrCodemsg;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg ;

                            $state.go('CPScanCodeCheckInResult');

                        }
                        $rootScope.customerAmount = result.data[0].TotalEarnedPoints;
                        //$rootScope.congratsMsg=result.Message;


                        //      var alertPopup = $ionicPopup.alert({
                        //     title: '<b> Result </b>',
                        //     template: msg
                        // }).then(function(){
                        //   $rootScope.customerAmount=result.Data.totalpoints;
                        // $rootScope.congratsMsg=result.Message;
                        // $state.go('CPScanCodeCheckInResult');  
                        // })

                    } else {
                        var msg = "";
                        if (result) {
                            // if(result.Data.codemsg){
                            //     msg = result.Data.codemsg;
                            // }
                            // if(result.Data.promocodemsg){
                            //     msg = msg + '<br>'+ result.Data.promocodemsg;
                            // }
                            // if($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined){
                            //     msg = msg + result.Data.codemsg;
                            // }else if($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined){
                            //     msg = msg +  '<br>'+ result.Data.promocodemsg;
                            // }else if($scope.amazonCode != null && $scope.amazonCode != "" && $scope.amazonCode != undefined){
                            //     msg = msg +  '<br>'+ result.Data.amazoncodemsg;
                            // }

                            if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {

                                msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {
                                msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode == undefined)) {
                                msg = msg + result.data[0].qrCodemsg ;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                                msg = msg + result.data[0].qrCodemsg;

                            } else if (($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                                msg = msg ;

                            }
                        }

                        var alertPopup = $ionicPopup.alert({
                            template: msg
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
    }

    $scope.submitSoilCodes = function () {
        if ($scope.contestCode == null || $scope.contestCode == undefined) {
            $scope.contestCode = "";
        }
        if ($scope.QrCodeData == null || $scope.QrCodeData == undefined || $scope.QrCodeData == "") {
            $scope.QrCodeData = "";
        }

        if ($scope.QrCodeData != "" || $scope.contestCode != "") {
            
            $scope.submitText = "submitting...";
            $scope.qrsubmited = true;
            LoaderService.showLoading();

            CodeCheckInService.codeCheckinSoilNew($scope.QrCodeData, userData.usr_pk_id, userData.usr_pk_id, $scope.contestCode).then(function (result) {
                LoaderService.hideLoading();
                $scope.submitText = $scope.data.localAppLanguage.submit;
                $scope.qrsubmited = false;
                if (result != "") {
                    console.log("result submitQrCodeData");
                    console.log(result);

                    //$scope.points= 10;
                    var msg = "";
                    if (result.data[0].TotalEarnedPoints > 0) {
                        if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {

                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg + result.data[0].promocodemsg ;
                            msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg ;

                            $state.go('CPScanCodeCheckInResult');
                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg + result.data[0].promocodemsg;
                            msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode == undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg + result.data[0].qrCodemsg ;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg + result.data[0].qrCodemsg;

                            $state.go('CPScanCodeCheckInResult');

                        } else if (($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) &&
                            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                            $rootScope.congratsMsg = msg + result.data[0].qrCodemsg;
                            msg = msg ;

                            $state.go('CPScanCodeCheckInResult');

                        }
                        $rootScope.customerAmount = result.data[0].TotalEarnedPoints;
                        //$rootScope.congratsMsg=result.Message;


                        //      var alertPopup = $ionicPopup.alert({
                        //     title: '<b> Result </b>',
                        //     template: msg
                        // }).then(function(){
                        //   $rootScope.customerAmount=result.Data.totalpoints;
                        // $rootScope.congratsMsg=result.Message;
                        // $state.go('CPScanCodeCheckInResult');  
                        // })

                    } else {
                        var msg = "";
                        if (result) {
                            // if(result.Data.codemsg){
                            //     msg = result.Data.codemsg;
                            // }
                            // if(result.Data.promocodemsg){
                            //     msg = msg + '<br>'+ result.Data.promocodemsg;
                            // }
                            // if($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined){
                            //     msg = msg + result.Data.codemsg;
                            // }else if($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined){
                            //     msg = msg +  '<br>'+ result.Data.promocodemsg;
                            // }else if($scope.amazonCode != null && $scope.amazonCode != "" && $scope.amazonCode != undefined){
                            //     msg = msg +  '<br>'+ result.Data.amazoncodemsg;
                            // }

                            if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {

                                msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined)) {
                                msg = msg + result.data[0].qrCodemsg + '<br>' + result.data[0].promocodemsg;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode == undefined)) {
                                msg = msg + result.data[0].qrCodemsg ;

                            } else if (($scope.QrCodeData != null && $scope.QrCodeData != "" && $scope.QrCodeData != undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                                msg = msg + result.data[0].qrCodemsg;

                            } else if (($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) &&
                                ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode != undefined)) {
                                msg = msg ;

                            }
                        }

                        var alertPopup = $ionicPopup.alert({
                            template: msg
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
    }

    $scope.submitQrCodeData = function () {
        $scope.CPUSerID = $rootScope.userID;
        if (($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) &&
            ($scope.contestCode == null || $scope.contestCode == "" || $scope.contestCode == undefined) &&
            ($scope.amazonCode == null || $scope.amazonCode == "" || $scope.amazonCode == undefined)) {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: $scope.data.localAppLanguage.please_enter_QR_code
            });
            return;
        } else if ($scope.contestCode != null && $scope.contestCode != "" && $scope.contestCode != undefined) {
            if ($scope.QrCodeData == null || $scope.QrCodeData == "" || $scope.QrCodeData == undefined) {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: $scope.data.localAppLanguage.please_enter_QR_code
                });
            } else {
                $scope.submitCodes();
            }
        } else {
            $scope.submitCodes();
        }
    };

    $scope.qrCodeBack = function () {
        window.history.back();
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Code Check In Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});