gulf.controller('SelfieForPanCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicPlatform,  LoaderService, ConverBase64, HeaderService, AppService, $cordovaInAppBrowser,$cordovaCamera,PanUpdateService,$cordovaFileTransfer) {

    $scope.pathForImage = "img/profile.png";
    $rootScope.selectedSelfieImg= "";
    $rootScope.selectedSelfieBase64= "";
    console.log($rootScope.selectedPanImag);

    $scope.userData = JSON.parse(localStorage.getItem("userData"));

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;

    if ($scope.userData && $scope.userData.user_category == "Loyalty User") {
        $scope.nonMlp = false;
    } else {
        $scope.nonMlp = true;
    }

    $scope.takePicture = function () {
        $ionicPlatform.ready(function () {
            var options = {
                quality : 30,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation: true,
                cameraDirection: 1,
                // encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                
                var image = document.getElementById('selfieimage');
                // $scope.pathForImage = "data:image/jpeg;base64," + imageURI;
                // $rootScope.selectedSelfieImg= $scope.dataURItoBlob($scope.pathForImage);
                $rootScope.selectedSelfieImg= imageURI;
                $rootScope.selectedSelfieBase64 = imageURI;
                $scope.pathForImage = imageURI;
                image.className = 'img-responsive';
                $scope.uploadSelfieImage();
                
            }, function (err) {
                console.log("camera error", err);
            });


            /*$cordovaCamera.cleanup().then();*/
        });
    }
   
    $scope.dataURItoBlob = function(dataURI) {
        // convert base64 to raw binary data held in a string
        let byteString = atob(dataURI.split(',')[1]);
    
        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to an ArrayBuffer
        let arrayBuffer = new ArrayBuffer(byteString.length);
        let _ia = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          _ia[i] = byteString.charCodeAt(i);
        }
    
        let dataView = new DataView(arrayBuffer);
        let blob = new Blob([dataView], { type: mimeString });
        return blob;
    }

    $scope.dataURLtoFile = function(dataurl, filename) {
        let arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type: mime});
    }

    $scope.uploadSelfieImage = function(){
        LoaderService.showLoading();
        // PanUpdateService.uploadSelfieImage($scope.userData.usr_pk_id,$rootScope.selectedSelfieImg).then(function(response){
        //     LoaderService.hideLoading();
        //     if(response.data.Status == true){
        //         $rootScope.selectedSelfieImg = response.data.Data.pan_picture
        //         $scope.gotoGetPanDetailPage();
        //     }else{
        //         console.log(response.data.Message)
        //         var alertPopup = $ionicPopup.alert({
        //             template: response.data.Message
        //         });
        //     }
        // })
        var url = AppService.url + "api_r3/public/UserPanHolderImageUpload";
        var token= $rootScope.token;

        // File name only
        // var filename = "selfie_image.jpg";
        var filename = $scope.pathForImage.substr($scope.pathForImage.lastIndexOf('/') + 1)
        var options = {
            fileKey: "pan_holder_image",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                'userId': $scope.userData.usr_pk_id,
                'token': token
            }
        };

        $cordovaFileTransfer.upload(url, $rootScope.selectedSelfieImg, options).then(function (result) {
                LoaderService.hideLoading();
                console.log(result)
                    result = JSON.parse(result.response);
                    if(result.Status == true){
                        $rootScope.selectedSelfieImg = result.Data.pan_holder_picture
                        $scope.gotoGetPanDetailPage();
                    }else{
                        console.log(result.Message)
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }
            }, function (err) {
                // LoaderService.hideLoading();
                console.log("ERROR: " + JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
                // console.log("progress: " + progress);
            });
    }

    $scope.gotoGetPanDetailPage = function(){
        $state.go('PanDetailSubmit')
    }
});