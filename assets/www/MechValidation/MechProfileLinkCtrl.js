//MechProfileLinkCtrl
gulf.controller("MechProfileLinkCtrl", function ($scope, $state, $http, LoaderService, AddMechanicService, $rootScope, LoginService, UpdateMechanicProfileService, $ionicPopup, $stateParams, ConverBase64, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer) {
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
    $scope.region = "";
    $rootScope.GOILRetID = "";
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
            $scope.distributorShow = true;
        } else {
            $scope.distributorShow = false;
        }

    }


    //header
    $scope.getselectval = function () {
        //  alert($scope.selectedDistributor.distributorname);
        //  alert($scope.selectedDistributor.distributorcode);
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



    LoaderService.showLoading();

    LoginService.myProfileData($rootScope.mechProfileBySO).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                // localStorage.removeItem("mechanicUserID");
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
                $scope.area = result.Data[0].area_name;
                $scope.userType = result.Data[0].user_subcategory;
                $scope.tierName = result.Data[0].tier_name;

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


    $scope.ApiTest = function () {
        AddMechanicService.AddMLPDealerAppointment().then(function (result) {
            console.log("Third part start =================");
            console.log(result);
            console.log("Third part end =================");

        })

    }


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