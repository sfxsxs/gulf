gulf.controller('CPloginCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService) {
    /*   alert($rootScope.logedinUser);*/
    $scope.email = $rootScope.logedinUser;
    var selcetdLang = JSON.parse(localStorage.getItem("userSelectedLanguage"));
    console.log(selcetdLang);

    LoginService.appLanguagesData(selcetdLang).then(function (result) {
        LoaderService.hideLoading();
        console.log(result);
        if (result != "") {
            if (result.Status == true) {
                localStorage.setItem("Language", JSON.stringify(result.data));
                console.log(result.data);

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

    $scope.Login = function () {


        console.log("cccccccccccccc")
        if ($scope.email != "" && $scope.password != "" && $scope.email != undefined && $scope.password != undefined) {
            LoaderService.showLoading();
            $scope.email = $scope.email.toLowerCase();
            var encodedEmail = ConverBase64.convertBase64($scope.email);


            LoginService.userLogin(encodedEmail, $scope.password).then(function (result) {
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {
                            localStorage.setItem("userData", JSON.stringify(result.Data[0]));
                            $rootScope.token=result.token;
                            console.log("login-token"+$rootScope.token);
                            localStorage.setItem("token", JSON.stringify(result.token));
                            $rootScope.encoded_usd_mobile = ConverBase64.convertBase64(result.Data[0].usd_mobile);
                            $rootScope.userData = result.Data[0];
                            $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                            $rootScope.NonMlpUSerID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                          $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
                          $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
                          $rootScope.userRole = result.Data[0].role_fk_id;
                          try{
                            if (AppService.enableTracking) {
                                _paq.push(['setCustomVariable', 2, 'mobile', result.Data[0].usd_mobile, 'visit']);
                            }

                          }catch(err){
                              console.log(err);

                          }

                        if(result.Data[0].user_category=="Loyalty User"){
                            $rootScope.viewStatus = true;
                            $rootScope.applogincount=result.Data[0].applogincount;
                            if (result.Data[0].usr_lastpasswordmodifiy == null) {
                                $rootScope.Firstpassword = $scope.password
                                $state.go('GkLoyalityOtp');
                               // $state.go('SetPassword');
                            }else{
                                try {
                                    TTS
                                        .speak({
                                            text: result.Message,
                                            locale: 'en-gb',
                                            rate: 0.95
                                        }, function () {

                                            $state.go('MechanicHome');

                                        },
                                            function (reason) {
                                                $state.go('MechanicHome');
                                            });
                                } catch (err) {
                                    $state.go('MechanicHome');
                                }

                            }

                        }
                        //Regular User
                        else if(result.Data[0].user_category=="Regular User")
                        {
                            $rootScope.viewStatus = true;
                            if (result.Data[0].usr_lastpasswordmodifiy == null) {
                                $rootScope.Firstpassword = $scope.password
                                $state.go('SetPassword');
                            }else if((result.Data[0].usd_longitude == null || result.Data[0].usd_longitude == "" || result.Data[0].usd_longitude == undefined)
                            || (result.Data[0].usd_firstname == null || result.Data[0].usd_firstname == "" || result.Data[0].usd_firstname == undefined)
                            || (result.Data[0].usd_pincode == null || result.Data[0].usd_pincode == "" || result.Data[0].usd_pincode == undefined)
                            || (result.Data[0].state_name == null || result.Data[0].state_name == "" || result.Data[0].state_name == undefined)
                            || (result.Data[0].area_name == null || result.Data[0].area_name == "" || result.Data[0].area_name == undefined)
                            || (result.Data[0].usd_latitude == null || result.Data[0].usd_latitude == "" || result.Data[0].usd_latitude == undefined)
                            || (result.Data[0].usd_mobile == null || result.Data[0].usd_mobile == "" || result.Data[0].usd_mobile == undefined)
                            || (result.Data[0].city_name == null || result.Data[0].city_name == "" || result.Data[0].city_name == undefined)
                            || (result.Data[0].usd_address1 == null || result.Data[0].usd_address1 == "" || result.Data[0].usd_address1 == undefined)   
                            )
                            {  
                                localStorage.removeItem('userData');
                              localStorage.setItem("NonMlpTemporaryProfileData", JSON.stringify(result.Data[0]));
                              $state.go('NonMlpRegistration');

                            }else{
                                try {
                                    TTS
                                        .speak({
                                            text: result.Message,
                                            locale: 'en-gb',
                                            rate: 0.95
                                        }, function () {
    
                                        },function (reason) {
                                             
                                            });
                                } catch (err) {   
                                    
                                }
                                $state.go('NonMlpHome');
                                
                            }

                        }
                        else if(result.Data[0].user_category=="Channel Partner")
                        {
                              //customer Login
                              $rootScope.viewStatus = true;
                              if (result.Data[0].usr_lastpasswordmodifiy == null) {
                                $rootScope.Firstpassword = $scope.password
                                $state.go('SetPassword');
                            }else if((result.Data[0].usd_longitude == null || result.Data[0].usd_longitude == "" || result.Data[0].usd_longitude == undefined)
                            || (result.Data[0].usd_firstname == null || result.Data[0].usd_firstname == "" || result.Data[0].usd_firstname == undefined)
                            || (result.Data[0].usd_pincode == null || result.Data[0].usd_pincode == "" || result.Data[0].usd_pincode == undefined)
                            || (result.Data[0].state_name == null || result.Data[0].state_name == "" || result.Data[0].state_name == undefined)
                            || (result.Data[0].area_name == null || result.Data[0].area_name == "" || result.Data[0].area_name == undefined)
                            || (result.Data[0].usd_latitude == null || result.Data[0].usd_latitude == "" || result.Data[0].usd_latitude == undefined)
                            || (result.Data[0].usd_mobile == null || result.Data[0].usd_mobile == "" || result.Data[0].usd_mobile == undefined)
                            || (result.Data[0].city_name == null || result.Data[0].city_name == "" || result.Data[0].city_name == undefined)
                            || (result.Data[0].usd_address1 == null || result.Data[0].usd_address1 == "" || result.Data[0].usd_address1 == undefined)   
                            )
                            {
                                localStorage.removeItem('userData');
                                localStorage.setItem("cutomerProfileData", JSON.stringify(result.Data[0]));
                              $state.go('NonMlpRegistration');

                            }else{
                                try {
                                    TTS
                                        .speak({
                                            text: result.Message,
                                            locale: 'en-gb',
                                            rate: 0.95
                                        }, function () {
    
                                            $state.go('CPHome');
    
                                        },
                                            function (reason) {
                                                $state.go('CPHome');
                                            });
                                } catch (err) {
                                    $state.go('CPHome');
                                }

                            }

                        }
                        else if(result.Data[0].role_fk_id == "6")
                        {
                            $rootScope.viewStatus = true;
                            if (result.Data[0].usr_lastpasswordmodifiy == null) {
                                $rootScope.Firstpassword = $scope.password
                                $state.go('SetPassword');
                            }else{
                                $state.go('Home');
                                
                            }
                            

                        }
                        else if(result.Data[0].role_fk_id == "12" || result.Data[0].role_fk_id == "13" || result.Data[0].role_fk_id == "14")
                        {
                            $rootScope.viewStatus = true;
                            if (result.Data[0].usr_lastpasswordmodifiy == null) {
                                $rootScope.Firstpassword = $scope.password
                                $state.go('SetPassword');
                            }else{
                                $state.go('RH_AH_TH_home');
                                
                            }

                        }
                        else if (result.Data[0].role_fk_id == 21) 
                        {
                            $state.go('CodeVerification');
                        }

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
                template: "Please Enter User Name and Password"
            });
        }

    }

    $scope.showPopupForgotPassword = function () {
        // When button is clicked, the popup will be shown...

        $scope.data = {}

        // Custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type = "Number" ng-model = "data.model" placeholder = "Enter Phone Number">',
            scope: $scope,

            buttons: [
                {
                    text: 'Cancel'
                }, {
                    text: '<b>Submit</b>',
                    type: 'button-positive',
                    onTap: function (e) {

                        if (!$scope.data.model) {
                            //don't allow the user to close unless he enters model...
                            alert("Please Enter Phone Number");
                            e.preventDefault($scope.data.model);

                        } else {
                            return $scope.data.model;
                        }
                    }
                }
            ]
        });

        myPopup.then(function (res) {
            console.log('Tapped!', res);
            if (res.length == 10) {

                var encodedMobileNumber = ConverBase64.convertBase64($scope.data.model);
                LoginService.forgotPassword(encodedMobileNumber).then(function (result) {
                    console.log(result);
                });
            } else {
                alert("Please Enter Valid Phone Number");


            }
        });
    }

    $scope.ChangePassword = function () {
        console.log($scope.changePassword)
        if ($scope.changePassword != "" && $scope.changePasswordCfrm != "" && $scope.changePassword != undefined && $scope.changePasswordCfrm != undefined) {
            if ($scope.changePassword == $scope.changePasswordCfrm) {
                LoaderService.showLoading();
                LoginService.changePassword($rootScope.userID, $rootScope.Firstpassword, $scope.changePassword, $scope.changePasswordCfrm, "changePwd").then(function (result) {
                    LoaderService.hideLoading();
                    if (result != "") {
                        if (result.Status == true) {
                            $scope.changePassword = "";
                            $scope.changePasswordCfrm = "";
                            var myPopup = $ionicPopup.show({
                                template: result.Message,
                                scope: $scope,

                                buttons: [
                                    {
                                        text: '<b>Ok</b>',
                                        type: 'button-positive',
                                        onTap: function (e) {

                                            if ($rootScope.userData.role_fk_id == 5) {

                                                // $state.go('MechanicHome');
                                                try {
                                                    TTS
                                                        .speak({
                                                            text: result.Message,
                                                            locale: 'en-gb',
                                                            rate: 0.95
                                                        }, function () {

                                                            $state.go('MechanicHome');

                                                        },
                                                            function (reason) {
                                                                $state.go('MechanicHome');
                                                            });
                                                } catch (err) {
                                                    $state.go('MechanicHome');
                                                }
                                            } else if ($rootScope.userData.role_fk_id == 6) {
                                                $state.go('Home');
                                            } else if ($rootScope.userData.role_fk_id == "12" || $rootScope.userData.role_fk_id == "13" || $rootScope.userData.role_fk_id == "14") {
                                                $state.go('RH_AH_TH_home');
                                            } else if (result.Data[0].role_fk_id == 21) {
                                                $state.go('CodeVerification');
                                            }
                                        }
                                    }
                                ]
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
                    console.log(result);
                })

            } else {

                var alertPopup = $ionicPopup.alert({
                    template: "Password is not matching"
                });
            }
        } else {

            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Password"
            });

        }


    }

    $scope.passwordChange = function () {

        console.log($scope.changePassword)
        if ($scope.changePassword != "" && $scope.changePasswordCfrm != "" && $scope.changePassword != undefined && $scope.changePasswordCfrm != undefined) {
            if ($scope.changePassword == $scope.changePasswordCfrm) {
                var passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?\":{}|<>])(?=.*[0-9]).{1,8}$/;
                if (passwordPattern.test($scope.changePassword)) {
                LoaderService.showLoading();
                LoginService.changePassword($rootScope.forgotUSerID, $rootScope.forgoOldPAssword, $scope.changePassword, $scope.changePasswordCfrm, "forgotPwd").then(function (result) {
                    LoaderService.hideLoading();
                    if (result != "") {
                        if (result.Status == true) {
                            var myPopup = $ionicPopup.show({
                                template: result.Message,
                                scope: $scope,

                                buttons: [
                                    {
                                        text: '<b>Ok</b>',
                                        type: 'button-positive',
                                        onTap: function (e) {
                                            $state.go('Login');
                                        }
                                    }
                                ]
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
                    console.log(result);
                })
            }else {
                // Password does not meet the criteria
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: "Password must contain at least one uppercase letter, one special character, one number, and be 8 characters or less."
                });
            }
            } else {

                var alertPopup = $ionicPopup.alert({
                    template: "Password is not matching"
                });
            }
        } else {

            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Password"
            });

        }


    }

    $scope.forgotPassword = function () {
        $state.go('ForgetPassword');

    }

    $scope.sendUserNameToGetOTP = function () {

        if ($scope.userName != "" && $scope.userName != undefined) {
            if (AppService.enableTracking) {
                _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ForgotPassword', '1', { dimension6: 'ForgotPassword', dimension7: $scope.userName }]);
            }
            $scope.uName = $scope.userName.toString();
            if ($scope.uName.length == 10) {
                $rootScope.encodedUserName = ConverBase64.convertBase64($scope.uName);
                LoaderService.showLoading();
                LoginService.forgotPassword($rootScope.encodedUserName).then(function (result) {
                    LoaderService.hideLoading();
                    if (result != "") {
                        console.log(result);
                        if (result.Status == true) {
                            $rootScope.userRecievedMobile = $scope.uName;
                            var res = $scope.uName.slice(6, 10);
                            $rootScope.forgot_last_digit = res;
                            $state.go('ForgetPasswordOTP');
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
                    template: "Please Enter Registered Mobile Number"
                });
            }

        } else {

            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Registered Mobile Number"
            });

        }

    }

    $scope.showCall = true;
    $scope.resendOtp = function () {
        LoaderService.showLoading();
        LoginService.forgotPassword($rootScope.encodedUserName).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);
            if (result != "") {
                if (result.Status == true) {
                    $scope.showCall = false;
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
    $scope.callOTP = function () {
        LoaderService.showLoading();
        CodeCheckInService.callOTP($rootScope.encodedUserName).then(function (result) {
            console.log(result);
            LoaderService.hideLoading();
            if (result != "") {
                if (result.Status == true) {

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





    $scope.checkOtp = function () {

        console.log($scope.OTP);

        if ($scope.OTP != "" && $scope.OTP != undefined) {
            var otp = $scope.OTP.toString();
            otp = ConverBase64.convertBase64(otp);
            var mob = $rootScope.userRecievedMobile.toString();
            mob = ConverBase64.convertBase64(mob);
            LoaderService.showLoading();
            CodeCheckInService.checkOTP(otp, mob).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);
                if (result != "") {
                    //console.log(result.data);
                    if (result.Status == true) {
                        $rootScope.forgotUSerID = ConverBase64.convertBase64(result.data[0].userId);
                        $rootScope.forgoOldPAssword = result.data[0].oldPwd;
                        $scope.OTP = "";
                        $state.go('SetPasswordForForgotPasssword');
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
                template: "Please Enter OTP"
            });
        }
    }

    $scope.goTOchatBoxHome = function () {
        $state.go('ChatBootPreLogin');
        if (AppService.enableTracking) {

            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'ChatIconClick', '1', { dimension6: 'ChatIcon', dimension7: "" }]);
        }
    }

    $scope.phoneClick = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'PhoneIconClick', '1', { dimension6: 'PhoneIcon', dimension7: "" }]);
        }
    }

    $ionicPlatform.ready(function () {
        document.addEventListener("deviceReady", function () {
            document.addEventListener("resume", function () {
                //alert("popup");
            }, false);
        });
    });

    try{
        if(AppService.enableTracking){
            _paq.push(['setDocumentTitle', "Login Page"]);
            _paq.push(['trackPageView']);
        }
      }catch(err){
        console.log(err);
      }
});