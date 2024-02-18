gulf.controller('PanDetailSubmitCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicPlatform,  LoaderService, ConverBase64, HeaderService, AppService, $cordovaInAppBrowser,$cordovaCamera, PanUpdateService,LoaderService) {

    $scope.userData = JSON.parse(localStorage.getItem("userData"));
    $scope.panno = "";
    $scope.panimage = AppService.url+'uploads/panpictures/'+$rootScope.selectedPanImg;
    $scope.selfieimage = AppService.url+'uploads/panpictures/'+$rootScope.selectedSelfieImg;
    $scope.is_agree = 0;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;

    if ($scope.userData && $scope.userData.user_category == "Loyalty User") {
        $scope.nonMlp = false;
    } else {
        $scope.nonMlp = true;
    }
    
   
    $scope.submitPanDetail = function(){
        if($scope.panno.length == 10){
            if($scope.is_agree == 1){
                LoaderService.showLoading();
                PanUpdateService.uploadPanDetail($scope.userData.usr_pk_id,$scope.panno,$rootScope.selectedPanImg,$rootScope.selectedSelfieImg).then(function(response){
                    LoaderService.hideLoading();
                    if(response.data.Status == true){
                        $state.go('PanSubmittedMsg',{status:'submitted'}) 
                    }else{
                        console.log(response.data.Message)
                        var alertPopup = $ionicPopup.alert({
                            template: response.data.Message
                        });
                    }
                })
                   
            }else{
                var alertPopup = $ionicPopup.alert({
                    template: "Please Select Declaration"
                });
            }
        }else{
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Your 10 Digit Pan No."
            });
        }
        
        
    }


});