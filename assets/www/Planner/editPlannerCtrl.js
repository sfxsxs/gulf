gulf.controller('editPlannerCtrl', function ($scope, $rootScope, $state, ConverBase64, PlannerService, AppService, HeaderService, $stateParams, $ionicPopup, LoaderService) {

    //$rootScope.userID
    $scope.plannerId = $stateParams.id;
    $scope.servicingDate = $stateParams.servicedate;
    console.log($stateParams.id);
    console.log($stateParams.servicedate);
    $scope.mString = ($scope.plannerId).toString();
    $scope.cplannerId = ConverBase64.convertBase64($scope.mString);
    console.log($scope.cplannerId);

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    var todayDate = new Date().getDate();
    $("#date").datepicker({
        autoclose: true,
        todayHighlight: false,
        format: "dd-mm-yyyy",
        //endDate: "0",
        startDate: '+1d',
        disableTouchKeyboard: true

    }).on('changeDate', function (e) {
        e.stopPropagation();

    });
    $scope.editPlaneer = function () {
        if (AppService.enableTracking) {
            _paq.push(['trackEvent', 'OnClick', 'ButtonClick', 'MyCustomerUpdateClick', '1', { dimension6: 'MyCustomerUpdate', dimension7: $rootScope.userData.usd_mobile }]);
        }
        if ($scope.servicingDue != "" && $scope.servicingDue != undefined && $scope.servicingDue != null) {
            LoaderService.showLoading();
            PlannerService.editPlanner($rootScope.userID, $scope.cplannerId, $scope.servicingDue).then(function (result) {
                LoaderService.hideLoading();
                console.log(result);
                if (result.Status == true) {
                    //alert(result.Message);
                    $ionicPopup.alert({
                        template: result.Message
                    });
                    $state.go('PlaneerReport');
                }
            });
        } else {
            $ionicPopup.alert({
                template: "Please Select Date"
            });
        }


    }
    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Edit Planner Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }


})