gulf.controller('verifyCodeCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeVerificationservice, HeaderService, AppService) {


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.Qa = false;
    $scope.otherRole = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    $scope.nonMlp;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    if (userData && userData.user_category == "Loyalty User") {
        $scope.nonMlp = false;
    } else {
        $scope.nonMlp = true;
    }

    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    } else if (role == "21") {
        $scope.Qa = true;
    } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
        $scope.otherRole = true;
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
        $state.go('OrderStatus');
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
                var msg_code = result.message_code;
                var show_msg = $scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: show_msg
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
    $scope.changepassword = function () {
        $state.go('ChangePassword');
    }

    $scope.ScanBarCode = function () {

        $ionicPlatform.ready(function () {
            //$cordovaFlashlight.switchOn();
            $cordovaBarcodeScanner.scan().then(function (imageData) {
                // alert("Hello");
                //alert(imageData.text);
                $scope.QrCodeData = imageData.text
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
                $scope.contestCode = imageData.text
                console.log("Barcode Format -> " + imageData.format);
                console.log("Cancelled -> " + imageData.cancelled);
            }, function (error) {
                console.log("An error happened -> " + error);
            });
        });
    }

    $scope.submitQrCodeData = function () {
        CodeVerificationservice.codeVerification($scope.QrCodeData).then(function (result) {
            console.log(result.data);

            if (result.Status == true) {
                //  $rootScope.codeList = result.data;
                //  $state.go('CodeDetails');

                $rootScope.verifyResultIsUsed = result.data[0].is_used;
                $rootScope.newCashcouponValue = result.data[0].newcashCoupon;
                $state.go('verifyCodeResult');

            } else {
                var msg_code = result.message_code;
                var show_msg = $scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    template: show_msg
                });
                // var alertPopup = $ionicPopup.alert({
                //     title: '<b> Error </b>',
                //     template: result.Message
                // });
            }
        });
    };

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Verify Code Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});