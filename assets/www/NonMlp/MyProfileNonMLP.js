gulf.controller('MyProfileNonMLPCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService, AddMechanicService, NonMlpServices) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.profile= {
        "name":"",
        "address":"",
        "lastname":"",
        "state":"",
        "pincode":"",
        "city":"",
        "selectedArea":"",
        "pan_availability":"",
        "pan_no":"",
        "pan_image":"",
        "upi_id":""
    };
    $scope.checkPincode = function () {
        var pincode;
        if ($scope.profile.pincode != null) {
            pincode = $scope.profile.pincode.toString();
            if (pincode.length == 6) {

                console.log($scope.profile.pincode);
                var checkpincodeMap = ConverBase64.convertBase64($rootScope.NonMlpUserID);
                LoaderService.showLoading();
                AddMechanicService.getStateCityByPincodeNew($scope.profile.pincode, checkpincodeMap).then(function (result) {
                    LoaderService.hideLoading();
                    console.log(result);
                    console.log(result.Data.stateName);
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];
                    if (result.Status == true) {
                        $scope.profile.state = result.Data.stateName;
                        $scope.profile.city = result.Data.cityName;
                        $scope.getMutipleArea();

                    } else {
                        $scope.profile.state = "";
                        $scope.profile.city = "";
                        $scope.profile.selectedArea = "";
                        $scope.AvailabelArea = "";
                        var alertPopup = $ionicPopup.alert({
                            template: show_msg
                        });

                    }
                    LoaderService.hideLoading();
                });
            } else {
                $scope.profile.state = "";
                $scope.profile.city = "";
                $scope.profile.selectedArea = "";
                $scope.AvailabelArea = "";
            }
        }

    }
    $scope.getMutipleArea = function () {
        LoaderService.showLoading();
        AddMechanicService.getAreaListNew($scope.profile.pincode).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.AvailabelArea = result.Data;
            console.log($scope.AvailabelArea.length);
        });
    }

    $scope.gotoPanPopupPage = function (){
        if($scope.pan_availability == 2){
            $state.go('PanSubmittedMsg',{status:'Rejected'}) 
        }else{
            $state.go('PanImageUpload');
        }
    }

    try {
        LoaderService.showLoading();
        NonMlpServices.profileDetailsNONMLP($rootScope.NonMlpUserID).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            $scope.name = result.Data[0].usd_firstname;
            $scope.mobileNo = result.Data[0].usd_mobile;
            $scope.userType = result.Data[0].user_type;
            $scope.langname = result.Data[0].lang_name;
            $scope.address = result.Data[0].usd_address1;
            $scope.pincode = parseInt(result.Data[0].usd_pincode);
            $scope.upi_id = result.Data[0].upi_id;

            $scope.pan_availability = result.Data[0].pan_availability;
            
            if(result.Data[0].pan_availability=='Yes') {
                $scope.pan_availability = 1;
            } else if(result.Data[0].pan_availability=='No' && (result.Data[0].pan_number != null && result.Data[0].pan_number != "")) {
                $scope.pan_availability = 2;
            } else {
                $scope.pan_availability = 0;
            }

            $scope.pan_no = result.Data[0].pan_number;
            if($scope.pan_availability == 1){
                $scope.pan_no = result.Data[0].pan_number;
                $scope.pan_image = AppService.url +'uploads/panpictures/'+ result.Data[0].pan_picture;
            }
            
            $scope.state = result.Data[0].state_name;
            $scope.city = result.Data[0].city_name;
            $scope.selectedArea = result.Data[0].area_name;
            $scope.user_type = result.Data[0].user_type;

            $scope.profile.name = $scope.name;
            $scope.profile.address = $scope.address;
            // $scope.profile.lastname = "";
            $scope.profile.state = $scope.state;
            $scope.profile.pincode = $scope.pincode;
            $scope.profile.city =$scope.city;
            $scope.profile.selectedArea = $scope.selectedArea;
            $scope.getMutipleArea();
        });

    } catch (err) {

    }

    $scope.updateNMLPProfile = function () {
        console.log($scope.profile);
        console.log($scope.name);
        console.log($scope.upi_id);
        $scope.lastname = "";
        if ($scope.profile.name != "" && $scope.profile.name != null && $scope.profile.name != undefined &&
            $scope.profile.upi_id != "" && $scope.profile.upi_id != null && $scope.profile.upi_id != undefined &&
            $scope.profile.state != "" && $scope.profile.state != null && $scope.profile.state != undefined &&
            $scope.profile.pincode != "" && $scope.profile.pincode != null && $scope.profile.pincode != undefined &&
            $scope.profile.city != "" && $scope.profile.city != null && $scope.profile.city != undefined &&
            $scope.profile.address != "" && $scope.profile.address != null && $scope.profile.address != undefined &&
            $scope.profile.selectedArea != "" && $scope.profile.selectedArea != null && $scope.profile.selectedArea != undefined) {
            //user_id, first_name, last_name,state,pincode,city,address,area
            
            LoaderService.showLoading();
            NonMlpServices.updateNMLPProfileMyprofile($rootScope.NonMlpUserID,
                $scope.profile.name,
                $scope.profile.lastname,
                $scope.profile.state,
                $scope.profile.pincode,
                $scope.profile.city,
                $scope.profile.address,
                $scope.profile.selectedArea,
                $scope.profile.upi_id
                )
                .then(function (result) {
                    console.log(result);
                    LoaderService.hideLoading();
                    try {

                        var tempData = JSON.parse(localStorage.getItem("userData"));
                        tempData.usd_firstname = $scope.profile.name;
                        tempData.usd_pincode = $scope.profile.pincode;
                        tempData.state_name = $scope.profile.state;
                        tempData.city_name = $scope.profile.city;
                        tempData.usd_address1 = $scope.profile.address;
                        tempData.area_name = $scope.profile.selectedArea;
                        tempData.upi_id = $scope.profile.upi_id;
                        localStorage.setItem("userData", JSON.stringify(tempData));

                        $rootScope.userData.usd_firstname = $scope.profile.name;

                    } catch (ex) { }
                    var msg_code = result.message_code;
                    var show_msg = $scope.data.localAppLanguage[msg_code];

                    var alertPopup = $ionicPopup.alert({
                        template: show_msg
                    });
                    if (result.Status == true) {
                        $state.go('NonMlpHome');

                    }



                });
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter All Mandatory Fields"
            });
        }
    }

    $scope.updateBankDetails = function () {
        $state.go('EditBankDetails');
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP My Profile Page"]);
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