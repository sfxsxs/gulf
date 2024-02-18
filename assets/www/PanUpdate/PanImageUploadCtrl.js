gulf.controller('PanImageUploadCtrl', function ($scope, $state, $rootScope, $cordovaFileTransfer, $ionicPopup, $ionicPlatform,  LoaderService, ConverBase64, HeaderService, AppService, $cordovaInAppBrowser,$cordovaCamera,$cordovaFile, PanUpdateService) {
    
        $scope.pathForImage = "img/pancard_selecion_icon.png";
        $rootScope.selectedPanImg = "";
        $rootScope.selectedPanBase64 = ""
        var mode = localStorage.getItem("mode");
        $scope.modeProject = mode;
        $scope.userData = JSON.parse(localStorage.getItem("userData"));

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
                    // encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE
                };
    
                $cordovaCamera.getPicture(options).then(function (imageURI) {
                    
                    var image = document.getElementById('selectedpanimage');
                    // $scope.pathForImage = "data:image/jpeg;base64," + imageURI;
                    // $rootScope.selectedPanImg = $scope.dataURItoBlob($scope.pathForImage);
                    $rootScope.selectedPanImg = imageURI;
                    $rootScope.selectedPanBase64 = imageURI;
                    $scope.pathForImage = imageURI
                    image.className = 'img-responsive';
                    $scope.uploadPanImage();       
                }, function (err) {
                    console.log("camera error", err);
                });
    
                /*$cordovaCamera.cleanup().then();*/
            });
        }

        $scope.uploadPanImage = function(){
            LoaderService.showLoading();
                // PanUpdateService.uploadPanImage($scope.userData.usr_pk_id,$rootScope.selectedPanImg).then(function(response){
                //     LoaderService.hideLoading();
                //     if(response.data.Status == true){
                //         $rootScope.selectedPanImg = response.data.Data.pan_picture
                //         $scope.gotoSelfiePage();
                //     }else{
                //         console.log(response.data.Message)
                //         var alertPopup = $ionicPopup.alert({
                //             template: response.data.Message
                //         });
                //     }
                // })
            var url = AppService.url + "api_r3/public/UserPanImageUpload";
            var token= $rootScope.token;

            // File name only
            // var filename = "pan_image.jpg";
            var filename = $scope.pathForImage.substr($scope.pathForImage.lastIndexOf('/') + 1)
            var options = {
                fileKey: "pan_image",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'userId': $scope.userData.usr_pk_id,
                    'token': token
                }
            };

            $cordovaFileTransfer.upload(url, $scope.pathForImage, options).then(function (result) {
                LoaderService.hideLoading();
                console.log(result)
                    result = JSON.parse(result.response);
                    if(result.Status == true){
                        $rootScope.selectedPanImg = result.Data.pan_picture
                        $scope.gotoSelfiePage();
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
    
        $scope.galleryPicture = function () {
            $ionicPlatform.ready(function () {
                var options = {
                    destinationType: Camera.DestinationType.FILE_URI,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    correctOrientation: true,
                    // encodingType: Camera.EncodingType.JPEG,
                    mediaType: Camera.MediaType.PICTURE
                };
    
                $cordovaCamera.getPicture(options).then(function (imageURI) {
                    
                    var image = document.getElementById('selectedpanimage');
                    // $scope.pathForImage = "data:image/jpeg;base64," + imageURI;
                    // $rootScope.selectedPanImg = $scope.dataURItoBlob($scope.pathForImage);
                    imageURI = imageURI.split('?')[0];
                    $rootScope.selectedPanImg = imageURI;
                    $rootScope.selectedPanBase64 = imageURI;
                    $scope.pathForImage = imageURI
                    image.className = 'img-responsive';
                    $scope.uploadPanImage();    
                }, function (err) {
                    // error
                });
    
    
                /*$cordovaCamera.cleanup().then();*/
            });
        }
       
        $scope.gotoSelfiePage = function(){
            $state.go('SelfieForPan')
        }
    
});