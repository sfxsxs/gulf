gulf.controller('footerCustController', function ($scope, $state, $rootScope, $ionicPopup,$cordovaInAppBrowser, $ionicPlatform, HeaderService, ConverBase64,AppService) {

    var userData = JSON.parse(localStorage.getItem("userData"));
    var role = userData.role_fk_id;


    $scope.goToHome = function () {
  $(".datepicker").hide();
        console.log('customerffffffff');

       
            $state.go('CPHome');
    }
    $scope.goTOchatBoxHome = function () {
        if(AppService.enableTracking){
             _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ChaticonpostloginClick', '1',{dimension6:'Chaticonpostlogin',dimension7: $rootScope.userData.usd_mobile}]);
            }
        $(".datepicker").hide();
        $state.go('ChatBootPostLogin');
    }
    $scope.RH_TH_AH_Home = function(){
        $state.go('RH_AH_TH_home');
    }

$scope.goTofacebook = function(){
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

});



gulf.directive('footerCustomerDirective', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'footerCustomerController';
    directive.templateUrl = 'headerDirective/footerCustomerDirective.html';



    return directive;
});