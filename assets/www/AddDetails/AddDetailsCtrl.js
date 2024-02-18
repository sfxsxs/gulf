gulf.controller('AddDetailsCtrl', function ($scope, $state, $rootScope, $ionicPopup, $ionicPlatform, $cordovaGeolocation, $cordovaCamera, $cordovaFileTransfer, ConverBase64, LoaderService, AppService, HeaderService, AddMechanicService, UpdateMechanicProfileService, NonMlpServices) {

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    $scope.disabledvalue = false;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category == "Loyalty User") {

    }


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
                    template: result.Message
                });
            }
        });
    }


    //header
    $scope.pathForImage = "";
    console.log($state.params.obj);


    var lat;
    var long;
    var address;
    var locationData = false;



    $scope.showLocation = function () {
        $ionicPlatform.ready(function () {
            LoaderService.showLoading();

            console.log("Platform ready");

            cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                console.log("Location is " + (enabled ? "enabled" : "disabled"));
                console.log(enabled);
                if (enabled) {
                    var options = {
                        enableHighAccuracy: true,
                        maximumAge: 60000
                    }
                    var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

                    function onSuccess(position) {
                        console.log('Latitude: ' + position.coords.latitude + '\n' +
                            'Longitude: ' + position.coords.longitude + '\n' +
                            'Altitude: ' + position.coords.altitude + '\n' +
                            'Accuracy: ' + position.coords.accuracy + '\n' +
                            'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                            'Heading: ' + position.coords.heading + '\n' +
                            'Speed: ' + position.coords.speed + '\n' +
                            'Timestamp: ' + position.timestamp + '\n');
                        lat = position.coords.latitude;
                        long = position.coords.longitude;
                        locationData = true;
                        LoaderService.hideLoading();
                        var alertPopup = $ionicPopup.alert({
                            template: "Geo Tagging Completed Sucessfully"
                        });
                        $scope.disabledvalue = true;
                        console.log(lat + "----------" + lat);
                        console.log(long + "----------" + long);

                    };

                    function onError(error) {
                        LoaderService.hideLoading();
                        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    }

                } else {
                    LoaderService.hideLoading();
                    var alertPopup = $ionicPopup.alert({
                        template: "Please Turn On GPS"
                    });
                }
            }, function (error) {
                LoaderService.hideLoading();
                console.error("The following error occurred: " + error);
            });
        });
    }

    $scope.uploadPhoto = function () {
        var confirmPopup = $ionicPopup.show({

            title: 'Click A Picture',

            scope: $scope,
            buttons: [
                {
                    text: '<i class="ion-ios-camera-outline thirty-text" ></i>',
                    type: 'button-positive',
                    onTap: function () {
                        $scope.takePicture();
                    }
                },
                {
                    text: 'Gallery',
                    type: 'button-positive',
                    onTap: function () {
                        $scope.galleryPicture();
                    }
                },
                {
                    text: 'Close',
                    type: 'button-negative',
                    onTap: function () {
                        confirmPopup.close();
                    }
                },
            ]
        });

    }

    $scope.takePicture = function () {
        $ionicPlatform.ready(function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                correctOrientation: true,
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                console.log(imageURI);
                var image = document.getElementById('blah');
                image.src = imageURI;
                $scope.pathForImage = imageURI;
                console.log("Image Path1 " + $scope.pathForImage);
                image.className = 'img-responsive';
            }, function (err) {
                console.log("camera error", err);
            });


            /*$cordovaCamera.cleanup().then();*/
        });
    }

    $scope.galleryPicture = function () {
        $ionicPlatform.ready(function () {
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                correctOrientation: true,
            };

            $cordovaCamera.getPicture(options).then(function (imageURI) {
                console.log(imageURI);
                var image = document.getElementById('blah');
                image.src = imageURI;
                $scope.pathForImage = imageURI;
                image.className = 'img-responsive';
            }, function (err) {
                // error
            });


            /*$cordovaCamera.cleanup().then();*/
        });
    }


    $scope.uploadImageToServer = function () {

        var url = AppService.url + "api_r3/public/profilepicupload";

        // File for Upload
        var targetPath = $scope.pathForImage;

        // File name only
        var filename = "Testing.jpg";


        console.log("Image Path2 " + $scope.pathForImage);
        if ($scope.pathForImage != "" && $scope.pathForImage != undefined && $scope.pathForImage != null) {

            if (locationData) {
                if ($rootScope.nonMlpToMlpMechanic == true) {
                    $rootScope.nonMlpToMlpMechanic = false;
                    //alert("upload2");
                    LoaderService.showLoading();
                    console.log($rootScope.addType);
                    console.log($rootScope.addName);
                    console.log($rootScope.addmobile);
                    console.log($rootScope.adddob);
                    console.log($rootScope.addaddress1);
                    console.log($rootScope.addaddress2);
                    console.log($rootScope.addaddress3);
                    console.log($rootScope.addpincode);
                    console.log($rootScope.addstate);
                    console.log($rootScope.addcity);
                    console.log($rootScope.addselectedArea);
                    /*alert($rootScope.addselectedLanguage);
                    alert()*/
                    //nonmlp_userid,nonmlp_name,nonmlp_email,nonmlp_mobileno,nonmlp_address,nonmlp_state,
                    //nonmlp_city,nonmlp_pincode,nonmlp_area,soid


                    NonMlpServices.NonMlpuserUpdate($rootScope.usr_pk_id_NonMlpMechanic, $rootScope.addName, $rootScope.nonMlpEmail, $rootScope.addmobile,
                        $rootScope.addaddress1, $rootScope.addstate, $rootScope.addcity, $rootScope.addpincode,
                        $rootScope.addselectedArea, $rootScope.userID, $rootScope.adddob, $rootScope.addselectedLanguage).then(function (result) {
                            console.log(result);
                            if (result.Status == true) {
                                //alert("upload3");

                                var options = {
                                    fileKey: "file",
                                    fileName: filename,
                                    chunkedMode: false,
                                    mimeType: "multipart/form-data",
                                    params: {
                                        'userId': ConverBase64.convertBase64($rootScope.usr_pk_id_NonMlpMechanic),
                                        'longitude': long,
                                        'latitude': lat,
                                        'geoAddress': $rootScope.addaddress1
                                    }
                                };



                                $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                                    console.log(result);
                                    console.log(result.response);
                                    var jsonObject = JSON.parse(result.response);
                                    //alert(jsonObject.Message);
                                    LoaderService.hideLoading();

                                    if (jsonObject.Status == true) {
                                        //alert("upload4");
                                        $rootScope.addMechanicNotUploadded = false;
                                        var myPopup = $ionicPopup.show({
                                            template: jsonObject.Message,
                                            scope: $scope,

                                            buttons: [
                                                {
                                                    text: '<b>Ok</b>',
                                                    type: 'button-positive',
                                                    onTap: function (e) {

                                                        $state.go('Home');
                                                    }
                                                }
                                            ]
                                        });
                                    } else {
                                        var alertPopup = $ionicPopup.alert({
                                            template: result.Message
                                        });
                                    }

                                    // alert('Success', 'Image upload finished.');
                                }, function (err) {
                                    LoaderService.hideLoading();
                                    console.log("ERROR: " + JSON.stringify(err));
                                }, function (progress) {
                                    // constant progress updates
                                    // console.log("progress: " + progress);
                                });



                            } else if (result.Status == false) {
                                LoaderService.hideLoading();
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                            } else {
                                LoaderService.hideLoading();
                                var alertPopup = $ionicPopup.alert({
                                    template: "Something went wrong Please Try Again"
                                });

                            }
                        });

                } else if ($rootScope.addMechanicNotUploadded == true) {
                    LoaderService.showLoading();
                    console.log($rootScope.addType);
                    console.log($rootScope.addName);
                    console.log($rootScope.addmobile);
                    console.log($rootScope.adddob);
                    console.log($rootScope.addaddress1);
                    console.log($rootScope.addaddress2);
                    console.log($rootScope.addaddress3);
                    console.log($rootScope.addpincode);
                    console.log($rootScope.addstate);
                    console.log($rootScope.addcity);
                    console.log($rootScope.addselectedArea);


                    AddMechanicService.directAddMechanic($rootScope.addType, $rootScope.addName, $rootScope.addmobile, $rootScope.adddob, $rootScope.addaddress1, $rootScope.addaddress2, $rootScope.addaddress3, $rootScope.addpincode, $rootScope.addstate, $rootScope.addcity, $rootScope.addselectedArea, $rootScope.addselectedLanguage, $rootScope.userID, $rootScope.userID).then(function (result) {
                        console.log(result);
                        /* LoaderService.hideLoading();*/
                        if (result.Status == true) {

                            var options = {
                                fileKey: "file",
                                fileName: filename,
                                chunkedMode: false,
                                mimeType: "multipart/form-data",
                                /*    params : {
                                          'userId':ConverBase64.convertBase64($state.params.obj),
                                           'longitude': "78.96288000000004",
                                            'latitude': "20.593684",
                                             'geoAddress':"India"
                                }*/
                                params: {
                                    'userId': ConverBase64.convertBase64(result.Data[0].usr_pk_id),
                                    'longitude': long,
                                    'latitude': lat,
                                    'geoAddress': $rootScope.addaddress1
                                }
                            };



                            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                                console.log(result);
                                console.log(result.response);
                                var jsonObject = JSON.parse(result.response);
                                //alert(jsonObject.Message);
                                LoaderService.hideLoading();

                                if (jsonObject.Status == true) {
                                    $rootScope.addMechanicNotUploadded = false;
                                    var myPopup = $ionicPopup.show({
                                        template: jsonObject.Message,
                                        scope: $scope,

                                        buttons: [
                                            {
                                                text: '<b>Ok</b>',
                                                type: 'button-positive',
                                                onTap: function (e) {

                                                    $state.go('Home');
                                                }
                                            }
                                        ]
                                    });
                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                        template: result.Message
                                    });
                                }

                                // alert('Success', 'Image upload finished.');
                            }, function (err) {
                                LoaderService.hideLoading();
                                console.log("ERROR: " + JSON.stringify(err));
                            }, function (progress) {
                                // constant progress updates
                                // console.log("progress: " + progress);
                            });



                        } else if (result.Status == false) {
                            LoaderService.hideLoading();
                            var alertPopup = $ionicPopup.alert({
                                template: result.Message
                            });
                        } else {
                            LoaderService.hideLoading();
                            var alertPopup = $ionicPopup.alert({
                                template: "Something went wrong Please Try Again"
                            });

                        }
                    });


                } else {

                    LoaderService.showLoading();
                    UpdateMechanicProfileService.updateUserDetails($rootScope.addName, $rootScope.addmobile, $rootScope.adddob, $rootScope.addaddress1, $rootScope.addaddress2, $rootScope.addaddress3, $rootScope.addpincode, $rootScope.addstate, $rootScope.addcity, $rootScope.addselectedArea, $rootScope.addselectedLanguage, $rootScope.userIDToValidateMech, $rootScope.userID).then(function (result) {
                        if (result.Status == true) {
                            console.log("Uploaded");
                            var options = {
                                fileKey: "file",
                                fileName: filename,
                                chunkedMode: false,
                                mimeType: "multipart/form-data",
                                /*    params : {
                                          'userId':ConverBase64.convertBase64($state.params.obj),
                                           'longitude': "78.96288000000004",
                                            'latitude': "20.593684",
                                             'geoAddress':"India"
                                }*/
                                params: {
                                    'userId': $rootScope.userIDToValidateMech,
                                    'longitude': long,
                                    'latitude': lat,
                                    'geoAddress': $rootScope.addaddress1
                                }
                            };



                            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
                                console.log(result);
                                console.log(result.response);
                                var jsonObject = JSON.parse(result.response);
                                //alert(jsonObject.Message);
                                LoaderService.hideLoading();

                                if (jsonObject.Status == true) {
                                    //$rootScope.addMechanicNotUploadded = false;
                                    $rootScope.validateMechanicNotUploadded = false;
                                    var myPopup = $ionicPopup.show({
                                        template: jsonObject.Message,
                                        scope: $scope,

                                        buttons: [
                                            {
                                                text: '<b>Ok</b>',
                                                type: 'button-positive',
                                                onTap: function (e) {

                                                    $state.go('Home');
                                                }
                                            }
                                        ]
                                    });
                                } else {
                                    var alertPopup = $ionicPopup.alert({
                                        template: result.Message
                                    });
                                }

                                // alert('Success', 'Image upload finished.');
                            }, function (err) {
                                LoaderService.hideLoading();
                                console.log("ERROR: " + JSON.stringify(err));
                            }, function (progress) {
                                // constant progress updates
                                // console.log("progress: " + progress);
                            });

                        } else {
                            LoaderService.hideLoading();
                            var alertPopup = $ionicPopup.alert({
                                template: result.Message
                            });
                        }
                    });



                }




            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Please Get your Current Location"
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Click photo of Mechanic with workshop"
            });
        }
    }


    // $scope.getAddressFromLocation = function(pos) {
    //     geocoder = new google.maps.Geocoder();
    //     geocoder.geocode({
    //             latLng: pos
    //         },
    //         function (results, status) {
    //             if (status == google.maps.GeocoderStatus.OK) {
    //                 console.log("Address success",results);
    //                 address = results[0].formatted_address;
    //                 locationData = true;                
    //             } else {               
    //                 console.log("Address error", results[0].formatted_address);
    //             }
    //         }
    //     );
    // }


    // $scope.initMap = function() {

    //     var options = {
    //         enableHighAccuracy: true,
    //         maximumAge: 60000
    //     }

    //     var currentPos = {
    //         lat: 12.9482,
    //         lng: 77.5972
    //     };

    //     $scope.map = new google.maps.Map(document.getElementById('map'), {
    //             zoom: 20,
    //             center: currentPos
    //     });

    //     if (window.cordova) {
    //         navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    //         function onSuccess(position) {
    //             console.log("getGeoLocation called success", position);

    //             lat = position.coords.latitude;
    //             long = position.coords.longitude;

    //             var currentPos = {
    //                 lat: position.coords.latitude,
    //                 lng: position.coords.longitude
    //             };
    //             $scope.map = new google.maps.Map(document.getElementById('map'), {
    //                 zoom: 20,
    //                 center: currentPos
    //             });

    //             var marker = new google.maps.Marker({
    //                 position: currentPos,
    //                 map: $scope.map
    //             });

    //             $scope.getAddressFromLocation(marker.getPosition());

    //         };

    //         function onError(error) {
    //             console.log("getGeoLocation called error");
    //         }
    //     }
    // }

    // try{
    //     $scope.initMap();
    // }catch(ex){}

});