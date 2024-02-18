gulf.controller('footerDirectiveNonmlp', function ($scope, $state, $rootScope, $cordovaInAppBrowser,$ionicPopup, $ionicPlatform, HeaderService, ConverBase64,AppService) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
    $scope.home = function(){
        $state.go('NonMlpHome');
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



gulf.directive('footerDirectiveNonmlp', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'footerDirectiveNonmlp';
    directive.templateUrl = 'headerDirective/nonMlpFooter.html';



    return directive;
});