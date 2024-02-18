gulf.controller('MechanicTransactionReportCtrl', function ($scope, TransactionService, $rootScope, $state, HeaderService,LoaderService,$ionicPopup,$location, $anchorScroll,AppService,ConverBase64,$stateParams,LoginService,AddMechanicService) {
    
   // $location.hash('top');

      $anchorScroll();    
//background image handling start

      $('body').removeClass('home-bg');  
         $('body').addClass('body-bg-1');
    
// $scope.pointsEarned1 = $rootScope.mechanicProfileEarnedPoint ;
//     if($rootScope.mechanicProfileredeemedPoint != null){
// $scope.pointsRedeemed1 = $rootScope.mechanicProfileredeemedPoint;
//     }else{
//         $scope.pointsRedeemed1 = 0;
//     }
// $scope.pointBalance1 =$rootScope.mechanicProfileBalancePoint ;
     
    //background image handling end  
    //header
    $scope.data={
        "fromdateMechProfile":"",
        "todateMechProfile":""
    };
    $scope.mech = false;
    $scope.so = false;
    $scope.userName = $rootScope.userData.usd_firstname;
    var role = $rootScope.userData.role_fk_id;
    var userData = JSON.parse(localStorage.getItem("userData"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);
    
    if (userData && userData.user_category=="Loyalty User") {
        $scope.mech = true;
    } else if (role == "6" || role == "27") {
        $scope.so = true;
    }



    $scope.dashboard = function () {
        if (userData && userData.user_category=="Loyalty User") {
            $state.go('MechDashboard');
        } else if (role == "6" || role == "27") {
            $state.go('Dashboard');
        }
    }

    $scope.addMechanic = function () {
        $state.go('AddMechanic');
    }
    $scope.myProfile = function () {
        $state.go('MyProfile');
    }

    $scope.mechProfile = function () {
        $state.go('UpdateMechanicProfile');
    }

    $scope.couponCode = function () {
        $state.go('CouponCode');
    }
    $scope.transactionSummary = function () {
        $state.go('TransactionReport');
    }
    $scope.referAFriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.gulfCorner = function () {
        $state.go('GulfCorner');
    }
    $scope.productEarning = function () {
        $state.go('ProductEarning');
    }
    $scope.orderStatus = function () {
        $state.go('OrderStatus');
    }
    $scope.myorder = function () {
        $state.go('MyOrder');
    }
    $scope.logout = function () {
        HeaderService.logout($rootScope.userID).then(function (result) {
            console.log(result);
            if (result.Status == true ) {
                localStorage.removeItem('userData');
                $state.go('Login');
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: '<b> Error </b>',
                    template: result.Message
                });
            }
        });
    }


    //header


    $("#fromdateMechProfile").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        var maxDate = new Date();
        console.log(maxDate);
        if (e.date != undefined) {
            var minDate = new Date(e.date.valueOf());
            $('#todateMechProfile').datepicker('setStartDate', minDate);
        } else {
           $scope.data.fromdateMechProfile = "";
            $('#todateMechProfile').datepicker('setStartDate', "00-00-0000");
        }




    });

    $("#todateMechProfile").datepicker({

        todayHighlight: false,
        format: "dd-mm-yyyy",
        endDate: "0",
        //startDate: '0',
        disableTouchKeyboard: true,
        clearBtn: true,
        autoclose: true

    }).on('changeDate', function (e) {

        e.stopPropagation();
        if (e.date != undefined) {
            var maxDate = new Date(e.date.valueOf());
            $('#fromdateMechProfile').datepicker('setEndDate', maxDate);
        } else {
            $scope.data.todateMechProfile = "";
            var maxDate = new Date();
            $('#fromdateMechProfile').datepicker('setEndDate', maxDate);
        }

        /* var maxDate = new Date();
         $('#dtFromDate').datepicker('setEndDate', maxDate);*/

    });


    console.log('mechanicTransactionReportCtrl');
    // $scope.profileName = $rootScope.profileName;
    // $scope.profileMobile = $rootScope.profileMobile;
    // //newly code start
    // $scope.enrolmentDate =$rootScope.enrolmentDate;
    // $scope.pointsBalance =$rootScope.pointsBalance;
    // //newly code end
    // $scope.profileCode = $rootScope.profileCode;
    // $scope.mechProfileImage = $rootScope.mechanicProfileImgForReport;
    //var mechanicUserID = localStorage.getItem("mechanicUserID");
    console.log($stateParams.mechid);
    var mechanicUserID =ConverBase64.convertBase64($stateParams.mechid);
        if ($stateParams.mechid != null && $stateParams.mechid != undefined) {
        LoaderService.showLoading();
        LoginService.myProfileData(ConverBase64.convertBase64($stateParams.mechid)).then(function (result) {
            LoaderService.hideLoading();
            console.log(result);
            if (result != "") {

                if (result.Status == true) {
                    // localStorage.removeItem("mechanicUserID");
                    var userProfile = result;
                    $scope.profileCode = result.Data[0].usd_code
                   $scope.profileName= result.Data[0].usd_firstname;
                    //newly added code start
                     $scope.enrolmentDate  =result.Data[0].enrolledOn;
                    $scope.pointsBalance =result.Data[0].pointBalance;
                    //newly added code end
                   $scope.profileMobile = result.Data[0].usd_mobile;
                    $scope.usd_dob = result.Data[0].usd_dob;
                    $scope.data.address1 = result.Data[0].usd_address1;
                    $scope.data.address2 = result.Data[0].usd_address2;
                    $scope.data.address3 = result.Data[0].usd_address3;
                    $scope.data.pincode = parseInt(result.Data[0].usd_pincode);
                    $scope.state = result.Data[0].state_name;
                    $scope.city = result.Data[0].city_name;
                    $scope.mechProfileImage = AppService.url + result.Data[0].filePath + result.Data[0].usd_profile_pic;
                    $scope.mechProfileImage  = $scope.mechProfileImage;
                    $scope.pointsEarned1 = result.Data[0].uad_totalpoints_earned;
                    $scope.pointsRedeemed1 = result.Data[0].uad_totalpoints_redeemed;
                    $scope.pointBalance1  = result.Data[0].pointBalance;
      
                    LoaderService.showLoading();
                    AddMechanicService.getArea($scope.state, $scope.city, $scope.data.pincode).then(function (result1) {
                        console.log(result1);
                        LoaderService.hideLoading();
                        $scope.AvailabelArea = result1.Data;
                        console.log($scope.AvailabelArea.length);
                        $scope.data.selectedArea = result.Data[0].area_name;
                    });
                    // $scope.data.selectedArea = result.Data[0].area_name;
                    $scope.data.selectedLanguage = result.Data[0].lang_name;

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
   
    $scope.getMechProfile = function(){
        console.log($scope.data.fromdateMechProfile);
       console.log($scope.data.todateMechProfile);  
       
       var token= $rootScope.token;
       $('#mechTransactionList').DataTable({
                "processing": true,
                "destroy": true,
                "searching": false,
                "bLengthChange": false,
                "serverSide": false,
                "pageLength": 10,
                "paging": false,
                "ordering": false,
                "info": false,
                "language": {
                    "emptyTable": "No results found"
                },
                "ajax": {
                    url: AppService.url + "api_r3/public/detailedTransactionReport?mechUserId=" + mechanicUserID + "&soUserId=" + $rootScope.userID + "&fromDate=" + $scope.data.fromdateMechProfile + "&toDate=" + $scope.data.todateMechProfile+"&token="+token,
                    "type": "GET",
                    dataType: "json",
                    contentType: "application/json",
                    error: function (jqXHR, textStatus, errorThrown) {
                        var alertPopup = $ionicPopup.alert({
                            template: $scope.data.localAppLanguage.server_not_responding_please_try_after_sometime
                        });
                    }

                },
                "columns": [
                   /*{
                        "data": "productSegment"
                    },*/
                    {
                        "data": "pdct_desc"
                    },
                    {
                        "data": "noOfCodesCheckedIn"
                    },
                    {
                        "data": "ucr_amount"
                    }

        ]

            });

    }
    $scope.getMechProfile();

    $scope.profile = function () {
        $state.go('EditMechanicProfile');
        //window.href="#/mechProfilebyList/"+mechanicUserID;
    }
    $scope.goBack = function () {
        $state.go('UpdateMechanicProfile');
    }

    try{
        if(AppService.enableTracking){
            _paq.push(['setDocumentTitle', "Mechanic Performance Page"]);
            _paq.push(['trackPageView']);
        }
      }catch(err){
        console.log(err);
      }
});