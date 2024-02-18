gulf.controller('EditDreamIncomeCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, DreamIncomeService, LoaderService, AppService) {
    $scope.role = $rootScope.userData.role_fk_id;
    $scope.milestoneDateEdit = $rootScope.dreamdate;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.data = {};
    if ($rootScope.potentialamount != null) {
        $scope.potentialAmountEdit = parseInt($rootScope.potentialamount);
    }


    $scope.data.discritionEdit = $rootScope.dreamdesc;
    // alert($scope.discritionEdit);
    $scope.dateSlected = true;
    $scope.discritionEdit = "";
    $scope.amountEdit = parseInt($rootScope.amountrecommended);
    if (userData && userData.user_category == "Loyalty User") {
        $scope.soId = $rootScope.userID;
        $scope.userID = $rootScope.userID;
    } else if ($scope.role == "6" || $scope.role == "6") {
        $scope.soId = $rootScope.userID;
        $scope.userID = $rootScope.mechanicUserIdForDreamIncome;
    }
    var dtstart = new Date();
    dtstart.setMonth(dtstart.getMonth() + 3)
    var d = new Date(2020, 10, 1);
    d.setMonth(d.getMonth() + 3);
    d.setDate(1);
    var dt = new Date();
    var lastDate = "31-12-" + dt.getFullYear();
    $("#milestoneDateEdit1").datepicker({
        format: "mm-yyyy",
        viewMode: "months",
        startDate: dtstart,
        minViewMode: "months",
        disableTouchKeyboard: true,
        endDate: d,
        clearBtn: true,
        autoclose: true
    }).on('changeDate', function (e) {

    });
    // $("#milestoneDateEdit").datepicker({

    //     todayHighlight: false,
    //     format: "dd-mm-yyyy",
    //     startDate: '+90d',
    //     endDate:lastDate,
    //     disableTouchKeyboard: true,
    //     clearBtn: true,
    //     autoclose: true

    // }).on('changeDate', function (e) {

    // });

    $scope.milestoneDateselected = function () {
        LoaderService.showLoading();
        DreamIncomeService.getPotentialTarget($scope.userID, $scope.milestoneDateEdit, $scope.role, $scope.soId).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);

            if (result.Status == true) {
                $scope.enteredAmountEdit = "";
                $scope.potentialAmountEdit = parseInt(result.Data);
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }
        })
    }
    // $scope.milestoneDateselected();
    $scope.submitEdit = function () {
        if ($scope.milestoneDateEdit != "" && $scope.milestoneDateEdit != null && $scope.milestoneDateEdit != undefined &&
            $scope.potentialAmountEdit != "" && $scope.potentialAmountEdit != null && $scope.potentialAmountEdit != undefined) {
            if ($scope.potentialAmountEdit < $scope.amountEdit) {
                DreamIncomeService.updateDreamIncome($rootScope.dreamid, $scope.userID, $scope.data.discritionEdit, $scope.milestoneDateEdit, $scope.soId, $scope.amountEdit, $scope.potentialAmountEdit).then(function (result) {
                    console.log(result);
                    if (result.Status == true) {

                        $rootScope.dreamdate = result.data.date;
                        $rootScope.recomd = result.data.recomd;
                        $rootScope.amountrecommended = result.data.amount
                        $rootScope.potentialamount = result.data.potentialamount
                        $rootScope.dreamdesc = result.data.dreamdesc;
                        $rootScope.dreamid = result.data.dreamid;
                        $rootScope.displaydate = result.data.displaydate;
                        console.log(result.data.dreamdesc);

                        $state.go('SetAndEditDreamIncome');

                    } else {
                        var alertPopup = $ionicPopup.alert({
                            template: result.Message
                        });
                    }
                })
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: "Amount Must be greater then " + $scope.amountEdit
                });
            }
        } else {
            var alertPopup = $ionicPopup.alert({
                template: "Please Enter All Details"
            });
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Edit Dream Income Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})