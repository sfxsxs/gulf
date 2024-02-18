gulf.controller('CPTradeSchemeCtrl', function ($scope, AppService, $state, $rootScope, HeaderService, $ionicPopup, RecommendationService, LoaderService) {
    console.log("Trade");
    /*  $scope.AvailableVideo=[{lang_name: 'https://www.youtube.com/embed/NPx3Nx_gyLg',disc:'AAAAAAAAAAA'}, {lang_name: 'https://www.youtube.com/embed/xmhnNUotIaE?rel=0&amp;controls=0&amp;showinfo=0',disc:'BBBBBBB'}];*/
    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');


    $scope.nonMlp;
    $scope.isOtherCustomer;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Channel Partner") {
        $scope.isOtherCustomer = true;
    } else {
        $scope.isOtherCustomer = false;
        if (userData && userData.user_category == "Loyalty User") {
            $scope.nonMlp = false;
        } else {
            $scope.nonMlp = true;
        }
    }

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;

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


    //header end
    LoaderService.showLoading();
    RecommendationService.VedioGallery($rootScope.userID).then(function (result) {
        LoaderService.hideLoading();
        console.log("state Data" + result);
        if (result.Status == true) {
            $scope.AvailableVideo = result.data;
        }
    });



    /*    
        $('#productEarning').DataTable({
                "processing": true,
                "destroy": true,
                "searching": false,
                "bLengthChange": false,
                "serverSide": false,
                "pageLength": 10,
             "paging":   false,
                "ordering": false,
                "info":     false,
                //"data":result.data,
                "ajax": {
                    url: AppService.url + "api_r3/public/gulfCorner",
                    "type": "GET",
                    dataType: "json",
                    contentType: "application/json"
    
                },
                "columns": [
                    {
                        "data": "gc_description"
                    },
                    {
                        "data": "gc_youtube_link ",     
                        "render":function(data,type,full){
                            if(full.gc_youtube_link==""){
                            
                                return "<a href="+AppService.url+full.path+full.gc_file_name+">View</a>";
                            }else{
                                return "<a href="+full.gc_youtube_link+">View</a>";
                            }
                        }
                    }
    
            ]
    
            });*/

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Trade Scheme Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});
gulf.filter('trusted', ['$sce', function ($sce) {
    return function (url) {
        return $sce.trustAsResourceUrl(url);
    };

}]);
