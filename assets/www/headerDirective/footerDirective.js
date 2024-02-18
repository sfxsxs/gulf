gulf.controller('footerController', function ($scope, $state, $rootScope, $ionicPopup,$cordovaInAppBrowser, $ionicPlatform, HeaderService, ConverBase64,AppService) {
    $scope.mech = false;
    $scope.so = false;
    $scope.nonMLP=false;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var role = userData.role_fk_id;
    if (userData && userData.user_category=="Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }else  if (role == "12" || role == "13" || role == "14"  || role == "28" || role == "30"){
        $scope.otherRole= true;
    }else if(role == "22"){
      $scope.nonMLP=true;
    }

    $scope.goToHome = function () {
$(".datepicker").hide();
        console.log('ffffffff');

        if (userData && userData.user_category=="Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }else  if (role == "12" || role == "13" || role == "14"  || role == "28" || role == "30"){
        $scope.otherRole= true;
    }
    }
        $scope.home = function(){
        $state.go('NonMlpHome');
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



gulf.directive('footerDirective', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'footerController';
    directive.templateUrl = 'headerDirective/footerDirective.html';



    return directive;
});