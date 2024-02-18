gulf.controller('PanSubmittedMsgCtrl', function ($scope, $stateParams, $state, $rootScope, $ionicPopup, $ionicPlatform,  LoaderService, ConverBase64, HeaderService, AppService, $cordovaInAppBrowser,$cordovaCamera,PanUpdateService) {

    $scope.panstatus = $stateParams.status;
    $scope.icon = 'img/conguralation-thumb.png';
    $scope.userData = JSON.parse(localStorage.getItem("userData"));
    $scope.home = '';
    $scope.nonMlp = true;
    
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    
    if($scope.userData.user_category == "Loyalty User"){
        $scope.home = 'MechanicHome';
        $scope.nonMlp = false;
    }else if($scope.userData.user_category == "Regular User"){
        $scope.home = 'NonMlpHome';
    }else{
        $scope.home = 'Home';
    }

    $scope.gotoHome = function(){
        $state.go($scope.home);
    }

    $scope.gotoUploadPanImagePage = function(){
        $state.go('PanImageUpload');
    }

    $scope.showPanDetails = function(){
        
        LoaderService.showLoading();
        PanUpdateService.showPanDetails($scope.userData.usr_pk_id).then(function(response){
            LoaderService.hideLoading();
            if(response.data.Status == true){
                if(response.data.Data.pan_availability=='Rejected'){
                    $scope.panstatus = 'Rejected';
                }else if(response.data.Data.pan_availability=='Approved'){
                    $scope.panstatus = 'Approved';
                }
            }
        })
    }
    
    $scope.showPanDetails();

    setInterval(() => {
        if($scope.panstatus == 'submitted'){
            $scope.showPanDetails();
        }
    }, 5000);

});