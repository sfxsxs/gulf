gulf.controller("redeemOtpCtrl", function (
  $scope,
  LoginService,
  $rootScope,
  ConverBase64,
  $ionicPopup,
  CodeCheckInService,
  $ionicPopup,
  $state,
  LoaderService,
  HeaderService,
  UpdateMechanicProfileService,
  $cordovaInAppBrowser,
  AppService
) {
  $("body").removeClass("home-bg");
  $("body").addClass("body-bg-1");
  $scope.nonMlp = false;
  $scope.isOtherCustomer = false;

  var role = $rootScope.userData.role_fk_id;
  var userData = JSON.parse(localStorage.getItem("userData"));
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  if (userData && userData.user_category == "Regular User") {
    $scope.nonMlp = true;
  } else if (userData && userData.user_category == "Channel Partner") {
    $scope.isOtherCustomer = true;

  }

  var mob = $rootScope.redeemOTPMobile.toString();
  var mobileNumberOfMechanic = ConverBase64.convertBase64(mob);
  if (
    $rootScope.redeemOTPMobile != null &&
    $rootScope.redeemOTPMobile != undefined &&
    $rootScope.redeemOTPMobile != ""
  ) {
    var res = mob.slice(6, 10);
    $scope.last_digit = res;
  }

  $scope.checkOtp = function () {
    var userData = JSON.parse(localStorage.getItem("userData"));
    console.log($scope.OTP);
    if ($scope.OTP != "" && $scope.OTP != undefined) {
      var otp = $scope.OTP.toString();
      otp = ConverBase64.convertBase64(otp);
      mobEncoded = ConverBase64.convertBase64($rootScope.redeemOTPMobile);
      LoaderService.showLoading();

      CodeCheckInService.checkOTP(otp, mobEncoded).then(function (result) {
        LoaderService.hideLoading();
        if (result != "") {
          console.log(result);
          console.log(result.data);
          if (result.Status == true) {
            if (role == "6" || role == "27") {
              var options = {
                location: "yes"
              };

              console.log($rootScope.FhIdofMechanic);
              var url =
                AppService.placeOrderUrl +
                "login.php?uid=" +
                $rootScope.FhIdofMechanic +
                "&pid=NTI1NA==&usid=" +
                $rootScope.userID;
              console.log(url);
              document.addEventListener(
                "deviceready",
                function () {
                  $cordovaInAppBrowser
                    .open(url, "_blank", options)
                    .then(function (event) {
                      // success
                    })
                    .catch(function (event) {
                      // error
                    });
                },
                false
              );
            } else if (userData && userData.user_category == "Loyalty User") {
              var encodedFHId = ConverBase64.convertBase64(
                userData.usr_unique_id
              );
              console.log(userData.usr_unique_id);
              console.log(encodedFHId);
              $rootScope.encodedFHId = encodedFHId;
              var url =
                AppService.placeOrderUrl +
                "login.php?uid=" +
                encodedFHId +
                "&pid=NTI1NA==&usid=" +
                $rootScope.userID;
              console.log(url);
              var options = {
                location: "yes"
              };

              document.addEventListener(
                "deviceready",
                function () {
                  $cordovaInAppBrowser
                    .open(url, "_blank", options)
                    .then(function (event) {
                      // success
                    })
                    .catch(function (event) {
                      // error
                    });
                },
                false
              );
            }
            else if (userData && userData.user_category == "Regular User") {
              var encodedFHId = ConverBase64.convertBase64(
                userData.usr_unique_id
              );
              console.log(userData.usr_unique_id);
              console.log(encodedFHId);
              $rootScope.encodedFHId = encodedFHId;
              var url =
                AppService.placeOrderUrl +
                "login.php?uid=" +
                encodedFHId +
                "&pid=NTI1NA==&usid=" +
                $rootScope.userID;
              console.log(url);
              var options = {
                location: "yes"
              };

              document.addEventListener(
                "deviceready",
                function () {
                  $cordovaInAppBrowser
                    .open(url, "_blank", options)
                    .then(function (event) {
                      // success
                    })
                    .catch(function (event) {
                      // error
                    });
                },
                false
              );
            }
            else if (userData && userData.user_category == "Channel Partner") {
              var encodedFHId = ConverBase64.convertBase64(
                userData.usr_unique_id
              );
              console.log(userData.usr_unique_id);
              console.log(encodedFHId);
              $rootScope.encodedFHId = encodedFHId;
              var url =
                AppService.placeOrderUrl +
                "login.php?uid=" +
                encodedFHId +
                "&pid=NTI1NA==&usid=" +
                $rootScope.userID;
              console.log(url);
              var options = {
                location: "yes"
              };

              document.addEventListener(
                "deviceready",
                function () {
                  $cordovaInAppBrowser
                    .open(url, "_blank", options)
                    .then(function (event) {
                      // success
                    })
                    .catch(function (event) {
                      // error
                    });
                },
                false
              );
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
        template: "Please Enter OTP"
      });
    }
  };
  $scope.showCall = true;
  $scope.resendOTP = function () {
    LoaderService.showLoading();

    mob = ConverBase64.convertBase64($rootScope.redeemOTPMobile.toString());
    CodeCheckInService.sendOTP(mob).then(function (result) {
      LoaderService.hideLoading();
      if (result != "") {
        console.log(result);
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
  };

  $scope.callOTP = function () {
    LoaderService.showLoading();
    CodeCheckInService.callOTP(mob).then(function (result) {
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
  };

  try {
    if (AppService.enableTracking) {
      _paq.push(["setDocumentTitle", "Redeem OTP Page"]);
      _paq.push(["trackPageView"]);
    }
  } catch (err) {
    console.log(err);
  }
});
