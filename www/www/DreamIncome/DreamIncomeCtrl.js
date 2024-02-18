gulf.controller('DreamIncomeCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, DreamIncomeService, LoaderService, AppService) {

    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    $scope.role = $rootScope.userData.role_fk_id;
    $scope.dateSlected = false;

    var dtstart = new Date();
    dtstart.setMonth(dtstart.getMonth() + 3)


    var dt = new Date();
    console.log(dt.getFullYear());
    var d = new Date(2020, 10, 1);
    d.setMonth(d.getMonth() + 3);
    d.setDate(1);
    $("#milestoneDate1").datepicker({
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

    $scope.discrition = "";
    if ($scope.role == "5") {
        $scope.soId = $rootScope.userID
        $scope.userID = $rootScope.userID;
    } else if ($scope.role == "6") {
        $scope.soId = $rootScope.userID;
        $scope.userID = $rootScope.mechanicUserIdForDreamIncome;
    }
    //var dt = new Date();
    var lastDate = "31-12-" + dt.getFullYear();

    $scope.date = new Date().toISOString();


    $scope.dateChanged = function (date) {
        const { day, month, year } = date;
        this.selected.year(year.value).month(month.text).date(day.value);
    };

    $(function () {
        $("#datepicker").datepicker({ dateFormat: 'yy' });
    });

    $('#datepicker').datepicker({
        dateFormat: 'yy'
    })

    $('#first-datepicker').datepicker({
        changeYear: true,
        changeMonth: true,
        beforeShow: function (input, inst) {
            setMyDate(inst);
        },
        onClose: function (dateText, inst) {
            saveMyDate(inst);

            var secondDatePicker = $('#second-datepicker').data('datepicker');
            var dateSetted = secondDatePicker.input.data('date-setted');

            setMyDate(secondDatePicker);

            secondDatePicker.input.datepicker('option', 'minDate', new Date(inst.selectedYear, inst.selectedMonth, 0));

            if (dateSetted == true) {
                saveMyDate(secondDatePicker);
            };
        }
    });

    $('#second-datepicker').datepicker({
        changeYear: true,
        changeMonth: true,
        beforeShow: function (input, inst) {
            setMyDate(inst);
        },
        onClose: function (dateText, inst) {
            saveMyDate(inst);
        }
    });

    function saveMyDate(inst) {
        inst.selectedDay = 1;
        inst.input.data('year', inst.selectedYear);
        inst.input.data('month', inst.selectedMonth);
        inst.input.data('day', inst.selectedDay);

        var date = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);
        inst.input.datepicker('setDate', date);
        formatDate(inst, date);
        inst.input.data('date-setted', true);
    };

    function setMyDate(inst) {
        var dateSetted = inst.input.data('date-setted');

        if (dateSetted == true) {
            var year = inst.input.data('year');
            var month = inst.input.data('month');
            var day = inst.input.data('day');

            var date = new Date(year, month, day);
            inst.input.datepicker('setDate', date);
        };
    };

    function formatDate(inst, date) {
        var formattedDate = $.datepicker.formatDate('MM - yy', date);
        inst.input.val(formattedDate);
    };

    $("#milestoneDate").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        startDate: dtstart,
        endDate: d,
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

    });



    $scope.milestoneDateselected = function () {
        LoaderService.showLoading();
        DreamIncomeService.getPotentialTarget($scope.userID, $scope.milestoneDate, $scope.role, $scope.soId).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);
            if (result.Status == true) {
                $scope.enteredAmount = "";
                $scope.dateSlected = true;
                $scope.amount = parseInt(result.Data);
            } else {
                var alertPopup = $ionicPopup.alert({
                    template: result.Message
                });
            }

        })
    }
    $scope.submit = function () {
        if ($scope.milestoneDate != "" && $scope.milestoneDate != null && $scope.milestoneDate != undefined &&
            $scope.enteredAmount != "" && $scope.enteredAmount != null && $scope.enteredAmount != undefined) {
            if ($scope.enteredAmount > $scope.amount) {
                DreamIncomeService.addDreamIncome($scope.userID, $scope.discrition, $scope.milestoneDate, $scope.soId, $scope.enteredAmount, $scope.amount).then(function (result) {
                    console.log(result);
                    if (result.Status == true) {
                        $rootScope.dreamdate = result.data.date;
                        //$rootScope.dreamdate="03-2020";
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
                    template: "Amount must be greater then " + $scope.amount
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
            _paq.push(['setDocumentTitle', "Dream Income Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})