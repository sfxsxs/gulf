gulf.controller("RejectionCtrl", function ($scope, $state, $http, LoaderService, AddMechanicService, $rootScope, LoginService, UpdateMechanicProfileService, $ionicPopup, $stateParams, ConverBase64, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer) {
    $("#ui-datepicker-div").remove();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    $scope.data = {};
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    $scope.usd_code = "";
    var role = $rootScope.userData.role_fk_id;
    $scope.distributorShow = false;
    $scope.distributorMechShow = false;
    $scope.region = "";
    $rootScope.GOILRetID = "";
    $scope.eligibilitytier = "";

    $scope.ShopName = "";
    $scope.mechId = "";
    $scope.othershow = false;
    $scope.selectedReason = "";
    $scope.rejectionId = ""
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    //$scope.selectedDistributor=""

    //  $scope.selectedDistributor.distributorname=""


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }
    $scope.all = true;




    //header
    $scope.getselectval = function () {
        //  alert($scope.selectedDistributor.distributorname);
        //alert($scope.selectedDistributor.distributorcode);

        AddMechanicService.dssList($scope.selectedDistributor.distributorcode).then(function (result1) {
            console.log(result1);
            LoaderService.hideLoading();
            $scope.AvailabeldssList = result1.Data;
            console.log($scope.AvailabeldssList);
            $scope.selectedDss = result.Data[0].dssname;
        });
        // $scope.selectedvalues= 'Name: ' + $scope.selectedDistributor.distributorname + ' Id: ' + $scope.selectedDistributor.distributorcode;
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

    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }

    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus')
    }
    $scope.myOrder = function () {
        $state.go('MyOrder');
    }

    //header


    $scope.clickBack = function () {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        window.history.back();
    }
    AddMechanicService.getReasonType().then(function (result) {

        console.log(result);
        if (result.Status == true) {
            $scope.getReasonType = result.data;
        }
    });
    $scope.selectChange = function () {
        // alert($scope.selectedReason);
        if ($scope.selectedReason == 'Other') {
            $scope.othershow = true;
        } else {
            $scope.othershow = false;
        }

    }
    $scope.Submit = function () {
        if ($scope.selectedReason != "") {
            if ($scope.selectedReason != 'Other') {
                $scope.rejectionId = "";
                LoaderService.showLoading();
                AddMechanicService.updateRejectreason($rootScope.soCOdeForRejection, $rootScope.MechIdForRejection, $scope.selectedReason, $scope.rejectionId)
                    .then(function (result) {
                        LoaderService.hideLoading();
                        // console.log("state Data" + result);
                        if (result.Status == "true" || result.Status == true) {
                            //alert(result.Message)
                            var alertPopup = $ionicPopup.alert({
                                title: '<b>Success </b>',
                                template: result.Message
                            });
                            $state.go('Home');

                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Error </b>',
                                template: result.Message
                            });

                        }

                    });
            } else {
                LoaderService.showLoading();
                AddMechanicService.updateRejectreason($rootScope.soCOdeForRejection, $rootScope.MechIdForRejection, $scope.selectedReason, $scope.rejectionId)
                    .then(function (result) {
                        LoaderService.hideLoading();
                        // console.log("state Data" + result);
                        if (result.Status == "true" || result.Status == true) {
                            //alert(result.Message)
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Error </b>',
                                template: result.Message
                            });
                            $state.go('Home');

                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Error </b>',
                                template: result.Message
                            });

                        }

                    });

            }

        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Please select reason"
            });

        }
        // alert($rootScope.soCOdeForRejection);
        // alert($rootScope.MechIdForRejection);

    }











    try {
        // $scope.ApiTestRetailer();
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Mechanic rejection Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});