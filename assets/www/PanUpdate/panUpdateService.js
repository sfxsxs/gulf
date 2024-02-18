gulf.factory('PanUpdateService', function ($http, AppService,$rootScope,$cordovaFileTransfer) {
    
    return {
        showPANPopup: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/ShowPanPopup",
                data: 'userId=' + userId + "&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result;
            }, function (data) {
                return "";
            });
        },

        uploadPAN: function (userId,pan_number, pan_image, pan_holder_image) {
            var token= $rootScope.token;
            let formData = new FormData();
            
            // formData.append("pan_holder_image", pan_holder_image);
            // formData.append("pan_image", pan_image);
         
            
            formData.append("userId", userId);
            formData.append("pan_number", pan_number);
            formData.append("token", token);
            
            var data = {
                userId: userId,
                pan_number : pan_number,
                pan_image : pan_image,
                pan_holder_image : pan_holder_image,
                token : token
            }
            console.log(data);
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/UserPanUploadNew",
                // url: AppService.url + "api_r3/public/UserPanUpload",
                // data: 'userId=' + userId + '&pan_number='+ pan_number+'&pan_image=' + pan_image+'&pan_holder_image='+pan_holder_image,
                data: formData,
                headers: {
                    'enctype': 'multipart/form-data; boundary=WebAppBoundary',
                    'Content-Type': 'multipart/form-data; boundary=WebAppBoundary'
                },
            }).then(function (result) {
                console.log(result);
                return result;
            }, function (data) {
                console.log(data)
                return "";
            });
        },

        showPanDetails: function (userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/ShowPanDetails",
                data: 'userId=' + userId + "&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result;
            }, function (data) {
                return "";
            });
        },

        approvePan: function (th_userId,userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/ApprovePan",
                data: 'thuserId=' + th_userId + '&userId=' + userId + "&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result;
            }, function (data) {
                return "";
            });
        },

        rejectPan: function (th_userId,userId) {
            var token= $rootScope.token;
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/RejectPan",
                data: 'thuserId=' + th_userId + '&userId=' + userId + "&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                // console.log(result.data.userId);
                return result;
            }, function (data) {
                return "";
            });
        },

        uploadPanImage: function (userId,pan_image) {
            
            var url = AppService.url + "api_r3/public/UserPanImageUpload";
            var token= $rootScope.token;

            // File name only
            var filename = "pan_image.jpg";
            var options = {
                fileKey: "file",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'userId': userId,
                    'token': token
                }
            };

            $cordovaFileTransfer.upload(url, pan_image, options).then(function (result) {
                return Promise.resolve(result);
            }, function (err) {
                // LoaderService.hideLoading();
                console.log("ERROR: " + JSON.stringify(err));
            }, function (progress) {
                // constant progress updates
                // console.log("progress: " + progress);
            });
        },

        uploadSelfieImage: function (userId,selfie_image) {
            
            var url = AppService.url + "api_r3/public/UserPanHolderImageUpload";
            var token= $rootScope.token;

            // File name only
            var filename = "selfie_image.jpg";
            var options = {
                fileKey: "pan_holder_image",
                fileName: filename,
                chunkedMode: false,
                mimeType: "multipart/form-data",
                params: {
                    'userId': userId,
                    'token': token
                }
            };

            $cordovaFileTransfer.upload(url, selfie_image, options).then(function (result) {
                return result;
            });
        },

        uploadPanDetail: function (userId,pan_number, pan_image, pan_holder_image) {
            
            var token= $rootScope.token;
            
            return $http({
                method: 'POST',
                url: AppService.url + "api_r3/public/UserPanUploadNew2",
                data: 'userId=' + userId + '&pan_number=' + pan_number + '&pan_picture=' + pan_image + '&pan_holder_picture=' + pan_holder_image + '&token=' + token,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                },
            }).then(function (result) {
                return result;
            }, function (data) {
                return "";
            });
        }
        
    }
});