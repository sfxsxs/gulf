gulf.controller('SoAddPlannerCtrl', function ($scope, $rootScope, $state, ConverBase64, PlannerService, AppService, HeaderService, $ionicPopup, LoaderService, AddMechanicService, LoaderService) {


    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.searchMechnaic = function () {
        // alert("SoAddPlannerCtrl");
        if ($scope.referralDataa != "" && $scope.referralDataa != undefined) {
            LoaderService.showLoading();
            AddMechanicService.checkReferral("Referral", ConverBase64.convertBase64($scope.referralDataa), "Mechanic").then(function (result) {
                console.log(result);
                LoaderService.hideLoading();
                if (result != "") {
                    if (result.Status == true) {
                        //$scope.afterSubmit = true;
                        console.log(result.data[0].usr_pk_id);
                        // localStorage.setItem("referralData", ConverBase64.convertBase64(result.Data.usr_pk_id));
                        $scope.retailerPkId = result.data[0].usr_pk_id;
                        $scope.referredName = result.data[0].name;
                        $rootScope.referredBy = result.data[0].name;
                        $scope.referredMobileNo = result.data[0].mobile;
                        $scope.referredId = result.data[0].employeeCode;
                        $scope.role_fk_id = result.data[0].role_fk_id;
                        $rootScope.soAddCustomer_MechnaicName = $scope.referredName;
                        $rootScope.soAddCustomer_MechnaicID = ConverBase64.convertBase64($scope.retailerPkId);

                        $state.go('AddPlaneer');
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
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter Mobile Number or ID"
            });
        }
    }
    $scope.getCheckedTrue = function () {
        //  localStorage.setItem("referralData", ConverBase64.convertBase64($scope.retailerPkId));
        $rootScope.soAddCustomer_MechnaicName = $scope.referredName;
        $rootScope.soAddCustomer_MechnaicID = ConverBase64.convertBase64($scope.retailerPkId);

        $state.go('AddPlaneer');

    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "So Add Planner Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

});