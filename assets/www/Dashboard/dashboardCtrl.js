gulf.controller("DashboardCtrl", function ($scope, $state, $rootScope, ConverBase64, DashboardService, LoaderService, AppService, HeaderService, $ionicPopup) {


    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (role == "5") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
        $scope.otherRole = true;
    }



    $("#fromdateDashBoard").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        var maxDate = new Date();
        console.log(maxDate);
        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todateDashBoard').datepicker('setStartDate', minDate);
        } else {
            $scope.fromdate = "";
            $('#todateDashBoard').datepicker('setStartDate', "00-00-0000");
        }




    });

    $("#todateDashBoard").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdateDashBoard').datepicker('setEndDate', maxDate);
        } else {
            $scope.todate = "";
            var maxDate = new Date();
            $('#fromdateDashBoard').datepicker('setEndDate', maxDate);
        }

        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    });
    $scope.dashboard = function () {
        if (role == "5") {
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
        $state.go('MyOrder')
    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        });
    }


    //header
    $scope.getDashboardDetail = function () {
        LoaderService.showLoading();
        var userData = JSON.parse(localStorage.getItem("userData"));
        if (userData.role_fk_id == "6" || userData.role_fk_id == "12" || userData.role_fk_id == "13" || userData.role_fk_id == "14" || userData.role_fk_id == "28" || userData.role_fk_id == "30" || userData.role_fk_id == "27") {
            DashboardService.dashboardDetails($rootScope.userID, $scope.fromdate, $scope.todate).then(function (result) {
                console.log("result",result);
                LoaderService.hideLoading();
                console.log($rootScope.userData.role_fk_id);
                if (result != "") {
                    $scope.pendingValidation = result.data[0].pendingValidation;
                    if (result.Status == true) {
                        $scope.pendingValidation = result.data[0].pendingValidation;
                        $scope.validated = result.data[0].validated;
                        $scope.PointsEarned = result.data[0].PointsEarned;
                        $scope.codesChecked = result.data[0].codesChecked;
                        $scope.activeMechanics = result.data[0].activeMechanics;
                        $scope.inActiveMechanics = result.data[0].inActiveMechanics;
                        $scope.totalVolume = result.data[0].totalVolume;
                        // $scope.totalVolume = result.data[0].activeMechanics;
                        $scope.Mco = result.data[0].MCO;
                        $scope.Deo = result.data[0].DEO;
                        $scope.Pcmo = result.data[0].PCMO;
                        $scope.Gold = result.data[0].Gold;
                        $scope.Blue = result.data[0].Blue;
                        $scope.Platinum = result.data[0].Platinum;
                        $scope.Silver = result.data[0].Silver;
                        $scope.Titanium = result.data[0].Titanium;
                    }
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: "Something Went Wrong Please , Try Again"
                    });
                }
            });
        } else {
            LoaderService.hideLoading();
        }
    }
    $scope.getDashboardDetail();
    if (role == "6" || role == "27") {
        DashboardService.appData("1", $rootScope.userData.role_fk_id).then(function (result) {

            if (result.Status == true) {
                $scope.dashboardImg = AppService.url + result.data[0].ma_bgimg;
                console.log($scope.dashboardImg);
            }
            DashboardService.appData("2", $rootScope.userData.role_fk_id).then(function (result1) {
                if (result1.Status == true) {
                    $scope.flashNews = result1.data[0].ma_flash_content;
                }

            });
        });
    }




    $scope.mechListValidation = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'PendingValidationClick', '1', { dimension6: 'PendingValidation', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $state.go('MechValidationList');
        //$state.go("TransactionReport");
    }

    $scope.MechProfile = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'MechanicsValidatedClick', '1', { dimension6: 'MechanicsValidated', dimension7: $rootScope.userData.usd_mobile }]);
        }
        $state.go('ValidateMechnaicList');
    }
    $scope.scanNextCode = function () {
        $state.go('TransactionReport');
    }

    $scope.goToHome = function () {
        $state.go('Home');
    }

    $scope.activeMechanic = function () {
        $state.go('ActiveMechnaicList');
    }
    $scope.tierMechanicBlue = function () {
        $state.go('tierMechnicList', {
            tierName: 'Blue',
        });
    }
    $scope.tierMechanicSilver = function () {
        $state.go('tierMechnicList', {
            tierName: 'Silver',
        });
    }
    $scope.tierMechanicGold = function () {
        $state.go('tierMechnicList', {
            tierName: 'Gold',
        });
    }
    $scope.tierMechanicPlatinum = function () {
        $state.go('tierMechnicList', {
            tierName: 'Platinum',
        });
    }
    $scope.tierMechanicTitanium = function () {
        $state.go('tierMechnicList', {
            tierName: 'Titanium',
        });
    }

    $scope.inactiveMechanic = function () {
        $state.go('InactiveMechnaicList');
    }
    $scope.volumeAchieved = function () {
        $state.go('VolumeAchived');
    }
    $scope.codeCheckedList = function () {
        $state.go('CodeCheckedInDashboard');
    }

    var visitorId = localStorage.getItem('visitorId');
    var u = encodeURI('https://analytics.firsthive.com/piwik.php?_cvar={"5":["page","Dashboard"]}&action_name=View settings&idsite=123&rand=351459&h=18&m=13&s=3&rec=1&apiv=1&_id=' + visitorId + '&_idvc=19&res=320×480&');

    try {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url = u;
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);

    } catch (err) {

        console.log(err);
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Dashboard Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});