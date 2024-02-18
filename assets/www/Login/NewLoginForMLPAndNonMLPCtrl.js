gulf.controller('NewLoginForMLPAndNonMLPCtrl', function ($scope, LoginService, $state, $rootScope, ConverBase64, $ionicPopup, LoaderService, LoaderService, CodeCheckInService, $cordovaDevice, $ionicPlatform, AppService) {
  $rootScope.user_category=""
  $scope.Login = function () {
   // $scope.getGeoLocation();
   var termandCondtion = document.getElementById("agreeForTandC").checked;
   if(termandCondtion == true){
    if ($scope.username != "" && $scope.username != undefined) {
      var mobileNumberPattern = /^[6-9]\d{9}$/;
  
      if ($scope.username && mobileNumberPattern.test($scope.username)) {
        LoaderService.showLoading();
        $scope.username = $scope.username.toLowerCase();
        var encodedUsername = ConverBase64.convertBase64($scope.username);
        $rootScope.global_encodedUsername=encodedUsername;
        $rootScope.dontHaveCodeStaus = false;
        LoginService.userMobileLogin(encodedUsername).then(function (result) {
          LoaderService.hideLoading();
          console.log(result);
          if (result != "") {
            console.log(result);
            if (result.Status == true) {
  
              if(result.Data.length == 0 || result.Data.length == "0")
              { 
                //New User
                $rootScope.encoded_usd_mobile = encodedUsername;
                $rootScope.NonMlpRecievedMobile = $scope.username;
                $state.go('LoginPromoCP');
  
              }
              else
              {
                 //Loality User
                  if(result.Data[0].user_category=="Loyalty User")
                  {
                    
                    if(result.Data[0].usr_lastpasswordmodifiy==null || result.Data[0].usr_lastpasswordmodifiy==""){
                      $rootScope.NonMlpRecievedMobile = result.Data[0].usd_mobile;
                      $rootScope.encoded_usd_mobile = ConverBase64.convertBase64(result.Data[0].usd_mobile);  
                      $rootScope.user_category=result.Data[0].user_category;
                      var res = $scope.username.slice(6, 10);
                      $rootScope.NonMlp_last_digit = res;
                      $state.go('GkLoyalityOtp');
                    }else{
                      $rootScope.logedinUser = $scope.username;
                    $rootScope.NonMlpRecievedMobile = $scope.username;//our input 
                    $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
  
                    if (result.Data[0].lang_name != null && result.Data[0].lang_name != "" && result.Data[0].lang_name != undefined) {
                      localStorage.setItem("userSelectedLanguage", JSON.stringify(result.Data[0].lang_name));
                    } else {
                      localStorage.setItem("userSelectedLanguage", JSON.stringify("English"));
                    }
                      console.log("Loality User");
                      $state.go('Login');
                    }
                    
  
                  }
                    //Regular User
                  else if(result.Data[0].user_category=="Regular User")
                  {
                    if(result.Data[0].usr_lastpasswordmodifiy==null || result.Data[0].usr_lastpasswordmodifiy==""){
                      $rootScope.NonMlpRecievedMobile = result.Data[0].usd_mobile;
                      $rootScope.encoded_usd_mobile = ConverBase64.convertBase64(result.Data[0].usd_mobile);
                      localStorage.setItem("NonMlpTemporaryProfileData", JSON.stringify(result.Data[0]));
                      //alert($rootScope.NonMlpRecievedMobile)
                      var res = $scope.username.slice(6, 10);
                      $rootScope.NonMlp_last_digit = res;
                      $state.go('GkOtp');
                    }else{
                      $rootScope.logedinUser = $scope.username;
                      $rootScope.NonMlpRecievedMobile = $scope.username;//our input 
                      $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
  
                      if (result.Data[0].lang_name != null && result.Data[0].lang_name != "" && result.Data[0].lang_name != undefined) {
                        localStorage.setItem("userSelectedLanguage", JSON.stringify(result.Data[0].lang_name));
                      } else {
                        localStorage.setItem("userSelectedLanguage", JSON.stringify("English"));
                      }
                        console.log("Regular User");
                        $state.go('NonMLPLogin');
                      }
  
                  }
                  else if(result.Data[0].user_category=="Channel Partner")
                  {
                    if(result.Data[0].usr_lastpasswordmodifiy==null || result.Data[0].usr_lastpasswordmodifiy==""){
                      $rootScope.NonMlpRecievedMobile = result.Data[0].usd_mobile;
                      $rootScope.encoded_usd_mobile = ConverBase64.convertBase64(result.Data[0].usd_mobile);
                      localStorage.setItem("cutomerProfileData", JSON.stringify(result.Data[0]));
                      var res = $scope.username.slice(6, 10);
                      $rootScope.NonMlp_last_digit = res;
                      $state.go('GkOtp');
                    }else{
                      $rootScope.logedinUser = $scope.username;
                      $rootScope.NonMlpRecievedMobile = $scope.username;//our input 
                      $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
  
                      if (result.Data[0].lang_name != null && result.Data[0].lang_name != "" && result.Data[0].lang_name != undefined) {
                        localStorage.setItem("userSelectedLanguage", JSON.stringify(result.Data[0].lang_name));
                      } else {
                        localStorage.setItem("userSelectedLanguage", JSON.stringify("English"));
                      }
                        console.log("Channel User");
                        $state.go('CPLoginPass');
                      }
                    
                  }
                  else if(result.Data[0].role_fk_id == "6" || result.Data[0].role_fk_id == "12" ||
                   result.Data[0].role_fk_id == "13" || result.Data[0].role_fk_id == "14" ||
                    result.Data[0].role_fk_id == "28" || result.Data[0].role_fk_id == "30" || result.Data[0].role_fk_id == "27"
                   
                   ){
                    $rootScope.logedinUser = $scope.username;
                    $rootScope.NonMlpRecievedMobile = $scope.username;//our input 
                    $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
  
                    if (result.Data[0].lang_name != null && result.Data[0].lang_name != "" && result.Data[0].lang_name != undefined) {
                      localStorage.setItem("userSelectedLanguage", JSON.stringify(result.Data[0].lang_name));
                    } else {
                      localStorage.setItem("userSelectedLanguage", JSON.stringify("English"));
                    }
                      console.log("SO/AH User");
                      $state.go('Login');
                  }else{
                    //data but not valid user
                    var alertPopup = $ionicPopup.alert({
                      template: 'You are not authorized to access'
                    });
  
                  }
              }
  
            } else {
              //Not a valid User
              var alertPopup = $ionicPopup.alert({
                template: result.Message
              });
            }
  
          } else {
  
  
            //No Response from server
            var alertPopup = $ionicPopup.alert({
              template: "No Response from server,Please Try Again"
            });
          }
        });
  
      } else {
          var alertPopup = $ionicPopup.alert({
              template: "Please Enter a valid Mobile Number."
          });
      }

    } else {

      var alertPopup = $ionicPopup.alert({
        template: "Please Enter User Name "
      });
    }
   }else{
    var alertPopup = $ionicPopup.alert({
      template: "Kindly read the term and conditions and check in the box to login in the app"
      });
   }
    
  }

  $ionicPlatform.onHardwareBackButton(function onBackKeyDown(e) {
    if ($state.current.name == "NewLoginForMLPAndNonMLP") {
      ionic.Platform.exitApp();
    }

  });

  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Login Username Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }

  $scope.getGeoLocation = function(){
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
                console.log(lat + "----------" + lat);
                console.log(long + "----------" + long);
                      
            };
    
            function onError(error) {
                console.log("getGeoLocation called error");
               // alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
            }
    
        }
});