gulf.controller('ChannelPartnersFooter', function ($scope, $state, $rootScope, $cordovaInAppBrowser,$ionicPopup, $ionicPlatform, HeaderService, ConverBase64,AppService) {

    $scope.data.mode = localStorage.getItem("mode");
    $scope.modeProject = $scope.data.mode;
    console.log($scope.modeProject);
    
    $scope.home = function(){
        $state.go('CPHome');
    }
    $scope.goTofacebook = function(){
        var options = {
                   location: 'yes'
               };

               document.addEventListener("deviceready", function () {

                   $cordovaInAppBrowser.open('https://www.facebook.com/GulfOilIndia/', '_blank', options)
                       .then(function (event) {
                           // success
                       })
                       .catch(function (event) {
                           // error
                       });
               }, false);
    }
});



gulf.directive('channelPartnersFooter', function () {
    var directive = {};
    directive.restrict = 'E';
    directive.replace = true;
    directive.controller = 'ChannelPartnersFooter';
    directive.templateUrl = 'headerDirective/ChannelPartnersFooter.html';



    return directive;
});