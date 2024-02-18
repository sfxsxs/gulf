gulf.controller('LoginPromoCPCtrl', function ($scope, NonMlpServices, ConverBase64, $rootScope, $ionicPopup, HeaderService, $state, LoaderService, AppService, ChannelPartnersServices) {
  //var userID = ConverBase64.convertBase64($rootScope.NonMlpUserID);
  console.log($rootScope.encoded_usd_mobile + "sssss");
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  $scope.NonMlpUserType = function () {
    $state.go('NonMlpUserType');
  }
  $rootScope.CPLoginpromocode = false;
  $scope.LoginpromoCode = "";
  $scope.CPLoginCodeValidation = function () {
    if ($scope.LoginpromoCode != "" && $scope.LoginpromoCode != undefined) {
      LoaderService.showLoading();
      ChannelPartnersServices.loginpromocode($rootScope.encoded_usd_mobile, $scope.LoginpromoCode).
        then(function (result) {
          LoaderService.hideLoading();

          if (result.Status == true) {
            $rootScope.CPLoginpromocode = true;
            console.log(result);
            var mobilenum = result.Data.usd_mobile;
            $rootScope.NonMlpRecievedMobile = result.Data.usd_mobile;
            $rootScope.NonMlp_last_digit = mobilenum.slice(6, 10);
            $rootScope.cpEncodedMobileNumber = ConverBase64.convertBase64(mobilenum);
            $state.go('NonMlpOtpValidation');
            //  $rootScope.NonMlpUserID = result.Data[0].usr_pk_id;
            //   $rootScope.encodeNonMlpUSerIDLogin = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
            //   $rootScope.wtencodeNonMlpUSerIDLogin = result.Data[0].usr_pk_id;
            //  $rootScope.userData = result.Data[0];
            //  $rootScope.usd_firstname_nonMlp = result.Data[0].usd_firstname;
            //  $rootScope.bank_verifystatus = result.Data[0].bank_verifystatus;
            //  $rootScope.bankAccountIdNonMlp = result.Data[0].bankdetailId;
            //  $rootScope.userID = ConverBase64.convertBase64(result.Data[0].usr_pk_id);
            //  $rootScope.userRole = $rootScope.userData.role_fk_id;
            //   $scope.username=result.Data[0].usd_mobile;
            //  var res = $scope.username.slice(6, 10);
            //  $rootScope.NonMlp_last_digit = res;
            // $state.go('NonMlpOtpValidation');

          }
          else {

            var alertPopup = $ionicPopup.alert({
              template: result.Message
            });
          }

        });
    } else {
      var alertPopup = $ionicPopup.alert({
        template: "Please Enter Promo Code"
      });

    }


  }
})
