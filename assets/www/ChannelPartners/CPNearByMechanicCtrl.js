gulf.controller('CPNearByMechanicCtrl', function ($scope, ChannelPartnersServices, $state, $ionicHistory, $rootScope, ConverBase64, $ionicPopup, LoaderService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, ChannelPartnersServices, ConverBase64) {

    $scope.mobileNumber = $rootScope.CPUserNumber;
    $scope.data = {};
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.data.catogoryName="";
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    var lat = "12.972442";
    var long = "77.580643";
    var address;
    var locationData = true;
    $scope.locations;
    $scope.map;

    $scope.clickBack = function () {
        window.history.back();
    }

    $scope.getMechanics = function (lattitude, longitude, category) {
        LoaderService.showLoading();
        ChannelPartnersServices.getNearByMechanic(lattitude, longitude, category).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result && result.Status == true) {
                $scope.locations = result.Data;
                var marker, i;
                for (i = 0; i < $scope.locations.length; i++) {

                    if ($scope.locations[i].usd_latitude && $scope.locations[i].usd_longitude) {
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng($scope.locations[i].usd_latitude, $scope.locations[i].usd_longitude),
                            map: $scope.map
                        });

                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {

                            }
                        })(marker, i));
                    }

                }

            }
            if (result && result.Status == false) {
                $scope.locations = [];
            }

        });
    }

    $scope.getGeoLocation = function () {
        var options = {
            enableHighAccuracy: true,
            maximumAge: 60000
        }

        var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

        function onSuccess(position) {
            console.log("getGeoLocation called success");
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
            console.log(lat + "----------" + long);
            var uluru = {
                lat: lat,
                lng: long
            };
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 20,
                center: uluru
            });

            $scope.getMechanics(lat, long, $scope.data.catogoryName);

        };

        function onError(error) {
            console.log("getGeoLocation called error");

        }

    }

    $scope.showLocation = function () {
        if (window.cordova) {
            $ionicPlatform.ready(function () {
                console.log("Platform ready");
                cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
                    console.log("Location is " + (enabled ? "enabled" : "disabled"));
                    console.log(enabled);
                    if (enabled) {
                        $scope.getGeoLocation();
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: "Please Turn On GPS"
                        });
                    }
                }, function (error) {
                    console.error("The following error occurred: " + error);
                });
            });
        } else {
            console.log($scope.data.catogoryName);
            $scope.getMechanics(lat, long, $scope.data.catogoryName);

            $scope.getGeoLocation();
        }
    }

    //  var lat;
    // var long;
    //  $scope.showLocation = function () {
    //     $ionicPlatform.ready(function () {
    //         console.log("Platform ready");
    //         cordova.plugins.diagnostic.isLocationEnabled(function (enabled) {
    //             console.log("Location is " + (enabled ? "enabled" : "disabled"));
    //             console.log(enabled);
    //             if (enabled) {
    //                 var options = {
    //                     enableHighAccuracy: true,
    //                     maximumAge: 60000
    //                 }
    //                 var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    //                 function onSuccess(position) {
    //                     console.log('Latitude: ' + position.coords.latitude + '\n' +
    //                         'Longitude: ' + position.coords.longitude + '\n' +
    //                         'Altitude: ' + position.coords.altitude + '\n' +
    //                         'Accuracy: ' + position.coords.accuracy + '\n' +
    //                         'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
    //                         'Heading: ' + position.coords.heading + '\n' +
    //                         'Speed: ' + position.coords.speed + '\n' +
    //                         'Timestamp: ' + position.timestamp + '\n');
    //                     lat = position.coords.latitude;
    //                     long = position.coords.longitude;

    //                     console.log(lat + "----------" + lat);
    //                     console.log(long + "----------" + long);
    //                     $scope.getMechanics(lat, long,$scope.data.catogoryName);



    //                 };

    //                 function onError(error) {
    //                     alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
    //                 }

    //             } else {
    //                 var alertPopup = $ionicPopup.alert({
    //                     template: "Please Turn On GPS"
    //                 });
    //             }
    //         }, function (error) {
    //             console.error("The following error occurred: " + error);
    //         });


    //     });
    // }


    $scope.loadMechList = function () {

        if ($scope.data.catogoryName != "") {

            $scope.showLocation();
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Channel Partner Near By Mechanics Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});