gulf.controller('AddMechanicCtrl', function ($scope, $state, AddMechanicService, $ionicPopup, ConverBase64, $rootScope, LoaderService, LoaderService, HeaderService, $ionicPlatform, AppService, $stateParams) {
    $("#ui-datepicker-div").remove();
    //background image handling start
    //console.log($stateParams.id);

    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');

    $scope.showAh = false;
    $scope.showTh = false
    $scope.showSo = false;
    $scope.data = {};

    //background image handling end  
    //header
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
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

    /*$ionicPlatform.onHardwareBackButton(function (event) {
    event.preventDefault();
    event.stopPropagation(); 
    alert("test");
    return;
    });*/
    /*    $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {

            $('select').on('select2:open', function (e) {
                console.log("close")
                // select2 is opened, handle event
            });*/

    /*if ($('select').select2('isOpen') === true) { alert(open1); }

        if ($(".select2-container").is(":visible")) {
            alert("open");
        } else {
            alert("Close");
        }
*/
    //});




    ///
    if (role == "14") {
        //Th login
        $scope.showAh = false;
        $scope.showTh = false
        $scope.showSo = true;
    } else if (role == "13") {
        //Ah login
        $scope.showAh = false;
        $scope.showTh = true
        $scope.showSo = true;
    } else if (role == "12" || role == "28" || role == "30") {
        //rh login
        $scope.showAh = true;
        $scope.showTh = true
        $scope.showSo = true;
    }

    var LoadTimeCity;
    var LoadTimeArea;
    var stateBasedOnPin
    var cityBasedOnPin;
    var areaBasedOnPin;

    $scope.areaNotAvailable = false;

    $scope.afterSubmit = false;
    $scope.referralType = ['Select Type', 'Retailer', 'Mechanic'];
    $scope.pincodeOrAdd = true;
    $scope.type = "Select Type";
    $scope.add = false;
    $scope.pan = true;
    $(document).ready(function (e) {
        /* var d = new Date();
         currentYear = d.getFullYear();*/
        //maxYear = currentYear-18;

        var d = new Date(90, 0, 1);
        $("#wcdob").datepicker({
            defaultDate: d,
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd-mm-yy',
            yearRange: '1930:-18',
            maxDate: '+0',
            showButtonPanel: true,
            closeText: 'Clear',
            onClose: function (dateText, inst) {
                /*  var date = $(this).datepicker('getDate'),
                      selectedYear = date.getFullYear();
                  if ((currentYear - selectedYear) < 18) {
                      document.getElementById(this.id).value = '';
                      $scope.dob = "";
                  }*/

                if ($(window.event.srcElement).hasClass('ui-datepicker-close')) {
                    document.getElementById(this.id).value = '';
                    $scope.dob = "";
                }

            }

        });
        /*    showButtonPanel: true, 
                    show_select_today: false,
                    closeText: 'Clear',
                    onClose: function () {
                       // alert("Hello");
                    var event = arguments.callee.caller.caller.arguments[0];                
                    if (arguments.callee.caller.caller.arguments.length == 1) {
                       $scope.dob = "";
                    }
                }*/
        // $('.js-example-basic-single').select2();

        $('#langauageList').select2({
            dropdownParent: $('#parentlangauageList')
        });
        $('#areaDropDown').select2({
            dropdownParent: $('#areaParent')
        });
        $('#soListadd').select2({
            dropdownParent: $('#parentSoListadd')
        });
        $('#thListadd').select2({
            dropdownParent: $('#parentThListadd')
        });
        $('#ahListadd').select2({
            dropdownParent: $('#parentAhListadd')
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

    LoaderService.showLoading();
    if (role == "14") {
        //Th login
        AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelSo = result.data;


            }
        });

    } else if (role == "13") {
        //Ah login
        AddMechanicService.getUsers(role, $rootScope.userID, "14").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelTH = result.data;
            }
        });
        AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelSo = result.data;


            }
        });

    } else if (role == "12" || role == "28" || role == "30") {
        //rh login

        AddMechanicService.getUsers(role, $rootScope.userID, "13").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelAH = result.data;
            }
        });


        AddMechanicService.getUsers(role, $rootScope.userID, "14").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelTH = result.data;
            }
        });
        AddMechanicService.getUsers(role, $rootScope.userID, "6").then(function (result) {
            LoaderService.hideLoading();
            console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH" + result.data);
            if (result.Status == true) {
                // $scope.AvailabelAH = result.data;
                $scope.AvailabelSo = result.data;


            }
        });
    };


    var todayDate = new Date().getDate();

    /*  $("#date-of-birth").datepicker({
          autoclose: true,
          todayHighlight: false,
          format: "dd-mm-yyyy",
          endDate: "0",
          //startDate: '1d',
          disableTouchKeyboard: true,
          clearBtn: true

      }).on('changeDate', function (e) {

          e.stopPropagation();
          if (e.date == undefined) {
              $scope.dob = "";
          }
           var maxDate = new Date();
           $('#dtFromDate').datepicker('setEndDate', maxDate);

      });*/

    if ($rootScope.addMechanicNotUploadded == true) {
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
    /* $scope.addMechanicDirect = function () {
         $state.go('addMechanicDirect');
     }
     $scope.addMechanicReferral = function () {
         $state.go('addMechanicReferral');
     }*/
    $scope.direct = function () {

        console.log($scope.name)

        var referralCode = localStorage.getItem("referralData");
        /*  if ($scope.pan == true) {
              $scope.state = $scope.selectedState;
              $scope.city = $scope.selectedCity;
              $scope.area = $scope.selectedArea;

          }*/
        if (referralCode == null || referralCode == undefined) {

            if ($scope.name != "" && $scope.mobile != "" && $scope.dob != "" && $scope.address1 != "" && $scope.pincode != "" && $scope.state != "" && $scope.city != "" && $scope.selectedArea != "" && $scope.name != undefined && $scope.mobile != undefined && $scope.dob != undefined && $scope.address1 != undefined && $scope.pincode != undefined && $scope.state != undefined && $scope.city != undefined && $scope.selectedArea != undefined) {
                var mob = ($scope.mobile).toString();

                if (mob.length == 10) {

                    addMech();
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: 'Please Enter valid Mobile Number'
                    });
                }

            } else {
                var alertPopup = $ionicPopup.alert({
                    template: 'Please Enter mandatory Fields'
                });
            }

        } else {
            if ($scope.name != "" && $scope.mobile != "" && $scope.name != undefined && $scope.mobile != undefined) {
                var mob = ($scope.mobile).toString();
                if (mob.length == 10) {

                    addMech();
                } else {
                    var alertPopup = $ionicPopup.alert({
                        template: 'Please Enter valid Mobile Number'
                    });
                }

            } else {
                var alertPopup = $ionicPopup.alert({
                    template: 'Please Enter mandatory Fields'
                });
            }

        }




    }

    $scope.AdddirectMechnaic = function () {
        /*$("#ui-datepicker-div").remove();*/
        if ($scope.name != "" && $scope.mobile != "" && $scope.address1 != "" && $scope.pincode != "" && $scope.state != "" && $scope.city != "" && $scope.selectedArea != "" && $scope.name != undefined && $scope.mobile != undefined && $scope.address1 != undefined && $scope.pincode != undefined && $scope.state != undefined && $scope.city != undefined && $scope.selectedArea != undefined && $scope.selectedLanguage != "" && $scope.selectedLanguage != undefined) {

            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.name)) {
                $scope.name = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }
            var mob = ($scope.mobile).toString();

            if (mob.length == 10) {
                if (role == "6" || role == "27") {
                    $rootScope.addType = "Direct";
                    $rootScope.addName = $scope.name;
                    $rootScope.addmobile = $scope.mobile;
                    $rootScope.adddob = $scope.dob;
                    $rootScope.addaddress1 = $scope.address1;
                    $rootScope.addaddress2 = $scope.address2;
                    $rootScope.addaddress3 = $scope.address3;
                    $rootScope.addpincode = $scope.pincode;
                    $rootScope.addstate = $scope.state;
                    $rootScope.addcity = $scope.city;
                    if ($scope.areaNotAvailable == true) {
                        $rootScope.addselectedArea = $scope.newArea;
                    } else {
                        $rootScope.addselectedArea = $scope.selectedArea;
                    }

                    $rootScope.addselectedLanguage = $scope.selectedLanguage;
                    $rootScope.addMechanicNotUploadded = true;
                    $state.go('AddDetails', {});
                } else if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
                    if ($scope.areaNotAvailable == true) {
                        areaToAddMechnaic = $scope.newArea;
                    } else {
                        areaToAddMechnaic = $scope.selectedArea;
                    }
                    if ($scope.data.selectedSo != "") {
                        LoaderService.showLoading();
                        var encodedSoIDforOtherRole = ConverBase64.convertBase64($scope.data.selectedSo);
                        AddMechanicService.directAddMechanic("Direct", $scope.name, $scope.mobile, $scope.dob, $scope.address1, $scope.address2, $scope.address3, $scope.pincode, $scope.state, $scope.city, areaToAddMechnaic, $scope.selectedLanguage, encodedSoIDforOtherRole, $rootScope.userID).then(function (result) {
                            console.log(result);
                            LoaderService.hideLoading();
                            if (result.Status == true) {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                                alertPopup.then(function (res) {
                                    $state.go('RH_AH_TH_home');
                                });
                            } else {
                                var alertPopup = $ionicPopup.alert({
                                    template: result.Message
                                });
                            }
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: 'Please Enter mandatory Fields'
                        });
                    }

                }

            } else {
                var alertPopup = $ionicPopup.alert({
                    template: 'Please Enter valid Mobile Number'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                template: 'Please Enter mandatory Fields'
            });
        }
    }

    $scope.AddMechanicByReferral = function () {
        if ($scope.name != "" && $scope.mobile != "" && $scope.name != undefined && $scope.mobile != undefined) {
            var letters = /^[A-Za-z .]+$/;
            if (!letters.test($scope.name)) {
                $scope.name = "";
                var alertPopup = $ionicPopup.alert({
                    template: "Invalid Name"
                });
                return false;


            }
            var mob = ($scope.mobile).toString();
            if (mob.length == 10) {

                if ($rootScope.referralType == "Retailer") {
                    $rootScope.referralData = ConverBase64.convertBase64($stateParams.id);
                }
                LoaderService.showLoading();

                AddMechanicService.directAddMechanic("Referral", $scope.name, $scope.mobile, "", "", "", "", "", "", "", "", "", $rootScope.referralData, $rootScope.userID).then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result.Status == true) {


                        $rootScope.referralData = "";
                        $rootScope.referredTo = $scope.name;

                        // $state.go("Home");
                        $state.go("ReferralSuccessful", {
                            obj: result.Data[0].referMessage
                        });





                        /* var alertPopup = $ionicPopup.alert({
                             title: '<b> Success </b>',
                             template: result.Message
                         });
                         alertPopup.then(function (res) {
                             console.log("Popup");
                             console.log("vvvvvv" + referralCode);
                             if (localStorage.getItem("referralData") == null) {
                                 $state.go('AddDetails', {obj:yourObj});
                             }
                             localStorage.removeItem("referralData");
                             //$state.go('Home');
                         });*/
                    } else if (result.Status == false) {
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: "Something went wrong Please Try Again"
                        });

                    }
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: 'Please Enter valid Mobile Number'
                });
            }

        } else {
            var alertPopup = $ionicPopup.alert({
                template: 'Please Enter mandatory Fields'
            });
        }
    }
    $scope.checkPincode = function () {


        var pincode;
        if ($scope.pincode != null) {
            pincode = $scope.pincode.toString();
            if (pincode.length == 6) {

                console.log($scope.pincode);
                var checkpincodeMap = "";
                if (role == "12" || role == "13" || role == "14" || role == "28" || role == "30") {
                    if ($scope.data.selectedSo != "" && $scope.data.selectedSo != undefined) {
                        checkpincodeMap = ConverBase64.convertBase64($scope.data.selectedSo);
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: 'Please Select So from the List'
                        });
                    }

                } else if (role == "6" || role == "27") {
                    checkpincodeMap = $rootScope.userID;
                }
                LoaderService.showLoading();
                AddMechanicService.checkPinCode($scope.pincode, checkpincodeMap).then(function (result) {
                    LoaderService.hideLoading();
                    console.log(result);
                    console.log(result.Data.stateName);
                    if (result.Status == true) {
                        $scope.state = result.Data.stateName;
                        $scope.city = result.Data.cityName;
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
        // var pincode = $scope.pincode.toString();

    }

    $scope.referralChecking = function () {
        $scope.afterSubmit = false;
        console.log($scope.referralDataa);
        console.log($rootScope.referralType);

        var encodedReferalData = ConverBase64.convertBase64($scope.referralDataa);

        console.log(encodedReferalData);
        console.log($rootScope.userID);
        console.log(AppService.url);
        if ($scope.referralDataa != "" && $scope.referralDataa != undefined) {
            /* LoaderService.showLoading();*/
            $scope.afterSubmit = true;
            var token = $rootScope.token;
            if ($rootScope.referralType == "Retailer") {

                $('#RetailerList').DataTable({
                    "destroy": true,
                    "processing": true,
                    "searching": false,
                    "bLengthChange": false,
                    "serverSide": false,
                    "pageLength": 10,
                    "paging": false,
                    "ordering": false,
                    "language": {
                        "emptyTable": "No results found"
                    },
                    "ajax": {
                        url: AppService.url + "api_r3/public/chkReffCode?moduleType=Referral&refferalCode=" + encodedReferalData + "&type=" + $rootScope.referralType + "&soId=" + $rootScope.userID + "&logRoleId=" + $rootScope.userData.role_fk_id + "&token=" + token,
                        dataType: "json",
                        "type": "GET",
                        contentType: "application/json",
                        error: function (jqXHR, textStatus, errorThrown) {
                            var alertPopup = $ionicPopup.alert({
                                template: "Server not responding ,Please try after some time"
                            });
                        }

                    },
                    "columns": [
                        {
                            "data": "usr_pk_id",
                            "mRender": function (data, type, full) {
                                //<a class="btn btn-info btn-sm" href=#/mechValidation/' + data + '>' + 'Validate' + '</a>'
                                return '<a class="btn btn-info btn-sm" href=#/referAmechanic/' + data + '><input type="checkbox" />  </a>';
                            }
                        },
                        {
                            "data": "name"
                        },
                        /*  {
                              "data": "mobile"
                  },*/
                        {
                            "data": "employeeCode"
                        }

                    ]

                });
            } else {
                AddMechanicService.checkReferral("Referral", ConverBase64.convertBase64($scope.referralDataa), $rootScope.referralType).then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    if (result != "") {
                        if (result.Status == true) {
                            $scope.afterSubmit = true;
                            //  console.log(result.Data.usr_pk_id);
                            // localStorage.setItem("referralData", ConverBase64.convertBase64(result.Data.usr_pk_id));
                            $scope.retailerPkId = result.data[0].usr_pk_id;
                            $scope.referredName = result.data[0].name;
                            $rootScope.referredBy = result.data[0].name;
                            $scope.referredMobileNo = result.data[0].mobile;
                            $scope.referredId = result.data[0].employeeCode;
                            /*$scope.list=result.Data;*/
                            //$state.go('addMechanicDirect');


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
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mobile Number or ID"
            });
        }

    }

    function addMech() {
        var referralCode = localStorage.getItem("referralData");
        var type;
        // var type = localStorage.getItem("typeData");
        if (referralCode == null || referralCode == undefined) {
            console.log("referralCode" + referralCode);
            referralCode = $rootScope.userID;
            type = "Direct";
        } else {
            console.log("referralCode" + referralCode);
            referralCode = localStorage.getItem("referralData");
            type = "Referral";
        }

        if ($scope.lang == undefined) {
            $scope.lang = "";
        }
        /* if ($scope.pan == true) {
             $scope.state = $scope.selectedState;
             $scope.city = $scope.selectedCity;
             $scope.area = $scope.selectedArea;

         }*/
        console.log("selectedLanguage---" + $scope.selectedLanguage);
        LoaderService.showLoading();

        AddMechanicService.directAddMechanic(type, $scope.name, $scope.mobile, $scope.dob, $scope.address1, $scope.address2, $scope.address3, $scope.pincode, $scope.state, $scope.city, $scope.selectedArea, $scope.selectedLanguage, referralCode, $rootScope.userID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result.Status == true) {


                if (localStorage.getItem("referralData") == null) {
                    $state.go('AddDetails', {
                        obj: ConverBase64.convertBase64(result.Data[0].usr_pk_id)
                    });
                } else {
                    $rootScope.referredTo = $scope.name;
                    localStorage.removeItem("referralData");
                    // $state.go("Home");
                    $state.go("ReferralSuccessful", {
                        obj: result.Data[0].referMessage
                    });
                }




                /* var alertPopup = $ionicPopup.alert({
                     title: '<b> Success </b>',
                     template: result.Message
                 });
                 alertPopup.then(function (res) {
                     console.log("Popup");
                     console.log("vvvvvv" + referralCode);
                     if (localStorage.getItem("referralData") == null) {
                         $state.go('AddDetails', {obj:yourObj});
                     }
                     localStorage.removeItem("referralData");
                     //$state.go('Home');
                 });*/
            } else if (result.Status == false) {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Something went wrong Please Try Again"
                });

            }
        });
    }
    /*    $scope.pincodeOrAddfunction = function (data) {

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
                $scope.selectedState = "";
                $scope.selectedCity = "";
                $scope.selectedArea = "";

                $scope.state = "";
                $scope.city = "";
                $scope.area = "";
                $scope.pincode = "";

            }

        }*/

    /*    $scope.onStateChange = function () {
            console.log("$scope.selectedState");
            console.log($scope.selectedState);
            LoaderService.showLoading();
            AddMechanicService.getCity($scope.selectedState).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelCity = result.Data;
                }
                $scope.AvailabelArea = "";
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
        $scope.onAreaChange = function () {
            console.log($scope.selectedArea);
            LoaderService.showLoading();
            AddMechanicService.getPincodeFromAddressData($scope.selectedState, $scope.selectedCity, $scope.selectedArea, $rootScope.userID).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();


                if (result.Status == true) {
                    console.log(result.Data[0].pm_pincode);
                    $scope.pincode = parseInt(result.Data[0].pm_pincode);
                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: '<b> Error </b>',
                        template: result.Message
                    });
                    alertPopup.then(function (res) {
                        $scope.selectedArea = "";
                    });

                }

            })

        }*/

    /*   $scope.refferByRetailer = function () {
           $rootScope.referralType = "Retailer";
           $state.go('ReferrByRetailer');
       }
       $scope.refferByMechanic = function () {
           $rootScope.referralType = "Mechanic";
           $state.go('AddMechanicReferral');
       }*/
    $scope.getCheckedTrue = function () {
        // alert("Hello");
        //  localStorage.setItem("referralData", ConverBase64.convertBase64($scope.retailerPkId));
        $rootScope.referralData = ConverBase64.convertBase64($scope.retailerPkId)
        console.log("eeeeeeeeeeee" + $scope.retailerPkId);

        $state.go('ReferAmechanic');

    }

    /// by pin state city and area  populating

    /*
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
            LoaderService.showLoading();
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

        }*/

    $scope.clickBack = function () {
        $(".ui-datepicker").hide();
        window.history.back();
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

    $scope.onAHChange = function () {
        console.log("AHHHHHHHH+" + $scope.data.selectedAH);
        $scope.data.selectedTH = "";
        $scope.data.selectedSo = "";
        if ($scope.data.selectedAH != "") {
            LoaderService.showLoading();
            var selecteduserId = ConverBase64.convertBase64($scope.data.selectedAH);
            AddMechanicService.getUsers("13", selecteduserId, "14").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelTH = result.data;
                }
            });
        } else {
            //alert($scope.data.selectedAH);
            $scope.data.selectedSo = "";
            $scope.AvailabelSo = "";
            $scope.AvailabelTH = "";
            $scope.pincode = "";
            $scope.state = "";
            $scope.city = "";
            $scope.selectedArea = "";

        }

    }

    $scope.onTHChange = function () {
        console.log("THHHHHHHHHHH" + $scope.data.selectedTH);
        var role = $rootScope.userData.role_fk_id;
        $scope.data.selectedSo = "";
        if ($scope.data.selectedTH != "") {
            LoaderService.showLoading();
            var selecteduserId = ConverBase64.convertBase64($scope.data.selectedTH);
            AddMechanicService.getUsers(role, selecteduserId, "6").then(function (result) {
                LoaderService.hideLoading();
                if (result.Status == true) {
                    $scope.AvailabelSo = result.data;
                }
            });
        } else {
            //alert($scope.data.selectedAH);
            $scope.data.selectedSo = "";
            $scope.AvailabelSo = "";
            $scope.pincode = "";
            $scope.state = "";
            $scope.city = "";
            $scope.selectedArea = "";

        }
    }
    $scope.onSOChange = function () {
        if ($scope.data.selectedSo != "") {
            console.log($scope.data.selectedSo);
        } else {
            $scope.data.selectedSo = "";
            $scope.pincode = "";
            $scope.state = "";
            $scope.city = "";
            $scope.selectedArea = "";
        }

    }
    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Add mechanic Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})