gulf.controller("ValidateProfileCtrl", function ($scope, $state, $http, LoaderService, AddMechanicService, $rootScope, LoginService, UpdateMechanicProfileService, $ionicPopup, $stateParams, ConverBase64, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer) {
    $("#ui-datepicker-div").remove();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    $scope.data = {};
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    $scope.usd_code = "";
    var role = $rootScope.userData.role_fk_id;
    $scope.distributorShow = false;
    $scope.distributorMechShow = false;
    $scope.region = "";
    $rootScope.GOILRetID = "";
    $scope.eligibilitytier = "";

    $scope.ShopName = "";
    $scope.mechId = "";
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    //$scope.selectedDistributor=""

    //  $scope.selectedDistributor.distributorname=""


    if (userData && userData.user_category == "Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }
    $scope.all = true;

    $scope.radioChange = function () {
        // alert($scope.data.purchaseType);
        if ($scope.data.purchaseType == "Distributor") {

            if ($scope.eligibilitytier == "Gold" || $scope.eligibilitytier == "Platinum" || $scope.eligibilitytier == "Titanium") {

                $scope.distributorShow = true;
                $scope.distributorMechShow = true;
            } else {
                $scope.distributorShow = true;
                $scope.distributorMechShow = false;
                $scope.data.userType = "OTHER IWS";

            }

        } else {
            $scope.distributorShow = false;
            $scope.distributorMechShow = false;
        }

    }


    //header
    $scope.getselectval = function () {
        //  alert($scope.selectedDistributor.distributorname);
        //alert($scope.selectedDistributor.distributorcode);

        AddMechanicService.dssList($scope.selectedDistributor.distributorcode).then(function (result1) {
            console.log(result1);
            LoaderService.hideLoading();
            $scope.AvailabeldssList = result1.Data;
            console.log($scope.AvailabeldssList);
            $scope.selectedDss = result1.Data[0].dssname;
        });
        // $scope.selectedvalues= 'Name: ' + $scope.selectedDistributor.distributorname + ' Id: ' + $scope.selectedDistributor.distributorcode;
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
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
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
    $scope.myOrder = function () {
        $state.go('MyOrder');
    }

    //header
    $(document).ready(function (e) {

        $('#areavalidation').select2({
            dropdownParent: $('#areavalidationParent')
        });
        $('#langValidate').select2({
            dropdownParent: $('#langValidateParent')
        });

    });

    $scope.areaNotAvailable = false;

    console.log($stateParams.id);
    var userIDToValidateMech = ConverBase64.convertBase64($stateParams.id);

    LoaderService.showLoading();

    LoginService.myProfileData(userIDToValidateMech).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                // localStorage.removeItem("mechanicUserID");
                //usr_pk_id
                var userProfile = result;
                $scope.usd_code = result.Data[0].usd_code
                $scope.name = result.Data[0].usd_firstname;
                $scope.region = result.Data[0].region;
                $scope.mobile = parseInt(result.Data[0].usd_mobile);
                $scope.dob = result.Data[0].usd_dob;
                $scope.address1 = result.Data[0].usd_address1;
                $scope.address2 = result.Data[0].usd_address2;
                $scope.address3 = result.Data[0].usd_address3;
                $scope.pincode = parseInt(result.Data[0].usd_pincode);
                $scope.selectedLanguage = result.Data[0].lang_name;
                $scope.state = result.Data[0].state_name;
                $scope.city = result.Data[0].city_name;

                $scope.eligibilitytier = result.Data[0].eligibilitytier;
                $scope.mechId = result.Data[0].usr_pk_id;

                LoaderService.showLoading();
                AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result1) {
                    console.log(result1);
                    LoaderService.hideLoading();
                    $scope.AvailabelArea = result1.Data;
                    console.log($scope.AvailabelArea.length);
                    $scope.selectedArea = result1.Data[0].area_name;
                });



                if ($rootScope.validateMechanicNotUploadded == true) {
                    $scope.name = $rootScope.addName;
                    $scope.mobile = $rootScope.addmobile;
                    $scope.dob = $rootScope.adddob;
                    $scope.address1 = $rootScope.addaddress1;
                    $scope.address2 = $rootScope.addaddress2;
                    $scope.address3 = $rootScope.addaddress3;
                    $scope.pincode = $rootScope.addpincode;
                    $scope.state = $rootScope.addstate;
                    $scope.city = $rootScope.addcity;
                    LoaderService.showLoading();
                    AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result) {
                        console.log(result);
                        LoaderService.hideLoading();
                        $scope.AvailabelArea = result.Data;
                        console.log($scope.AvailabelArea.length);
                        $scope.selectedArea = $rootScope.addselectedArea;
                    });

                    /*  $scope.AvailabelArea = $rootScope.addselectedArea;*/
                    $scope.selectedLanguage = $rootScope.addselectedLanguage;
                }



                /*     $scope.selectedState = result.Data[0].state_name;
                     //$scope.selectedState='ANDHRA PRADESH';
                     //New code 28-05
                     $scope.LoadTimeonStateChange();
                     LoadTimeCity = result.Data[0].city_name;
                     LoadTimeArea = result.Data[0].area_name;
                     //end New code
                     $scope.selectedCity = result.Data[0].city_name;
 
                     $scope.selectedArea = result.Data[0].area_name;
                     $scope.selectedLanguage = result.Data[0].lang_name;*/

            } else {

                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: "Something Went Wrong Please , Try Again"
            });
        }
    });


    //get Distributor list
    try {
        $scope.code = userData.usd_code;
        $scope.roleId = userData.role_fk_id;
        AddMechanicService.distributorList($scope.code, $scope.roleId).then(function (result1) {
            console.log(result1);
            LoaderService.hideLoading();
            $scope.AvailabelDistributorList = result1.Data;
            console.log($scope.AvailabelDistributorList);
            $scope.selectedDistributor = result1.Data[0].distributorname;
        });

    } catch (e) {

    }


    //get latitude and longitude

    var lat;
    var long;
    $scope.showLocation = function () {
        $ionicPlatform.ready(function () {
            //LoaderService.showLoading();
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
                        //LoaderService.hideLoading();
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
                        console.log(lat + "----------" + lat);
                        console.log(long + "----------" + long);




                    };

                    function onError(error) {
                        // LoaderService.hideLoading();
                        alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    }

                } else {
                    LoaderService.hideLoading();
                    var alertPopup = $ionicPopup.alert({
                        template: "Please Turn On GPS"
                    });
                }
            }, function (error) {
                //LoaderService.hideLoading();
                console.error("The following error occurred: " + error);
            });


        });
    }

    //calling lat long

    try {
        $scope.showLocation();

    } catch (e) {
        $scope.showLocation();
    }


    $scope.pincodeOrAdd = false;
    $scope.add = true;
    $scope.pan = false;
    $(document).ready(function (e) {
        /*   var d = new Date();
           var currentYear = d.getFullYear();
           maxYear = currentYear-18;*/
        var d = new Date(90, 0, 1);
        $("#dtDateOfBirthVliadte").datepicker({
            defaultDate: d,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd-mm-yy',
            yearRange: '1930:-18',
            maxDate: '+0',
            showButtonPanel: true,
            closeText: 'Clear',
            onClose: function (dateText, inst) {
                if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                    document.getElementById(this.id).value = '';
                    $scope.dob = "";
                }

            }

        });
    });
    LoaderService.showLoading();
    AddMechanicService.getState().then(function (result) {
        LoaderService.hideLoading();
        console.log("state Data" + result);
        if (result.Status == true) {
            $scope.AvailabelState = result.Data;
            $scope.AvailabelCity = "";
            $scope.AvailabelArea = "";
        }
    });

    AddMechanicService.getLanguages().then(function (result) {

        console.log("Lang" + result);
        if (result.Status == true) {
            $scope.AvailabelLanguage = result.Data;
        }
    })

    var todayDate = new Date().getDate();

    /*
        $("#dtDateOfBirth").datepicker({
            autoclose: true,
            todayHighlight: false,
            format: "dd-mm-yyyy",
            endDate: "0",
            //startDate: '1d',
            disableTouchKeyboard: true,
             clearBtn:true
 
        }).on('changeDate', function (e) {
 
            e.stopPropagation();
            if(e.date == undefined){
                $scope.dob="";
            }
 
        }).on('hide', function (ev) {
            if (ev.date == undefined) {
                var dob = $scope.dob;
                document.getElementById("dtDateOfBirth").value = dob;
            }
            // alert("hide" + ev.date);
        });
    */




    $scope.checkPincode = function () {

        var pincode;
        if ($scope.pincode != null) {
            pincode = $scope.pincode.toString();
            if (pincode.length == 6) {
                LoaderService.showLoading();
                console.log($scope.pincode);
                AddMechanicService.checkPinCode($scope.pincode, $rootScope.userID).then(function (result) {
                    console.log(result);
                    console.log(result.Data.stateName);
                    if (result.Status == true) {
                        $scope.state = result.Data.stateName;
                        $scope.city = result.Data.cityName;
                        $scope.selectedArea = "";
                        $scope.getMutipleArea();

                    } else {
                        $scope.state = "";
                        $scope.city = "";
                        $scope.selectedArea = "";
                        $scope.AvailabelArea = "";
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: result.Message
                        });

                    }
                    /*    if (result.Status == true) {
                            $scope.selectedState = result.Data.stateName;
                            stateBasedOnPin = result.Data.stateName;
                            cityBasedOnPin = result.Data.cityName;
                            areaBasedOnPin = result.Data.areaName;
                            $scope.ByPingetstate();
 
 
                              $scope.data.city = result.Data.cityName;
                              $scope.data.area = result.Data.areaName;
                        } else {
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Error </b>',
                                template: result.Message
                            });
                            $scope.selectedState = "";
                            $scope.selectedCity = "";
                            $scope.selectedArea = "";
                        }*/
                    LoaderService.hideLoading();
                });
            } else {
                $scope.state = "";
                $scope.city = "";
                $scope.selectedArea = "";
                $scope.AvailabelArea = "";
            }
        }
        // var pincode = $scope.pincode.toString();

    }
    $scope.pincodeOrAddfunction = function (data) {

        console.log("111111111" + $scope.pincodeOrAdd);
        if ($scope.pincodeOrAdd == "Pincode") {
            $scope.pan = false;
            $scope.add = true;
            $scope.pincode = "";
            LoaderService.showLoading();
            AddMechanicService.getState().then(function (result) {
                LoaderService.hideLoading();
                console.log("state Data" + result);
                if (result.Status == true) {
                    $scope.AvailabelState = result.Data;
                    $scope.AvailabelCity = "";
                    $scope.AvailabelArea = "";
                }
            });

        } else if ($scope.pincodeOrAdd == "Address") {
            $scope.add = false;
            $scope.pan = true;

            $scope.state = "";
            $scope.city = "";
            $scope.area = "";
            $scope.pincode = "";

        }

    }



    $scope.onStateChange = function () {
        console.log($scope.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.selectedState).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true) {
                $scope.AvailabelCity = result.Data;
                $scope.AvailabelArea = "";
            } else {
                $scope.AvailabelCity = result.Data;
                $scope.AvailabelArea = "";
            }
        });

    }
    $scope.onCityChange = function () {
        console.log($scope.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.selectedState, $scope.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }

    /*   $scope.onAreaChange = function () {
           console.log($scope.selectedArea);
           LoaderService.showLoading();
           AddMechanicService.getPincodeFromAddressData($scope.selectedState, $scope.selectedCity, $scope.selectedArea, $rootScope.userID).then(function (result) {
               console.log(result);
               LoaderService.hideLoading();
               console.log(result.Data[0].pm_pincode);
               $scope.pincode = parseInt(result.Data[0].pm_pincode);
   
           })
   
       }*/
    $scope.ApiTest = function () {
        AddMechanicService.AddMLPDealerAppointment().then(function (result) {
            console.log("Third part start =================");
            console.log(result);
            console.log("Third part end =================");

        })

    }

    $scope.ApiTestRetailer = function () {
        // AddMechanicService.InsertMechanicData().then(function (result) {
        //     console.log("Third part start Retailer=================");
        //     console.log(result);
        //     console.log("Third part end Retailer =================");

        // })

    }
    $scope.Validate = function () {
        LoaderService.showLoading();

        var userData = JSON.parse(localStorage.getItem("userData"));
        console.log($scope.selectedLanguage)
        $scope.soCOde = userData.usd_code;
        $scope.SoName = userData.usd_firstname;
        $scope.Somobile = userData.usd_mobile;

        //alert($scope.selectedDistributor);
        //alert($scope.data.purchaseType);
        // $state.go("AddValidateDetails", {});//for testing remove tommorwo
        // console.log($scope.pincode);
        $("#ui-datepicker-div").remove();


        if ($scope.name != "" && $scope.mobile != "" && $scope.address1 != "" &&
            $scope.pincode != "" && $scope.state != "" && $scope.city != ""
            && $scope.selectedArea != "" && $scope.name != undefined
            && $scope.mobile != undefined && $scope.address1 != undefined &&
            $scope.pincode != undefined && $scope.state != undefined &&
            $scope.city != undefined && $scope.selectedArea != undefined
            && $scope.pincode != NaN) {

            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.name)) {
                $scope.name = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }

            var mob = ($scope.mobile).toString();
            console.log(mob.length);

            if (mob.length == 10) {



                if ($scope.data.purchaseType == "Retailer") {
                    //checking Distributor code selected or not
                    // if($scope.selectedDistributor==undefined ||$scope.selectedDistributor==null || $scope.selectedDistributor==""){
                    //     LoaderService.hideLoading();
                    //     var alertPopup = $ionicPopup.alert({
                    //         title: '<b> Error </b>',
                    //         template: 'Please Select Distributor'
                    //     });
                    //     return false;
                    // }
                    if ($scope.usd_code == undefined || $scope.usd_code == null || $scope.usd_code == "") {
                        LoaderService.hideLoading();
                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Error </b>',
                            template: 'Mechanic Code is Invalid '
                        });
                        return false;
                    }

                    AddMechanicService.retailerUpdate($scope.soCOde, $scope.Somobile, $scope.name, $scope.mobile,
                        $scope.dob, $scope.selectedLanguage, $scope.address1, "", $scope.pincode,
                        $scope.city, $scope.state, $scope.selectedArea, $scope.selectedDistributor, "retailer", $scope.usd_code, $scope.mechId)
                        .then(function (result) {
                            LoaderService.hideLoading();
                            console.log("state Data" + result);
                            if (result.Status == "true" || result.Status == true) {
                                $rootScope.MechImageId = result.UserId;
                                $state.go("AddRetailerDetails", {});

                            }

                        });

                    $scope.lclData=
                        {
                            "MechanicCode":$scope.usd_code,
                            "MechanicName":$scope.name,
                            "UserType":"MLP Mechanic", //Hard code after discussion with Laxmikant and satish
                            "RegionName":$scope.region,
                            "StateName":$scope.state,
                            "DistributorLocation":$scope.selectedArea,
                            "DistributorCode":$scope.selectedDistributor.distributorcode,
                            "DistributorName":$scope.selectedDistributor.distributorname,
                            "MechanicCity":$scope.city,
                            "PinCode":$scope.pincode,
                            "BeatRoute":$scope.selectedArea,
                            "MechanicMobileNo":$scope.mobile,
                            "MechanicAddress":$scope.address1,
                            "MechanicOperationalStatus":"ACTIVE", //Hard code after discussion with Laxmikant and satish
                            "Latitude":lat,
                            "Longitude":long,
                            "Validated":"YES", // //Hard code after discussion with Laxmikant and satish
                            "SORetailID":$scope.soCOde,
                            "SORetailName":$scope.SoName,
                            "SORetailMobileNo":$scope.Somobile,
                            "SORetailEmailID":"",
                            "DSSID":"",
                            "DSSName":"",
                            "DSSMobileNo":"",
                            "DSSEmailID":""

                        }
                    AddMechanicService.InsertMechanicData($scope.lclData).then(function (result) {
                        LoaderService.hideLoading();
                        console.log("Third part start Retailer=================");
                        console.log(result);
                        console.log("Third part end Retailer =================");
                        if(result.Status==1){
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Status </b>',
                                template: result.Message
                            });
                            AddMechanicService.soapproveupdate($scope.soCOde,$scope.usd_code,"",$scope.data.purchaseType).then(function (result) {
                                console.log("state Data" + result);

                            });
                            $state.go("Home");


                        }else{
                            var alertPopup = $ionicPopup.alert({
                                title: '<b> Status </b>',
                                template: result.Message
                            });

                        }






                    })


                } else if ($scope.data.purchaseType == "Distributor") {

                    $scope.lclData = {

                        "MechanicID": $scope.usd_code,
                        "UserCode": $scope.soCOde,
                        // "UserCode":"SS109",
                        "DistributorCode": $scope.selectedDistributor.distributorcode,
                        "MechanicShopName": $scope.ShopName,
                        "MechanicOwnerName": $scope.name,
                        "CustomerType": "OTHER IWS", //  "OTHER IWS" making hard code on 28thJuly21 as per client input and suraj suggestion
                        "MobileNo": $scope.mobile,
                        "EmailID": "",
                        "AddressLine1": $scope.address1,
                        "AddressLine2": $scope.address2,
                        "BeatRoute": $scope.selectedArea,
                        "Latitude": lat,
                        "Longitude": long,
                        "DSSCode": $scope.selectedDss,
                        "MechanicType": $scope.data.userType

                    }

                    AddMechanicService.AddMLPDealerAppointment($scope.lclData).then(function (result) {
                        LoaderService.hideLoading();
                        console.log("Third part start Distributor=================");
                        console.log(result);
                        console.log("Third part end Distributor =================");

                        var alertPopup = $ionicPopup.alert({
                            title: '<b> Status </b>',
                            template: result.Message
                        });
                        if (result.Status == 1 || result.Status == "1") {
                            $rootScope.GOILRetID = result.GOILRetID;
                            $rootScope.UserCode = $scope.soCOde;
                            $rootScope.CustomerType = $scope.data.userType;

                            console.log("GOILRetID Response" + $rootScope.GOILRetID);
                            AddMechanicService.soapproveupdate($scope.soCOde, $scope.usd_code, $rootScope.GOILRetID, $scope.data.purchaseType).then(function (result) {
                                console.log("state Data" + result);

                            });
                            $state.go("AddValidateDetails", {});

                        } else {

                        }
                        // $state.go("AddValidateDetails", {});


                    })


                } else {
                    LoaderService.hideLoading();
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: 'Please Select Purchase From'
                    });
                }

                //  $rootScope.addName = $scope.name;
                //  $rootScope.addmobile = $scope.mobile;
                //  $rootScope.adddob = $scope.dob;
                //  $rootScope.addaddress1 = $scope.address1;
                //  $rootScope.addaddress2 = $scope.address2;
                //  $rootScope.addaddress3 = $scope.address3;
                //  $rootScope.addpincode = $scope.pincode;
                //  $rootScope.addstate = $scope.state;
                //  $rootScope.addcity = $scope.city;
                //  $rootScope.addselectedArea = $scope.selectedArea;
                //  $rootScope.addselectedLanguage = $scope.selectedLanguage;
                //  $rootScope.userIDToValidateMech = userIDToValidateMech;
                //  $rootScope.validateMechanicNotUploadded = true;
                //  $state.go("AddValidateDetails", {})

            } else {
                LoaderService.hideLoading();
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: 'Please Enter 10 digit Mobile Number'
                });
            }
        } else {
            LoaderService.hideLoading();
            var alertPopup = $ionicPopup.alert({
                title: '<b> Error </b>',
                template: 'Please Enter mandatory Fields'
            });
        }
    }


    $scope.Reject = function () {

        var userData = JSON.parse(localStorage.getItem("userData"));
        $scope.soCOde = userData.usd_code;
        LoaderService.showLoading();

        AddMechanicService.rejectUser($scope.soCOde, $scope.mechId)
            .then(function (result) {
                LoaderService.hideLoading();
                console.log("state Data" + result);
                if (result.Status == "true" || result.Status == true) {
                    $rootScope.MechIdForRejection = $scope.mechId;
                    $rootScope.soCOdeForRejection = $scope.soCOde;
                    $state.go('Rejection');

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Status </b>',
                        template: result.Message
                    });
                }

            });
    }
    /// by pin state city and area  populating


    $scope.ByPinCityChange = function () {
        console.log($scope.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.selectedState, $scope.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            $scope.selectedArea = areaBasedOnPin;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.ByPingetstate = function () {
        AddMechanicService.getState().then(function (result) {
            LoaderService.hideLoading();
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelState = result.Data;
                $scope.selectedState = stateBasedOnPin;
                $scope.ByPinStateChange();
                $scope.AvailabelCity = "";
                $scope.AvailabelArea = "";
            }
        });
    }

    $scope.ByPinStateChange = function () {

        console.log($scope.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.selectedState).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true) {
                $scope.AvailabelCity = '';
                $scope.AvailabelCity = result.Data;
                $scope.selectedCity = cityBasedOnPin;
                $scope.AvailabelArea = "";
                $scope.ByPinCityChange();
            } else {
                $scope.AvailabelCity = result.Data;
                $scope.AvailabelArea = "";
                $scope.ByPinCityChange();
            }
        });

    }


    $scope.LoadTimeonStateChange = function () {

        console.log($scope.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.selectedState).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true) {
                $scope.AvailabelCity = '';
                $scope.AvailabelCity = result.Data;
                $scope.AvailabelArea = "";
                $scope.LoadonCityChange();
            } else {
                $scope.AvailabelCity = result.Data;
                $scope.AvailabelArea = "";
                $scope.LoadonCityChange();
            }
        });

    }


    $scope.LoadonCityChange = function () {
        console.log($scope.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.selectedState, $scope.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }
    $scope.editDetails = function () {
        $scope.all = false;
        $('input[type=text]').addClass('form-control');
        $('input[type=number]').addClass('form-control');
        $('textarea').addClass('form-control');
        $('input[type=text]').removeClass('nonEdit');
        $('input[type=number]').removeClass('nonEdit');
        $('textarea').removeClass('nonEdit');

    }

    $scope.getMutipleArea = function () {
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.state, $scope.city, $scope.pincode).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.clickBack = function () {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        window.history.back();
    }
    $scope.onAreaChange = function () {
        if ($scope.selectedArea == "Others") {
            $scope.areaNotAvailable = true;
        } else {
            $scope.areaNotAvailable = false;
        }
    }
    $scope.checkAddress1 = function () {
        console.log($scope.address1);
        if ($scope.address1 != null) {
            var joinPhoneNumber = $scope.address1;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.address1;
                $scope.address1 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }
    $scope.checkAddress2 = function () {
        console.log($scope.address2);
        if ($scope.address2 != null) {
            var joinPhoneNumber = $scope.address2;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.address2;
                $scope.address2 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }
    $scope.checkAddress3 = function () {
        console.log($scope.address3);
        if ($scope.address3 != null) {
            var joinPhoneNumber = $scope.address3;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.address3;
                $scope.address3 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }

    //  var settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://gulfkonnect.in/GKTestWebAPI/api/MLPDealerAppointment/AddMLPDealerAppointment",
    //     "method": "POST",
    //     "headers": {
    //       "content-type": "application/json",
    //       "authorization": "Basic R0tfVjIuMDpJbnRlbGxlY3QkMTAwNjIwMTk=",
    //       "cache-control": "no-cache",

    //     },
    //     "processData": false,
    //     "data":JSON.stringify({        
    //         "MechanicID":"AH49627",
    //         "UserCode":"SE001",
    //         "DistributorCode":"643",
    //         "MechanicName": "Dinesh. Palkar",
    //         "MechanicOwnerName": "Mechanic Owner",
    //         "CustomerType": "OTHER IWS",
    //         "MobileNo": "8082506941",
    //         "EmailID": "mech21@gmail.com",
    //         "AddressLine1": "Test Address 1",
    //         "AddressLine2": "Test Address 2",
    //         "BeatRoute": "Goregaon East",
    //         "Latitude": "19.1752908000",
    //         "Longitude": "72.8761015000",
    //         "DSSCode": "DSSW233437",
    //         "MechanicType":"BIKE"

    //   })
    //   }

    //   $.ajax(settings).done(function (response) {
    //       console.log("AJAx=======");
    //     console.log(response);
    //   });

    try {
        // $scope.ApiTestRetailer();
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Mechanic Validation Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
});