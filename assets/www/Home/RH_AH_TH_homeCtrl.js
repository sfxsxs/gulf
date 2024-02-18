gulf.controller('RH_AH_TH_homeCtrl', function ($scope, NonMlpServices, $cordovaBarcodeScanner, $ionicPlatform, $ionicPopup, $cordovaCamera, $state, HeaderService, $rootScope, DashboardService, AppService, $cordovaInAppBrowser) {
    $('body').addClass('home-bg');
    $('body').removeClass('body-bg-1');

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
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

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "RH_AH_TH Home Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

    //   checkMlpOrNonMlp = function () {



    // }

    try {
        NonMlpServices.getMechanicStatus($rootScope.userID).then(function (result) {
            if (result.Status) {
                if (result.mecValidationstatus == true) {
                    logoutFunction($rootScope.userID);
                }
            }
        });

    } catch (e) {
        console.log("getMechanicStatus service error");

    }



    // $(document).ready(function (e) {
    //     console.log("document ready");
    //     checkMlpOrNonMlp();

    // });


});