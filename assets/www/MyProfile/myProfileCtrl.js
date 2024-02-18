gulf.controller("MyProfileCtrl", function ($scope, $rootScope, LoginService, $ionicPopup, LoaderService, AddMechanicService, UpdateMechanicProfileService, $state, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, ConverBase64) {
    $("#ui-datepicker-div").remove();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    $scope.areaNotAvailable = false;
    $scope.data={};
    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data.localAppLanguage=JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    $scope.data.mode = localStorage.getItem("mode");
    $scope.modeProject = $scope.data.mode;
    console.log($scope.modeProject);

    if (userData && userData.user_category=="Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category=="Loyalty User") {
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
        $state.go('MyOrder')
    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var msg_code=result.message_code;
                var show_msg=$scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    template: show_msg
                });
            }
        });
    }


    //header


    //footer
    $scope.home = function () {
        if (userData && userData.user_category=="Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }

    //footer

    $scope.data = {};
    $scope.pincodeOrAdd = false;
    $scope.add = true;
    $scope.pan = false;
    $scope.all = true;

    var LoadTimeCity;
    var LoadTimeArea;
    var stateBasedOnPin
    var cityBasedOnPin;
    var areaBasedOnPin


    $(document).ready(function (e) {
        // $('.js-example-basic-single').select2();
        $('#langMyProfile').select2({
            dropdownParent: $('#langMyProfileParent')
        });
        $('#areaMyprofile').select2({
            dropdownParent: $('#areaMyprofileParent')
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
    });

    $("#dtFromDateEdit").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '1d',
        disableTouchKeyboard: true,
        clearBtn: true

    }).on('changeDate', function (e) {

        e.stopPropagation();;
        if (e.date == undefined) {
            $scope.usd_dob != "";
        }
        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    }).on('hide', function (ev) {
        if (ev.date == undefined) {
            var dob = $scope.usd_dob;
            document.getElementById("dtFromDateEdit").value = dob;
        }
        // alert("hide" + ev.date);
    });

/*    var d = new Date();
    var currentYear = d.getFullYear();
    maxYear = currentYear - 18;*/
     var d = new Date(90,0,1);
    $("#wcdobMyProfile").datepicker({
         defaultDate:d,
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
                $scope.usd_dob = "";
            }

        }

    });
    $scope.pincodeOrAddfunction = function (data) {

        if ($scope.pincodeOrAdd == "Pincode") {
            $scope.pan = false;
            $scope.add = true;
            $scope.data.pincode = "";
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

            $scope.data.state = "";
            $scope.data.city = "";
            $scope.data.area = "";
            $scope.data.pincode = "";

        }

    }

    $scope.gotoPanPopupPage = function (){
        if($scope.data.pan_availability == 'Rejected'){
            $state.go('PanSubmittedMsg',{status:'Rejected'}) 
        }else{
            $state.go('PanImageUpload');
        }
    }

    LoaderService.showLoading();
    LoginService.myProfileData($rootScope.userID).then(function (result) {
        console.log(result);
        LoaderService.hideLoading();
        if (result != "") {
            if (result.Status == true) {
                var userProfile = result;
                $scope.usd_code = result.Data[0].usd_code
                $scope.data.usd_firstname = result.Data[0].usd_firstname;
                $scope.usd_mobile = result.Data[0].usd_mobile;
                $scope.usd_dob = result.Data[0].usd_dob;
                $scope.data.address1 = result.Data[0].usd_address1;
                $scope.data.address2 = result.Data[0].usd_address2;
                $scope.data.address3 = result.Data[0].usd_address3;
                $scope.data.pincode = parseInt(result.Data[0].usd_pincode);
                $scope.state = result.Data[0].state_name;
                $scope.city = result.Data[0].city_name;
                $scope.data.user_category=result.Data[0].user_category;
                $scope.data.current_tier=result.Data[0].current_tier;
                $scope.data.pan_availability = result.Data[0].pan_availability;
                $scope.data.pan_number = result.Data[0].pan_number;
                $scope.data.pan_image = AppService.url + result.Data[0].pan_image;
                $scope.mechProfileImage = AppService.url + result.Data[0].filePath + result.Data[0].usd_profile_pic;

                LoaderService.showLoading();
                AddMechanicService.getArea($scope.state, $scope.city, $scope.data.pincode).then(function (result1) {
                    console.log(result1);
                    LoaderService.hideLoading();
                    $scope.AvailabelArea = result1.Data;
                    $scope.data.selectedArea = result.Data[0].area_name;
                });
                $scope.data.selectedLanguage = result.Data[0].lang_name;
                //  $scope.data.selectedState = result.Data[0].state_name;
                //New code 28-05
                /*$scope.LoadTimeonStateChange();
                LoadTimeCity = result.Data[0].city_name;
                LoadTimeArea = result.Data[0].area_name;*/
                //end New code
                /* $scope.data.selectedCity = result.Data[0].city_name;

                 $scope.data.selectedArea = result.Data[0].area_name;
                 $scope.data.selectedLanguage = result.Data[0].lang_name;*/

                /*var userProfile = result;
                $scope.usd_code = result.Data[0].usd_code
                $scope.data.usd_firstname = result.Data[0].usd_firstname;
                $scope.usd_mobile = result.Data[0].usd_mobile;
                $scope.usd_dob = result.Data[0].usd_dob;
                $scope.data.address = result.Data[0].usd_address1;
                $scope.data.pincode = parseInt(result.Data[0].usd_pincode);*/
                /* $scope.data.selectedState = result.Data[0].state_name;
                 $scope.data.selectedCity = result.Data[0].city_name;
                 $scope.data.selectedArea = result.Data[0].area_name;*/
                /*    $scope.data.selectedLanguage = result.Data[0].lang_name;
                    $scope.data.state = result.Data[0].state_name;
                    $scope.data.city = result.Data[0].city_name;
                    $scope.data.area = result.Data[0].area_name;*/
            } else {
                var msg_code=result.message_code;
                var show_msg=$scope.data.localAppLanguage[msg_code];

                var alertPopup = $ionicPopup.alert({
                    template: show_msg
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Something Went Wrong Please , Try Again"
            });
        }
    });

    $scope.onStateChange = function () {

        console.log($scope.data.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.data.selectedState).then(function (result) {
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
        console.log($scope.data.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.data.selectedState, $scope.data.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }
    /*    $scope.onAreaChange = function () {
            console.log($scope.data.selectedArea);
            LoaderService.showLoading();
            AddMechanicService.getPincodeFromAddressData($scope.data.selectedState, $scope.data.selectedCity, $scope.data.selectedArea, $rootScope.userID).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result.Status == true) {
                    console.log(result.Data[0].pm_pincode);
                    $scope.data.pincode = parseInt(result.Data[0].pm_pincode);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }

            });

        }*/

    $scope.checkPincode = function () {

        var pincode;
        if ($scope.data.pincode != null) {
            pincode = $scope.data.pincode.toString();
            if (pincode.length == 6) {
                LoaderService.showLoading();
                console.log($scope.data.pincode);
                AddMechanicService.checkPinCode($scope.data.pincode, $rootScope.userID).then(function (result) {
                    console.log(result);
                    console.log(result.Data.stateName);
                    if (result.Status == true) {
                        $scope.state = result.Data.stateName;
                        $scope.city = result.Data.cityName;
                        $scope.data.selectedArea = "";
                        $scope.getMutipleArea();

                        /*      $scope.selectedState = result.Data.stateName;
                              stateBasedOnPin = result.Data.stateName;
                              cityBasedOnPin = result.Data.cityName;
                              areaBasedOnPin = result.Data.areaName;
                              $scope.ByPingetstate();*/


                        /*  $scope.data.city = result.Data.cityName;
                          $scope.data.area = result.Data.areaName;*/
                    } else {
                        LoaderService.hideLoading();
                        $scope.state = "";
                        $scope.city = "";
                        $scope.data.selectedArea = "";
                        $scope.AvailabelArea = "";
                        var msg_code=result.message_code;
                        var show_msg=$scope.data.localAppLanguage[msg_code];
                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
                        });

                    }
                    /*      if (result.Status == true) {
                              $scope.data.state = result.Data.stateName;
                              $scope.data.city = result.Data.cityName;
                              $scope.data.area = result.Data.areaName;
                          } else {
                              var alertPopup = $ionicPopup.alert({
                                  title: '<b> Error </b>',
                                  template: result.Message
                              });
                              $scope.data.selectedState = "";
                              $scope.data.selectedCity = "";
                              $scope.data.selectedArea = "";
                              LoaderService.hideLoading();
                          }*/
                });
            } else {
                $scope.state = "";
                $scope.city = "";
                $scope.data.selectedArea = "";
                $scope.AvailabelArea = "";
            }
        }
        // var pincode = $scope.pincode.toString();

    }

    $scope.changePassword = function () {
        $state.go('ChangePassword');
    }

    $scope.editDetails = function () {
        $scope.all = false;
        $('input[type=text]').addClass('form-control');
        $('input[type=number]').addClass('form-control');
        $('textarea').addClass('form-control');
        $('input[type=tel]').addClass('form-control');
        $('input[type=text]').removeClass('nonEdit');
        $('input[type=number]').removeClass('nonEdit');
        $('textarea').removeClass('nonEdit');
        $('input[type=tel]').removeClass('nonEdit');

    }
    $scope.submitDetails = function () {


        $scope.data.state = $scope.data.selectedState;
        $scope.data.city = $scope.data.selectedCity;
        // $scope.data.area = $scope.data.selectedArea;
        if ($scope.areaNotAvailable == true) {
            $scope.data.area = $scope.newArea;
        } else {
            $scope.data.area = $scope.data.selectedArea;
        }


        var mechanicUserID = localStorage.getItem("mechanicUserID");

        if ($scope.data.usd_firstname != "" && $scope.data.usd_firstname != undefined && $scope.usd_mobile != "" && $scope.usd_mobile != undefined && $scope.data.address1 != "" && $scope.data.address1 != undefined && $scope.data.pincode != "" && $scope.data.pincode != undefined && $scope.state != "" && $scope.state != undefined && $scope.city != "" && $scope.city != undefined && $scope.data.area != "" && $scope.data.area != undefined) {

            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.data.usd_firstname)) {
                $scope.data.usd_firstname = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }
            LoaderService.showLoading();

            UpdateMechanicProfileService.updateUserDetails($scope.data.usd_firstname, $scope.usd_mobile, $scope.usd_dob, $scope.data.address1, $scope.data.address2, $scope.data.address3, $scope.data.pincode, $scope.state, $scope.city, $scope.data.area, $scope.data.selectedLanguage, $rootScope.userID, $rootScope.userID).then(function (result) {
                LoaderService.hideLoading();
                $scope.all = true;
                /*   $('input[type=text]').removeClass('form-control');
                   $('input[type=number]').removeClass('form-control');
                   $('textarea').removeClass('form-control');
                   $('input[type=tel]').removeClass('form-control');
                   $('input[type=text]').addClass('nonEdit');
                   $('input[type=number]').addClass('nonEdit');
                   $('textarea').addClass('nonEdit');
                   $('input[type=tel]').addClass('nonEdit');*/
                if (result.Status == true) {

                    try{
                        $rootScope.userData.usd_firstname = $scope.data.usd_firstname;

                        var tempData = JSON.parse(localStorage.getItem("userData"));
                        tempData.usd_firstname = $scope.name;
                        tempData.usd_pincode = $scope.data.pincode;
                        tempData.state_name = $scope.state;
                        tempData.city_name = $scope.city;
                        tempData.usd_address1 = $scope.data.address1;
                        tempData.area_name = $scope.data.area;
                        localStorage.setItem("userData", JSON.stringify(tempData));
         
                    }catch(ex){}
                    var msg_code=result.message_code;
                    var show_msg=$scope.data.localAppLanguage[msg_code];
                    var alertPopup = $ionicPopup.alert({
                        template: show_msg
                    });
                    //$state.go('MechanicHome');
                } else {
                    var msg_code=result.message_code;
                    var show_msg=$scope.data.localAppLanguage[msg_code];
                    var alertPopup = $ionicPopup.alert({
                        template: show_msg
                    });
                }
            });

        } else {
            console.log($scope.data.city);
            var alertPopup = $ionicPopup.alert({
                template: $scope.data.localAppLanguage.please_enter_all_data
            });
        }




    }


    /// by pin state city and area  populating


    $scope.ByPinCityChange = function () {
        console.log($scope.data.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.data.selectedState, $scope.data.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            $scope.data.selectedArea = areaBasedOnPin;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.ByPingetstate = function () {
        AddMechanicService.getState().then(function (result) {
            LoaderService.hideLoading();
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelState = result.Data;
                $scope.data.selectedState = stateBasedOnPin;
                $scope.ByPinStateChange();
                $scope.AvailabelCity = "";
                $scope.AvailabelArea = "";
            }
        });
    }

    $scope.ByPinStateChange = function () {

        console.log($scope.data.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.data.selectedState).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true) {
                $scope.AvailabelCity = '';
                $scope.AvailabelCity = result.Data;
                $scope.data.selectedCity = cityBasedOnPin;
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

        console.log($scope.data.selectedState);
        LoaderService.showLoading();
        AddMechanicService.getCity($scope.data.selectedState).then(function (result) {
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
        console.log($scope.data.selectedCity);
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.data.selectedState, $scope.data.selectedCity).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.getMutipleArea = function () {
        LoaderService.showLoading();
        AddMechanicService.getArea($scope.state, $scope.city, $scope.data.pincode).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.uploadProfilePhoto = function () {
        var confirmPopup = $ionicPopup.show({

            title: 'Upload Photo',

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
                var image = document.getElementById('profilePic');
                image.src = imageURI;
                $scope.pathForImage = imageURI;
                console.log("Image Path1 " + $scope.pathForImage);
                $scope.uploadProfilePhotoToServer();

            }, function (err) {
                // error
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
                var image = document.getElementById('profilePic');
                image.src = imageURI;
                $scope.pathForImage = imageURI;
                $scope.uploadProfilePhotoToServer();
            }, function (err) {
                // error
            });


            /*$cordovaCamera.cleanup().then();*/
        });
    }



    $scope.uploadProfilePhotoToServer = function () {

        var url = AppService.url + "api_r3/public/userProfilePicUpload";
        console.log('userid',$rootScope.userID);
        // File for Upload
        var targetPath = $scope.pathForImage;

        // File name only
        var filename = "MechanicPrfilePtoto.jpg";
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: {
                'userId': $rootScope.userID
            }
        };



        $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
            console.log("Profile" + result);
            console.log(result.response);
            var jsonObject = JSON.parse(result.response);
            //alert(jsonObject.Message);
            LoaderService.hideLoading();

            if (jsonObject.Status == true) {
                $scope.mechProfileImage = AppService.url + jsonObject.Data.image_url;
                $rootScope.addMechanicNotUploadded = false;
                var myPopup = $ionicPopup.show({
                    template: jsonObject.Message,
                    scope: $scope,

                    buttons: [
                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            onTap: function (e) {

                                //$state.go('Home');
                            }
                                    }
                                ]
                });
            } else {
                var msg_code=result.message_code;
                var show_msg=$scope.data.localAppLanguage[msg_code];
                var alertPopup = $ionicPopup.alert({
                    template: show_msg
                });
            }

            // alert('Success', 'Image upload finished.');
        }, function (err) {
            // LoaderService.hideLoading();
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            // console.log("progress: " + progress);
        });
    }



    $scope.clickBack = function () {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        window.history.back();
    }

    $scope.mechUpadteMobile = function () {
        var alertPopup = $ionicPopup.alert({
            template: "Please contact your SO or Customer Care to update your mobile no."
        });
    }

    $scope.onAreaChange = function () {
        if ($scope.data.selectedArea == "Others") {
            $scope.areaNotAvailable = true;
        } else {
            $scope.areaNotAvailable = false;
        }
    }
    $scope.checkAddress1 = function () {
        console.log($scope.data.address1);
        if ($scope.data.address1 != null) {
            var joinPhoneNumber = $scope.data.address1;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.data.address1;
                $scope.data.address1 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }
    $scope.checkAddress2 = function () {
        console.log($scope.data.address2);
        if ($scope.data.address2 != null) {
            var joinPhoneNumber = $scope.data.address2;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.data.address2;
                $scope.data.address2 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }
    $scope.checkAddress3 = function () {
        console.log($scope.data.address3);
        if ($scope.data.address3 != null) {
            var joinPhoneNumber = $scope.data.address3;
            console.log(joinPhoneNumber.length);

            if (joinPhoneNumber.length > 200) {

                var joinPhoneNumberDisplay = $scope.data.address3;
                $scope.data.address3 = joinPhoneNumberDisplay.slice(0, 200);
            }
        }

    }
    var visitorId = localStorage.getItem('visitorId');
    var u = encodeURI('https://analytics.firsthive.com/piwik.php?_cvar={"5":["page","MyProfile"]}&action_name=View settings&idsite=123&rand=351459&h=18&m=13&s=3&rec=1&apiv=1&_id=' + visitorId + '&_idvc=19&res=320×480&');

    try {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var url = u;
        xmlhttp.open("GET", url, false);
        xmlhttp.send(null);

    } catch (err) {

        console.log(err);
    }

    try{
        if(AppService.enableTracking){
            _paq.push(['setDocumentTitle', "My Profile Page"]);
            _paq.push(['trackPageView']);
        }
      }catch(err){
        console.log(err);
      }
      $('#user-name').on('keyup', function(event){
        var keyChar = $(this).val().substr(-1).charCodeAt(0);
        var firstChar= $(this).val().charAt(0);
        var firstCharCode=firstChar.charCodeAt(0);
        var char=$(this).val().substr(-1);
        console.log("char"+char);
        var str=$(this).val();
         var inputValue = keyChar; 
         console.log(inputValue); 
         if(!((firstCharCode>=65 && firstCharCode<=90)||(firstCharCode>=97 && firstCharCode<=122))){
            $("#user-name").val("");
        }     
          if(!(inputValue >= 65 && inputValue <= 122) && (inputValue != 32 && inputValue != 0)){
                 var tempname = str.substr(0,str.length-1);
                 if(inputValue<=127){
                     if(inputValue>=48 && inputValue<=57){
                         //Number blocking
                         $("#user-name").val("");
                         console.log(str.length);

                     }else{
                        $("#user-name").val(tempname);
                        console.log(str.length);
                     }
                    

                 }else{
                        //Other language Keypad block
                    $("#user-name").val("");
                    console.log(str.length);
                 }
                 
                 
            }
       console.log(str.length);
         
        
  });

});