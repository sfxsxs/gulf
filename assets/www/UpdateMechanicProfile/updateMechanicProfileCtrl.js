gulf.controller("UpdateMechanicProfileCtrl", function ($scope, $state, $rootScope, ConverBase64, AddMechanicService, $ionicPopup, LoginService, LoaderService, UpdateMechanicProfileService, HeaderService, AppService, $ionicPlatform, $cordovaCamera, $cordovaFileTransfer, $location, $anchorScroll, CodeCheckInService) {
    $("#ui-datepicker-div").remove();
    $location.hash('top');

    $anchorScroll();
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    $scope.areaNotAvailable = false;

    // $('.Mechanic-max-height .form-control').css('border-bottom','none');
    // $('.arrow-Show-Hide .select2-container--default').removeClass('border-bottom','none');
    // $('.arrow-Show-Hide .select2-selection__arrow').css('display','none');

    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var LoadTimeCity;
    var LoadTimeArea;
    var stateBasedOnPin
    var cityBasedOnPin;
    var areaBasedOnPin;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

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


    $scope.home = function () {
        if (userData && userData.user_category == "Loyalty User") {
            $state.go('MechanicHome');
        } else if (role == "6" || role == "27") {
            $state.go('Home');
        }
    }

    //footer
    console.log("mechanicProfileValidationCtrl");
    $scope.all = true;
    $scope.dobValidation = true;

    $scope.pincodeOrAdd = false;
    $scope.add = true;
    $scope.pan = false;

    $scope.data = {};

    $(document).ready(function (e) {
        //$('.js-example-basic-single').select2();
        $('#lang').select2({ dropdownParent: $('#langlist') });
        $('#areaDropDown').select2({ dropdownParent: $('#areaParent') });
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
        console.log("Close");
        e.stopPropagation();
        if (e.date == undefined) {
            $scope.usd_dob != "";
        }

    }).on('hide', function (ev) {
        if (ev.date == undefined) {
            var dob = $scope.usd_dob;
            document.getElementById("dtFromDateEdit").value = dob;
        }
        // alert("hide" + ev.date);
    });
    $("#dobValid").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '1d',
        disableTouchKeyboard: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    });

    var d = new Date(90, 0, 1);
    $("#usd_dob_editProfie").datepicker({
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
                $scope.usd_dob = "";
            }

        }

    });

    var mechanicUserID = localStorage.getItem("mechanicUserID");
    if (mechanicUserID != null && mechanicUserID != undefined) {
        LoaderService.showLoading();
        LoginService.myProfileData(mechanicUserID).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);
            if (result != "") {

                if (result.Status == true) {
                    // localStorage.removeItem("mechanicUserID");
                    var userProfile = result;
                    $scope.usd_code = result.Data[0].usd_code
                    $scope.data.usd_firstname = result.Data[0].usd_firstname;
                    //newly added code start
                    $scope.data.enrolmentDate = result.Data[0].enrolledOn;
                    $scope.data.pointsBalance = result.Data[0].pointBalance;
                    //newly added code end
                    $scope.usd_mobile = result.Data[0].usd_mobile;
                    $scope.usd_dob = result.Data[0].usd_dob;
                    $scope.data.address1 = result.Data[0].usd_address1;
                    $scope.data.address2 = result.Data[0].usd_address2;
                    $scope.data.address3 = result.Data[0].usd_address3;
                    $scope.data.pincode = parseInt(result.Data[0].usd_pincode);
                    $scope.state = result.Data[0].state_name;
                    $scope.city = result.Data[0].city_name;
                    $scope.mechProfileImage = AppService.url + result.Data[0].filePath + result.Data[0].usd_profile_pic;
                    $rootScope.mechanicProfileImgForReport = $scope.mechProfileImage;
                    $rootScope.mechanicProfileEarnedPoint = result.Data[0].uad_totalpoints_earned;
                    $rootScope.mechanicProfileredeemedPoint = result.Data[0].uad_totalpoints_redeemed;
                    $rootScope.mechanicProfileBalancePoint = result.Data[0].pointBalance;
                    /* $scope.data.selectedState = result.Data[0].state_name;
                    //New code 28-05
                    $scope.LoadTimeonStateChange();
                    LoadTimeCity = result.Data[0].city_name;
                    LoadTimeArea = result.Data[0].area_name;
                    //end New code
                    $scope.data.selectedCity = result.Data[0].city_name;
                    
*/
                    LoaderService.showLoading();
                    AddMechanicService.getArea($scope.state, $scope.city, $scope.data.pincode).then(function (result1) {
                        console.log(result1);
                        LoaderService.hideLoading();
                        $scope.AvailabelArea = result1.Data;
                        console.log($scope.AvailabelArea.length);
                        $scope.data.selectedArea = result.Data[0].area_name;
                    });
                    // $scope.data.selectedArea = result.Data[0].area_name;
                    $scope.data.selectedLanguage = result.Data[0].lang_name;

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
    }

    $scope.viewProfileRoute = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ViewProfileClick', '1', { dimension6: 'ViewProfile', dimension7: $scope.usd_mobile }]);
        }
        $state.go('EditMechanicProfile');
    }
    $scope.viewTransactionProfileRoute = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ViewMechanicPerformanceClick', '1', { dimension6: 'ViewMechanicPerformance', dimension7: $scope.usd_mobile }]);
        }
        $state.go('MechanicTransactionReport');
    }
    $scope.searchByIdOrMobileNumber = function () {
        console.log($scope.searchData);

        if ($scope.searchData != null || $scope.searchData != undefined) {
            LoaderService.showLoading();
            AddMechanicService.checkReferral("Myprofile", ConverBase64.convertBase64($scope.searchData), "").then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {
                        // localStorage.setItem("mechanicUserID", ConverBase64.convertBase64(result.data[0].usr_pk_id));
                        // $rootScope.profileName = result.data[0].name;
                        // $rootScope.profileMobile = result.data[0].mobile;
                        // $rootScope.profileCode = result.data[0].employeeCode;


                        //  $rootScope.enrolmentDate =result.data[0].enrolledOn;
                        // $rootScope.pointsBalance = result.data[0].pointBalance;

                        //data Table mapping start

                        var index = 0;
                        table = $('#mechProfileList').DataTable({
                            "data": result.data,
                            "bPaginate": false,
                            "bLengthChange": false,
                            "searching": false,
                            "paging": false,
                            "ordering": false,
                            "info": false,
                            "destroy": true,
                            "language": {
                                "emptyTable": "No results found"
                            },
                            "columns": [

                                {
                                    "data": "name"
                                },
                                {
                                    // "data": "usd_mobile"
                                    "data": "mobile",

                                },

                                {
                                    "data": "usr_pk_id",
                                    "mRender": function (data, type, full) {
                                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                                        return '<a class="btn btn-info btn-sm" href=#/mechProfilebyList/' + data + '>' + 'View Profile' + '</a>';
                                    }

                                },
                                {
                                    "data": "usr_pk_id",
                                    "mRender": function (data, type, full) {
                                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                                        return '<a class="btn btn-info btn-sm" href=#/mechanicTransactionReport/' + data + '>' + 'Mechanic Performance' + '</a>';
                                    }

                                }

                            ]
                        });


                        //data Table End


                        //$state.go('UpdateMechanicProfileMenu');


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
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mobile/Id"
            });
        }
    }
    $scope.editDetails = function () {
        /*console.log($scope.selectedLanguage);*/
        $scope.all = false;




        // $('.Mechanic-max-height .form-control').css('border-bottom','1px solid #fff');
        // $('.arrow-Show-Hide .select2-container--default').css('border-bottom','1px solid #fff');
        // $('.arrow-Show-Hide .select2-selection__arrow').css('display','block');


    }

    $scope.editMobileNo = function () {
        $state.go('EditMobileNumber');
    }
    $scope.dobValidation = function () {
        //  var Id = localStorage.getItem("mechanicUserID");

        if ($scope.mechanicIdForMobileUpdate != null && $scope.mechanicIdForMobileUpdate != "" && $scope.mechanicIdForMobileUpdate != undefined) {
            LoaderService.showLoading();
            UpdateMechanicProfileService.checkDOB($scope.mechanicIdForMobileUpdate).then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    // alert(result.Data[0].usr_pk_id);
                    $rootScope.mechanicMobileNumberUpdateID = result.Data[0].usr_pk_id;
                    $scope.dobValidation = false;
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mechanic Number/Id"
            });
        }

    }
    $scope.mobileValidation = function () {

        //  var Id = localStorage.getItem("mechanicUserID");
        /*   if ($scope.oldNumber != null && $scope.oldNumber != undefined && $scope.oldNumber != "" && $scope.newNumber != null && $scope.newNumber != "" && $scope.newNumber != undefined) {
               LoaderService.showLoading();
               UpdateMechanicProfileService.updateMobileNumber(ConverBase64.convertBase64($rootScope.mechanicMobileNumberUpdateID), $scope.oldNumber, $scope.newNumber).then(function (result) {
                   LoaderService.hideLoading();
                   console.log(result.Status);
                   if (result.Status == true) {
                       var alertPopup = $ionicPopup.alert({
                           template: result.Message
                       });
                       alertPopup.then(function (res) {
                           $state.go('Home');
                       });
   
                   } else {
                       var alertPopup = $ionicPopup.alert({
                           template: result.Message
                       });
                   }
               });
           } else {
               var alertPopup = $ionicPopup.alert({
                   template: "Please Enter Old and New Mobile Number"
               });
           }*/

        var mob = $scope.oldNumber.toString();
        mob = ConverBase64.convertBase64(mob);
        var newmob = $scope.newNumber.toString();
        newmob = ConverBase64.convertBase64(newmob);
        CodeCheckInService.sendOTPToValidateMobile(mob, newmob).then(function (result) {
            LoaderService.hideLoading();
            if (result != "") {
                console.log(result);
                if (result.Status == true) {
                    $rootScope.validateNewMobile = $scope.newNumber;
                    $rootScope.otpoldMobileValiadte = mob;
                    $rootScope.otpNewMobileValiadte = newmob;
                    $state.go('ValidateOTPTochangeMobileNumber');

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

    }

    $scope.checkPincode = function () {
        // alert("inside");

        var pincode;
        if ($scope.data.pincode != null) {
            pincode = $scope.data.pincode.toString();
            if (pincode.length == 6) {
                LoaderService.showLoading();
                console.log($scope.data.pincode);
                AddMechanicService.checkPinCode($scope.data.pincode, $rootScope.userID).then(function (result) {
                    console.log(result);
                    //  console.log(result.Data.stateName);

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
                        $scope.state = "";
                        $scope.city = "";
                        $scope.data.selectedArea = "";
                        $scope.AvailabelArea = "";
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });

                    }
                    LoaderService.hideLoading();
                    /* if (result.Status == true) {
                         $scope.data.selectedState = result.Data.stateName;
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
                         $scope.data.selectedState = "";
                         $scope.data.selectedCity = "";
                         $scope.data.selectedArea = "";
                     }*/
                    LoaderService.hideLoading();
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
    $scope.pincodeOrAddfunction = function (data) {

        console.log("111111111" + $scope.pincodeOrAdd);
        if (data == "Pincode") {
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

        } else if (data == "Address") {
            $scope.add = false;
            $scope.pan = true;

            $scope.data.state = "";
            $scope.data.city = "";
            $scope.data.area = "";
            $scope.data.pincode = "";

        }

    }



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
    /*$scope.onAreaChange = function () {
        console.log($scope.data.selectedArea);
        LoaderService.showLoading();
        AddMechanicService.getPincodeFromAddressData($scope.data.selectedState, $scope.data.selectedCity, $scope.data.selectedArea, $rootScope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            console.log(result.Data[0].pm_pincode);
            $scope.data.pincode = parseInt(result.Data[0].pm_pincode);

        });

    }*/
    $scope.submitDetails = function () {
        console.log($scope.usd_firstname);
        console.log($scope.usd_dob);
        console.log($scope.addres);



        //  $scope.data.state = $scope.data.selectedState;
        ///$scope.data.city = $scope.data.selectedCity;
        $scope.data.area = $scope.data.selectedArea;

        if ($scope.areaNotAvailable == true) {
            $scope.data.area = $scope.newArea;
        } else {
            $scope.data.area = $scope.data.selectedArea;
        }


        var mechanicUserID = localStorage.getItem("mechanicUserID");
        if ($scope.data.usd_firstname != "" && $scope.data.usd_firstname != undefined && $scope.usd_mobile != "" && $scope.usd_mobile != undefined && $scope.data.address1 != "" && $scope.data.address1 != undefined && $scope.data.pincode != "" && $scope.data.pincode != undefined && $scope.state != "" && $scope.state != undefined && $scope.city != "" && $scope.city != undefined && $scope.data.area != "" && $scope.data.area != undefined && $scope.data.selectedLanguage != "" && $scope.data.selectedLanguage != undefined) {

            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.data.usd_firstname)) {
                $scope.data.usd_firstname = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }

            UpdateMechanicProfileService.updateUserDetails($scope.data.usd_firstname, $scope.usd_mobile, $scope.usd_dob, $scope.data.address1, $scope.data.address2, $scope.data.address3, $scope.data.pincode, $scope.state, $scope.city, $scope.data.area, $scope.data.selectedLanguage, mechanicUserID, $rootScope.userID).then(function (result) {
                if (result.Status == true) {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                    $state.go('UpdateMechanicProfileMenu');
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: result.Message
                    });
                }
            });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter All fields"
            });
        }

    }

    $scope.mechTransactionReport = function () {
        $state.go('MechanicTransactionReport');
    }


    //New code 28-05

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


    /*  $scope.LoadTimeonAreaChange = function () {
        console.log($scope.data.selectedArea);
        LoaderService.showLoading();
        AddMechanicService.getPincodeFromAddressData($scope.data.selectedState, $scope.data.selectedCity, $scope.data.selectedArea, $rootScope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            console.log(result.Data[0].pm_pincode);
            $scope.data.pincode = parseInt(result.Data[0].pm_pincode);

        });

    }*/


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

    $scope.LoadOngetstate = function () {
        AddMechanicService.getState().then(function (result) {
            LoaderService.hideLoading();
            console.log("state Data" + result);
            if (result.Status == true) {
                $scope.AvailabelState = result.Data;
                $scope.AvailabelCity = "";
                $scope.AvailabelArea = "";
            }
        });
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
        if ($scope.so) {
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
        var Id = localStorage.getItem("mechanicUserID");

        var url = AppService.url + "api_r3/public/userProfilePicUpload";
        console.log('userid',Id)
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
                'userId': Id
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
                    title: 'Message',
                    scope: $scope,

                    buttons: [
                        {
                            text: '<b>Ok</b>',
                            type: 'button-positive',
                            onTap: function (e) {


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
        });
    }


    $scope.clickBack = function () {
        $(".datepicker").hide();
        $(".ui-datepicker").hide();
        window.history.back();
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

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Update Mechanic Profile Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});