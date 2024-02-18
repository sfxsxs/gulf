gulf.controller('GkRegistrationCtrl', function ($scope, LoginService, $state, $ionicHistory, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, NonMlpServices) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.mobileNumber = $rootScope.NonMlpRecievedMobile;
    $scope.data = {};
    $scope.disabledvalue = false;
    LoaderService.showLoading();
    LoginService.myProfileData($rootScope.userID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                $scope.name = result.Data[0].usd_firstname;
                $scope.data.address1 = result.Data[0].usd_address1;
                $scope.pincode = parseInt(result.Data[0].usd_pincode);
                $scope.state = result.Data[0].state_name;
                $scope.city = result.Data[0].city_name;

                LoaderService.showLoading();
                AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
                    console.log(result1);
                    LoaderService.hideLoading();
                    $scope.AvailabelArea = result1.Data;
                    $scope.selectedArea = result.Data[0].area_name;
                });
            } else {

                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Something Went Wrong Please , Try Again"
            });
        }
    });

    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
        if ($state.current.name == "NonMlpRegistration") {
            ionic.Platform.exitApp();
        }

    });
    //$rootScope.NonMlpUserID;
    $scope.checkPincode = function () {


        var pincode;
        if ($scope.pincode != null) {
            pincode = $scope.pincode.toString();
            if (pincode.length == 6) {

                console.log($scope.pincode);
                var checkpincodeMap = ConverBase64.convertBase64($rootScope.NonMlpUserID);
                LoaderService.showLoading();
                AddMechanicService.getStateCityByPincodeNew($scope.pincode, checkpincodeMap).then(function (result) {
                    LoaderService.hideLoading();
                    console.log(result);
                    console.log(result.Data.stateName);
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


    $scope.NonMlpRegistration = function () {

        if ($scope.name != "" && $scope.name != null && $scope.name != undefined &&
            $scope.state != "" && $scope.state != null && $scope.state != undefined &&
            $scope.pincode != "" && $scope.pincode != null && $scope.pincode != undefined &&
            $scope.city != "" && $scope.city != null && $scope.city != undefined &&
            $scope.address != "" && $scope.address != null && $scope.address != undefined &&
            $scope.selectedArea != "" && $scope.selectedArea != null && $scope.selectedArea != undefined) {


            /*var TermsCondition = document.getElementById("myCheck").checked;*/
            if (locationData == true) {
                LoaderService.showLoading();
                NonMlpServices.updateNMLPProfile($rootScope.NonMlpUserID, $scope.name, "", $scope.state, $scope.pincode, $scope.city, $scope.address, $scope.selectedArea, lat, long, $rootScope.dontHaveCodeStaus).then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        $rootScope.usd_firstname_nonMlp = $scope.name;
                        $rootScope.edit = false;
                        $state.go('GkBankDetail');
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
    var lat;
    var long;
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
            _paq.push(['setDocumentTitle', "GK Registration Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }







    // try{
    //     $scope.initMap();
    // }catch(ex){}

});