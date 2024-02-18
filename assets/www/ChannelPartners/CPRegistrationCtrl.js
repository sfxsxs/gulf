gulf.controller('CPRegistrationCtrl', function ($scope, LoginService, $state, $ionicHistory, $rootScope, ConverBase64, $ionicPopup, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, ChannelPartnersServices, ConverBase64) {

    $scope.mobileNumber = $rootScope.CPUserNumber;
    $scope.data = {};
    $scope.disabledvalue = false;

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    // $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
    //           if($state.current.name=="CPRegistration"){
    //               ionic.Platform.exitApp();
    //       }
    // });
    //$rootScope.NonMlpUserID;
    $scope.checkPincode = function () {

        var pincode;
        if ($scope.pincode != null) {
            pincode = $scope.pincode.toString();
            if (pincode.length == 6) {
                LoaderService.showLoading();
                AddMechanicService.getStateCityByPincodeNew($scope.pincode).then(function (result) {
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        $scope.state = result.Data.stateName;
                        $scope.city = result.Data.cityName;
                        $scope.getMutipleArea();
                    } else {
                        $scope.state = "";
                        $scope.city = "";
                        $scope.selectedArea = "";
                        $scope.AvailabelArea = "";
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }
                    LoaderService.hideLoading();
                });
            } else {
                $scope.state = "";
                $scope.city = "";
                $scope.selectedArea = "";
                $scope.AvailabelArea = "";
            }
        }

    }
    $scope.getMutipleArea = function () {
        LoaderService.showLoading();
        AddMechanicService.getAreaListNew($scope.pincode).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }


    $scope.channerPartnerRegistration = function () {

        if ($scope.fName != "" && $scope.fName != null && $scope.fName != undefined &&
            $scope.state != "" && $scope.state != null && $scope.state != undefined &&
            $scope.pincode != "" && $scope.pincode != null && $scope.pincode != undefined &&
            $scope.city != "" && $scope.city != null && $scope.city != undefined &&
            $scope.address != "" && $scope.address != null && $scope.address != undefined &&
            $scope.selectedArea != "" && $scope.selectedArea != null && $scope.selectedArea != undefined &&
            $scope.selectedType != "" && $scope.selectedType != null && $scope.selectedType != undefined) {
            if (locationData == true) {
                //    $state.go('CPSetPassword');

                LoaderService.showLoading();
                ChannelPartnersServices.updateChannelPartnerProfile($rootScope.encodedCPMobileNumber, $scope.fName, $scope.lName, $scope.state, $scope.pincode, $scope.city, $scope.address, $scope.selectedArea, lat, long, $scope.selectedType).then(function (result) {
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        console.log(result);
                        if (result.data && result.data.userId) {
                            $rootScope.CPUSerID = result.data.userId;
                        }
                        // $rootScope.edit = false;
                        $state.go('CPSetPassword');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }

                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Please Get your Current Location"
                });
            }



        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter All Mandatory Fields"
            });
        }





    }

    var lat = "12.972442";
    var long = "77.580643";
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
                        console.log(lat + "----------" + long);
                        // console.log(long + "----------" + long);

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

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Registration Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }




    // try{
    //     $scope.initMap();
    // }catch(ex){}

});