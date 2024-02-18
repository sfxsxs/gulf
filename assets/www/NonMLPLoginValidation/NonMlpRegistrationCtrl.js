gulf.controller('NonMlpRegistrationCtrl', function ($scope, LoginService, $state, $ionicHistory, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, NonMlpServices, ConverBase64) {

    $scope.mobileNumber = $rootScope.NonMlpRecievedMobile;
    $scope.data = {};
    $scope.disabledvalue = false;
    $scope.selectedLanguage = "";
    console.log($rootScope.encoded_usd_mobile);
    $scope.nameDisable = false;
    $scope.pinDisable = false;
    $scope.areaDisable = false;
    $scope.addressDisable = false;
    //ConverBase64.convertBase64($scope.username);
    $scope.encoded_usd_mobile = $rootScope.encoded_usd_mobile;


    $rootScope.NonMlpUSerID = $rootScope.wtencodeNonMlpUSerIDLogin;
    $scope.CPLoginpromocode = $rootScope.CPLoginpromocode;
    // alert($scope.CPLoginpromocode);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if (localStorage.getItem("RetailerValidData") != null) {
        $scope.nonMlpRetailerData = JSON.parse(localStorage.getItem("RetailerValidData"));
        $scope.retailerStatus = $scope.nonMlpRetailerData.retailerStatus;
        if ($scope.retailerStatus == 1) {

            if ($scope.nonMlpRetailerData.usd_firstname != "" && $scope.nonMlpRetailerData.usd_firstname != null) {
                $scope.name = $scope.nonMlpRetailerData.usd_firstname;
                $scope.nameDisable = true;
            }

            if ($scope.nonMlpRetailerData.usd_pincode != "" && $scope.nonMlpRetailerData.usd_pincode != null) {
                $scope.pincode = parseInt($scope.nonMlpRetailerData.usd_pincode);
                $scope.pinDisable = true;
            }
            if ($scope.nonMlpRetailerData.state_name == "" || $scope.nonMlpRetailerData.state_name == null) {
                $scope.pinDisable = false;
            }
            if ($scope.nonMlpRetailerData.city_name == "" || $scope.nonMlpRetailerData.city_name == null) {
                $scope.pinDisable = false;
            }

            $scope.state = $scope.nonMlpRetailerData.state_name;
            $scope.city = $scope.nonMlpRetailerData.city_name;

            if ($scope.nonMlpRetailerData.usd_address1 != "" && $scope.nonMlpRetailerData.usd_address1 != null) {
                $scope.address = $scope.nonMlpRetailerData.usd_address1;
                $scope.addressDisable = true;
            }


            $scope.mobileNumber = $scope.nonMlpRetailerData.usd_mobile;
            $scope.encoded_usd_mobile = ConverBase64.convertBase64($scope.mobileNumber);
            $rootScope.NonMlpUSerID = $scope.nonMlpRetailerData.userId;

            $scope.selectedLanguage = $scope.nonMlpRetailerData.usd_lang_preference;


            LoaderService.showLoading();
            AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
                console.log(result1);
                LoaderService.hideLoading();
                $scope.AvailabelArea = result1.Data;
                if ($scope.nonMlpRetailerData.area_name != "" && $scope.nonMlpRetailerData.area_name != null) {
                    $scope.selectedArea = $scope.nonMlpRetailerData.area_name;
                    $scope.areaDisable = true;
                }

            });



        }
        localStorage.removeItem('RetailerValidData');

        //...
    }

    if (localStorage.getItem("cutomerProfileData") != null) {
        console.log("cutomerProfileData");
        $scope.customerProfileData = JSON.parse(localStorage.getItem("cutomerProfileData"));
        //$scope.name = $scope.customerProfileData.usd_firstname;
        if ($scope.customerProfileData.usd_firstname != "" && $scope.customerProfileData.usd_firstname != null) {
            $scope.name = $scope.customerProfileData.usd_firstname;
            $scope.nameDisable = true;
        }
        //$scope.pincode =  parseInt($scope.customerProfileData.usd_pincode);
        if ($scope.customerProfileData.usd_pincode != "" && $scope.customerProfileData.usd_pincode != null) {
            $scope.pincode = parseInt($scope.customerProfileData.usd_pincode);
            $scope.pinDisable = true;
        }
        if ($scope.customerProfileData.state_name == "" || $scope.customerProfileData.state_name == null) {
            $scope.pinDisable = false;
        }
        if ($scope.customerProfileData.city_name == "" || $scope.customerProfileData.city_name == null) {
            $scope.pinDisable = false;
        }
        $scope.state = $scope.customerProfileData.state_name;
        $scope.city = $scope.customerProfileData.city_name;
        if ($scope.customerProfileData.usd_address1 != "" && $scope.customerProfileData.usd_address1 != null) {
            $scope.address = $scope.customerProfileData.usd_address1;
            $scope.addressDisable = true;
        }

        $scope.mobileNumber = $scope.customerProfileData.usd_mobile;
        $scope.selectedLanguage = $scope.customerProfileData.usd_lang_preference;
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
            console.log(result1);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result1.Data;
            if ($scope.customerProfileData.area_name != "" && $scope.customerProfileData.area_name != null) {
                $scope.selectedArea = $scope.customerProfileData.area_name;
                $scope.areaDisable = true;
            }

        });
        localStorage.removeItem('cutomerProfileData');

    }
    if (localStorage.getItem("NonMlpTemporaryProfileData") != null) {
        try {
            console.log("NonMlpTemporaryProfileData");
            $scope.customerProfileData = JSON.parse(localStorage.getItem("NonMlpTemporaryProfileData"));
            $scope.name = $scope.customerProfileData.usd_firstname;
            if ($scope.customerProfileData.usd_firstname != "" && $scope.customerProfileData.usd_firstname != null) {
                $scope.name = $scope.customerProfileData.usd_firstname;
                $scope.nameDisable = true;
            }
            //$scope.pincode =  parseInt($scope.customerProfileData.usd_pincode);
            if ($scope.customerProfileData.usd_pincode != "" && $scope.customerProfileData.usd_pincode != null) {
                $scope.pincode = parseInt($scope.customerProfileData.usd_pincode);
                $scope.pinDisable = true;
            }
            if ($scope.customerProfileData.state_name == "" || $scope.customerProfileData.state_name == null) {
                $scope.pinDisable = false;
            }
            if ($scope.customerProfileData.city_name == "" || $scope.customerProfileData.city_name == null) {
                $scope.pinDisable = false;
            }
            $scope.state = $scope.customerProfileData.state_name;
            $scope.city = $scope.customerProfileData.city_name;
            if ($scope.customerProfileData.usd_address1 != "" && $scope.customerProfileData.usd_address1 != null) {
                $scope.address = $scope.customerProfileData.usd_address1;
                $scope.addressDisable = true;
            }
            $scope.mobileNumber = $scope.customerProfileData.usd_mobile;
            $scope.selectedLanguage = $scope.customerProfileData.usd_lang_preference;
            LoaderService.showLoading();
            AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
                console.log(result1);
                LoaderService.hideLoading();
                $scope.AvailabelArea = result1.Data;
                if ($scope.customerProfileData.area_name != "" && $scope.customerProfileData.area_name != null) {
                    $scope.selectedArea = $scope.customerProfileData.area_name;
                    $scope.areaDisable = true;
                }
            });
            localStorage.removeItem('NonMlpTemporaryProfileData');
        } catch (ex) {

        }
    }

    //MLP Validation check

    if (localStorage.getItem("MlpTemporaryProfileData") != null) {
        try {
            console.log("MlpTemporaryProfileData");
            $scope.customerProfileData = JSON.parse(localStorage.getItem("MlpTemporaryProfileData"));
            $scope.name = $scope.customerProfileData.usd_firstname;
            if ($scope.customerProfileData.usd_firstname != "" && $scope.customerProfileData.usd_firstname != null) {
                $scope.name = $scope.customerProfileData.usd_firstname;
                $scope.nameDisable = true;
            }
            //$scope.pincode =  parseInt($scope.customerProfileData.usd_pincode);
            if ($scope.customerProfileData.usd_pincode != "" && $scope.customerProfileData.usd_pincode != null) {
                $scope.pincode = parseInt($scope.customerProfileData.usd_pincode);
                $scope.pinDisable = true;
            }
            if ($scope.customerProfileData.state_name == "" || $scope.customerProfileData.state_name == null) {
                $scope.pinDisable = false;
            }
            if ($scope.customerProfileData.city_name == "" || $scope.customerProfileData.city_name == null) {
                $scope.pinDisable = false;
            }
            $scope.state = $scope.customerProfileData.state_name;
            $scope.city = $scope.customerProfileData.city_name;
            if ($scope.customerProfileData.usd_address1 != "" && $scope.customerProfileData.usd_address1 != null) {
                $scope.address = $scope.customerProfileData.usd_address1;
                $scope.addressDisable = true;
            }
            $scope.mobileNumber = $scope.customerProfileData.usd_mobile;
            $scope.selectedLanguage = $scope.customerProfileData.usd_lang_preference;
            LoaderService.showLoading();
            AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
                console.log(result1);
                LoaderService.hideLoading();
                $scope.AvailabelArea = result1.Data;
                if ($scope.customerProfileData.area_name != "" && $scope.customerProfileData.area_name != null) {
                    $scope.selectedArea = $scope.customerProfileData.area_name;
                    $scope.areaDisable = true;
                }
            });
            localStorage.removeItem('MlpTemporaryProfileData');
        } catch (ex) {

        }
    }

    ///MLP validation end


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
                var checkpincodeMap = $rootScope.NonMlpUSerID;
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
            $scope.areaDisable = false;
            console.log($scope.AvailabelArea.length);
        });
    }

    AddMechanicService.getLanguages().then(function (result) {

        console.log("Lang" + result);
        if (result.Status == true) {
            $scope.AvailabelLanguage = result.Data;
        }
    });
    AddMechanicService.userSubcategory($rootScope.global_encodedUsername).then(function (result) {

        console.log("userSubcategory" + result);
        if (result.Status == true) {
            $scope.userSubcategory = result.userSubcategory;
        }
    });


    $scope.NonMlpRegistration = function () {
        // alert($scope.selectedLanguage);

        if ($scope.name != "" && $scope.name != null && $scope.name != undefined &&
            $scope.state != "" && $scope.state != null && $scope.state != undefined &&
            $scope.pincode != "" && $scope.pincode != null && $scope.pincode != undefined &&
            $scope.city != "" && $scope.city != null && $scope.city != undefined &&
            $scope.address != "" && $scope.address != null && $scope.address != undefined &&
            $scope.selectedLanguage != "" && $scope.selectedLanguage != null && $scope.selectedLanguage != undefined &&
            $scope.selectedArea != "" && $scope.selectedArea != null && $scope.selectedArea != undefined) {
            if (locationData == true) {
                //$scope.CPLoginpromocode==true

                LoaderService.showLoading();
                NonMlpServices.updateNMLPProfile($rootScope.NonMlpUSerID, $scope.name, "", $scope.state, $scope.pincode, $scope.city, $scope.address, $scope.selectedArea, lat, long, $rootScope.dontHaveCodeStaus, $scope.selectedLanguage).then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result.Status == true) {
                        LoginService.userMobileLogin($rootScope.encoded_usd_mobile).then(function (result) {
                            LoaderService.hideLoading();
                            if (result.Status == true) {
                                localStorage.setItem("userData", JSON.stringify(result.Data[0]));
                                $rootScope.userData = result.Data[0];
                                $rootScope.token = result.token;
                                console.log("login-token" + $rootScope.token);
                                localStorage.setItem("token", JSON.stringify(result.token));
                                $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                                $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
                                if (result.Data[0].user_category == "Channel Partner") {
                                    $state.go('CPHome');
                                } else if (result.Data[0].user_category == "Loyalty User") {
                                    $state.go('MechanicHome');

                                } else {
                                    $rootScope.usd_firstname_nonMlp = $scope.name;
                                    $rootScope.edit = false;
                                    $state.go('NonMlpHome');
                                }
                            }

                        });

                        // $state.go('BankaccountDetails');
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
                        console.log(lat + "----------" + lat);
                        console.log(long + "----------" + long);
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
            _paq.push(['setDocumentTitle', "Non MLP Registration Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }




    $('#name').on('keyup', function (event) {
        var keyChar = $(this).val().substr(-1).charCodeAt(0);
        var firstChar = $(this).val().charAt(0);
        var firstCharCode = firstChar.charCodeAt(0);
        var char = $(this).val().substr(-1);
        console.log("char" + char);
        var str = $(this).val();
        var inputValue = keyChar;
        console.log(inputValue);
        if (!((firstCharCode >= 65 && firstCharCode <= 90) || (firstCharCode >= 97 && firstCharCode <= 122))) {
            $("#name").val("");
        }
        if (!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)) {
            var tempname = str.substr(0, str.length - 1);
            if (inputValue <= 127) {
                if (inputValue >= 48 && inputValue <= 57) {
                    //Number blocking
                    $("#name").val("");
                    console.log(str.length);

                } else {
                    $("#name").val(tempname);
                    console.log(str.length);
                }


            } else {
                //Other language Keypad block
                $("#name").val("");
                console.log(str.length);
            }


        }
        console.log(str.length);


    });



});