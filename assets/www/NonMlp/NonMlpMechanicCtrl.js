gulf.controller('NonMlpMechanicCtrl', function ($scope, $state, AddMechanicService, $ionicPopup, ConverBase64, $rootScope, LoaderService, LoaderService, HeaderService, AppService, NonMlpServices) {
    $scope.afterSubmit = false;
    $rootScope.nonMlpToMlpMechanic = false;;
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.referralChecking = function () {
        $scope.afterSubmit = false;
        console.log($scope.referralDataa);
        if ($scope.referralDataa != "" && $scope.referralDataa != undefined) {

            var encodedReferalData = ConverBase64.convertBase64($scope.referralDataa);

            console.log(encodedReferalData);
            console.log($rootScope.userID);
            console.log(AppService.url);

            NonMlpServices.NonMlptoMlpConversion($scope.referralDataa, $rootScope.userID).then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {
                        $scope.afterSubmit = true;
                        $scope.referredName = result.data[0].name;
                        $scope.referredMobileNo = result.data[0].usd_mobile;

                        $rootScope.usr_pk_id_NonMlpMechanic = result.data[0].usr_pk_id;
                        $rootScope.addName = result.data[0].name;
                        $rootScope.addmobile = parseInt(result.data[0].usd_mobile);;
                        $rootScope.addaddress1 = result.data[0].usd_address1;
                        $rootScope.addpincode = parseInt(result.data[0].usd_pincode);
                        $rootScope.addstate = result.data[0].state_name;
                        $rootScope.addcity = result.data[0].city_name;
                        $rootScope.addselectedArea = result.data[0].area_name;
                        $rootScope.addselectedLanguage = result.data[0].usd_lang_preference;
                        $rootScope.adddob = result.data[0].usd_dob;
                        $rootScope.nonMlpEmail = result.data[0].usd_email;

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
                template: "Please Enter UserId"
            });
        }


    }

    $scope.getCheckedTrue = function () {

        $rootScope.addMechanicNotUploadded = true;
        $rootScope.nonMlpToMlpMechanic = true;
        $state.go('addMechanicDirect');


    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Non MLP Mechanic Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }


});