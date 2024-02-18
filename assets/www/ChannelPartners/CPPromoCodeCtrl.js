gulf.controller("CPPromoCodeCtrl", function ($scope, $state, $rootScope, ChannelPartnersServices, ConverBase64, AddMechanicService, $ionicPopup, LoginService, LoaderService, UpdateMechanicProfileService, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $location, $anchorScroll) {
    $scope.isScanned = false;
    $scope.paymentType;
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.DBT = function () {
        // alert("DBT");
        $state.go('CPBankAccountDetails');
    }
    $scope.paytm = function () {
        //alert("paytm");

        var confirmPopup = $ionicPopup.confirm({
            title: 'Paytm',
            template: 'Are you sure?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                $scope.cashbackType = "paytm";

                LoaderService.showLoading();
                ChannelPartnersServices.customerOrderPlacing($rootScope.wtencodeNonMlpUSerIDLogin, $scope.cashbackType, "",
                    "", "", "", $rootScope.customerAmount).then(function (result) {
                        LoaderService.hideLoading();
                        if (result.Status == true) {
                            $rootScope.CPAmazonPromoCodeStatus = true;
                            $rootScope.CPAmazonPromoCodeMsg = result.Message;
                            $state.go('CPsingelCodeCheckIn');
                            // var alertPopup = $ionicPopup.alert({
                            //         template: result.Message
                            //     }).then(function(){
                            //        $state.go('CPHome');
                            //     })

                        } else {
                            $rootScope.CPAmazonPromoCodeStatus = false;
                            $rootScope.CPAmazonPromoCodeMsg = result.Message;
                            $state.go('CPsingelCodeCheckIn');
                            // var alertPopup = $ionicPopup.alert({
                            //        template: result.Message
                            //    });
                        }

                    });
            } else {
                console.log("not sure");
            }
        });


    }
    $scope.submitPromoCode = function () {

        console.log($scope.searchData);

        //$rootScope.userID =  ConverBase64.convertBase64("736");

        if ($scope.promoCode != null || $scope.promoCode != undefined) {
            LoaderService.showLoading();
            ChannelPartnersServices.promocodeCheckin($scope.promoCode, $rootScope.userID, "amount").then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {

                        if (result.Data.totalpoints > 0) {
                            // $scope.isScanned = true;
                            $scope.points = result.Data.totalpoints;
                            $rootScope.customerAmount = result.Data.totalpoints;
                            $rootScope.CPAmazonPromoCodeStatus = true;
                            $rootScope.CPAmazonPromoCodeMsg = result.Message;
                            $state.go('CPsingelCodeCheckIn');
                            //   var alertPopup = $ionicPopup.alert({
                            //     title: '<b> Result </b>',
                            //     template: result.Message
                            // }).then(function(){
                            //     $scope.isScanned = true;
                            // $scope.points= result.Data.totalpoints;
                            // $rootScope.customerAmount=result.Data.totalpoints;
                            //   $rootScope.CPAmazonPromoCodeStatus=true;
                            //     $rootScope.CPAmazonPromoCodeMsg=result.Message;
                            //     $state.go('CPsingelCodeCheckIn');
                            // });

                        } else {
                            $rootScope.CPAmazonPromoCodeStatus = false;
                            $rootScope.CPAmazonPromoCodeMsg = result.Message;
                            $state.go('CPsingelCodeCheckIn');

                        }
                        // result.Data.totalpoints
                        // var alertPopup = $ionicPopup.alert({
                        //     template: result.Message
                        // });
                    } else {
                        var msg_code = result.message_code;
                        var show_msg = $scope.data.localAppLanguage[msg_code];

                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
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
                template: "Please Enter Amazon Id"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Promo Code Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});