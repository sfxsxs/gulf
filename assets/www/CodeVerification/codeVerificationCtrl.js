gulf.controller('CodeVerificationCtrl', function ($scope, $state, $rootScope, $ionicPopup, $cordovaBarcodeScanner, $ionicPlatform, CodeVerificationservice, HeaderService, AppService) {


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.Qa = false;
    $scope.otherRole = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

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
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
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
                // $rootScope.codeList = result.data;
                // $state.go('CodeDetails');

                // added condition on Apr13th 2020 fh043

                var isNotUsed = false;

                if (result.data && result.data.length > 0) {
                    result.data.forEach(function (item) {
                        if (item.is_used == 0) {
                            isNotUsed = true;
                        }
                    });

                    if (isNotUsed) {
                        var alertPopup = $ionicPopup.alert({
                            template: result.CodeStatus
                        });
                    } else {
                        $rootScope.codeList = result.data;
                        $state.go('CodeDetails');
                    }
                }


                // if(result.data && result.data.length>0 && result.data[0].is_used == 1){
                //     $rootScope.codeList = result.data;
                //     $state.go('CodeDetails');

                // }else{
                //     var alertPopup = $ionicPopup.alert({
                //         template: result.CodeStatus
                //     });
                // }


            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    };

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Code Verification Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});