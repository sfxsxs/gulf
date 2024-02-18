gulf.controller('ChatBootPreLoginCtrl', function ($scope, $state, $http, ChatBootPreLoginService, $compile, $rootScope, LoaderService, LoginService, AppService, $ionicPopup, $location, $anchorScroll, $cordovaInAppBrowser, TransactionService) {
    $scope.pointBalance = "";
    $scope.pointRedeemEarned = "";
    $scope.scanCodeView = false;
    $scope.redeemView = false;
    $scope.transactionView = false;
    $scope.ReferAfriendView = false;
    $scope.MyCustomerView = false;
    $scope.contactDetailView = false;
    $scope.showHowToLoginView = false;
    var userData = JSON.parse(localStorage.getItem("userData"));
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if ($rootScope.userData != null) {
        var role = $rootScope.userData.role_fk_id;
    }


    if ($rootScope.userID != null) {
        LoginService.myProfileData($rootScope.userID).then(function (result) {
            console.log(result);
            if (result != "") {
                if (result.Status == true) {
                    ;
                    $scope.mechProfileImage = AppService.url + result.Data[0].filePath + result.Data[0].usd_profile_pic;

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

    $scope.segmentblock = true;
    $scope.globalSagment;
    // $scope.colorblock=true
    $('body').removeClass('home-bg');

    $('body').addClass('body-bg-1');
    $(document).on("pagebeforeshow", "body", function () {
        $('body').removeClass('home-bg');

        $('body').addClass('body-bg-1');
    });
    var userData = localStorage.getItem("userData");
    if (userData != null) {
        $scope.userName = $rootScope.userData.usd_firstname;

    }

    var myDate = new Date();
    var hrs = myDate.getHours();


    var greet;

    if (hrs < 12)
        greet = 'Good Morning';
    else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
    else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';

    $scope.greeting = greet;

    TransactionService.pointSummeryGulf($rootScope.userID).then(function (result) {
        console.log("summery");
        console.log(result.Status);
        if (result.Status) {
            console.log(result.data[0]);
            $scope.pointBalance = result.data[0].pointBalance;
            $scope.pointRedeemEarned = result.data[0].pointsEarned;
        } else { }


    });

    $scope.preLoginNotAloowed = function () {
        //
        alert("Please do login first");
    }
    $scope.howToLogin = function () {
        /*$state.go("ChatBootLogin");*/
        $scope.showHowToLoginView = true;
    }

    $scope.goToLogin = function () {
        $state.go("Login");
    }

    $scope.gotoCodeCheckIn = function () {
        //alert("kk");
        $state.go("CodeCheckIn");
    }

    $scope.goToForgotPassword = function () {
        $state.go("ForgetPassword");

    }

    $scope.scanCodePostLogin = function () {
        $rootScope.CodeCheckInId = $rootScope.userID
        // alert("Please Do Login First");
        $state.go('QrCode');
        /*var alertPopup = $ionicPopup.alert({
            title: '',
            template: "Coming soon. Code check-in facility will be launched on 1st October 2018."
        });*/

    }

    $scope.goToOilCanInfo = function () {
        $state.go("OilCanInfo");
    }

    $scope.goToCodeCheckInHelp = function () {
        $state.go("codeCheckInHelp");

    }

    $scope.goToRewardOptions = function () {

        $state.go("chatbootRewardOption");
    }

    $scope.goToWhatReward = function () {
        $state.go("chatbootWhatReward");
    }

    $scope.goToMechanicId = function () {
        $state.go("chatbootMechanicId");
    }

    $scope.getColor = function (segment) {
        //$scope.globalSagment = segment;
        $rootScope.globalSagment = segment;
        $state.go("chatbootColorSegment");

        /*  ChatBootPreLoginService.getMCOColor(segment).then(function(result){
              console.log('Inside chat ctrl');
              //console.log(result);
              $scope.segmentblock=false;
              $scope.colorblock=true;
              $scope.colorArray = result.Data;
              var lHtml ='';
              for(var i=0;i<result.Data.length;i++){
                  console.log(result.Data[i].pdct_pack_color);
                  var colorValue =result.Data[i].pdct_pack_color;
                  lHtml+='<div class="form-group"><div"  class=" form-control  gulf-btn signupbtn" data-ng-click="colorWithSagment('+colorValue+')"></div>'+colorValue+'</div>';
              }
             // $(".colorblock").html(lHtml);
             var temp= $compile(lHtml)($scope);
              angular.element(document.getElementById('colorblock')).append(temp);
              console.log($scope.colorArray);
          });*/

    }



    /* $scope.unableCodeCheckIn = function(){
        
     }*/

    $scope.colorWithSagment = function (colorWithSagment) {
        alert(colorWithSagment);

    }

    $scope.goToGulfCorner = function () {
        $state.go('ChatBootGulfCorner');

    }

    $scope.goToReferFriend = function () {
        $state.go('ChatBootReferFriend');
    }

    $scope.goToMyCustomer = function () {
        // $state.go('ChatBootMyCustomer');
        $scope.scanCodeView = false;
        $scope.redeemView = false;
        $scope.transactionView = false;
        $scope.ReferAfriendView = false;
        $scope.MyCustomerView = true;
        $scope.contactDetailView = false;
        $location.hash('MyCustomerView1');
        $anchorScroll();
    }

    $scope.goTOTxnSummery = function () {
        // $state.go('');
    }
    $scope.goToProgrmaDetails = function () {
        //$state.go('chatbootProdectEarning');

        var userData = localStorage.getItem("userData");
        if (userData != null) {
            $state.go('ProductEarning');
        } else {
            $state.go('ProductEarningChat');

        }


    }
    $scope.goToEarnPoints = function () {
        // $state.go('ChatBootEarnPoint');
        $scope.scanCodeView = true;
        $scope.redeemView = false;
        $scope.transactionView = false;
        $scope.ReferAfriendView = false;
        $scope.MyCustomerView = false;
        $scope.contactDetailView = false;

        $location.hash('scanCodeView1');
        $anchorScroll();
    }
    $scope.goTOredeemPoint = function () {
        //$state.go('chatbootReddemPoint');
        $scope.scanCodeView = false;
        $scope.redeemView = true;
        $scope.transactionView = false;
        $scope.ReferAfriendView = false;
        $scope.MyCustomerView = false;
        $scope.contactDetailView = false;

        $location.hash('redeemView1');
        $anchorScroll();
    }
    /* $scope.goTOredeemPoint = function () {
         $state.go('chatbootReddemPoint');
     }*/
    $scope.goToUpdateContactDetails = function () {
        //$state.go('ChatBootUpdateContact');
        $scope.scanCodeView = false;
        $scope.redeemView = false;
        $scope.transactionView = false;
        $scope.ReferAfriendView = false;
        $scope.MyCustomerView = false;
        $scope.contactDetailView = true;

        $location.hash('contactDetailView1');
        $anchorScroll();
    }
    $scope.RedemptionSummary = function () {
        $state.go('MyOrder');
    }
    $scope.goToTxn = function () {
        //$state.go('ChatBootTxn');
        $scope.scanCodeView = false;
        $scope.redeemView = false;
        $scope.transactionView = true;
        $scope.ReferAfriendView = false;
        $scope.MyCustomerView = false;
        $scope.contactDetailView = false

        $location.hash('transactionView1');
        $anchorScroll();
    }

    $scope.txnSummary = function () {
        $state.go('TransactionReport');

    }
    $scope.goToReferFriend = function () {
        // $state.go('ChatBootReferFriend');
        $scope.scanCodeView = false;
        $scope.redeemView = false;
        $scope.transactionView = false;
        $scope.ReferAfriendView = true;
        $scope.MyCustomerView = false;
        $scope.contactDetailView = false
        $location.hash('ReferAfriendView1');
        $anchorScroll();
    }

    $scope.referfriend = function () {
        $state.go('AddReferFriend');
    }
    $scope.editProfile = function () {
        $state.go('MyProfile');
    }
    $scope.goToBrochure = function () {
        $state.go('GulfCorner');

    }

    $scope.goToHome = function () {

        var userData = localStorage.getItem("userData");

        if (userData == null) {
            $state.go('Login');
        } else {
            $state.go('Home');
        }
    }

    $scope.gotoAddCustomer = function () {
        $state.go('AddPlaneer');
    }



    $scope.mechIDView = function () {
        $scope.mechanicIDView = true;

        $location.hash('mechanicIDView1');
        $anchorScroll();
    }

    $scope.redeemNow = function () {
        var userData = JSON.parse(localStorage.getItem("userData"));

        if (userData.user_category == "Loyalty User") {

            if ($scope.pointBalance > 500) {
                var encodedFHIdForWorlswipe = $rootScope.encodedFHId;
                //alert($rootScope.encodedFHId);
                console.log(encodedFHIdForWorlswipe);
                var url = AppService.placeOrderUrl + "login.php?uid=" + encodedFHIdForWorlswipe + "&pid=NTI1NA==&usid=" + $rootScope.userID;
                console.log(url);
                var options = {
                    location: 'yes'
                };

                document.addEventListener("deviceready", function () {

                    $cordovaInAppBrowser.open(url, '_blank', options)
                        .then(function (event) {
                            // success
                        })
                        .catch(function (event) {
                            // error
                        });
                }, false);
            } else {

                var alertPopup = $ionicPopup.alert({
                    title: '',
                    template: "Sorry, you need to earn atleast 500 points to be eligible for redemption. Visit app homepage and click on 'My Transactions' to know the number of points earned."
                });
                alertPopup.then(function (res) {
                    $state.go('MechanicHome');
                });
            }
        } else {
            $state.go('redeemMech');
        }
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Chat Boot Login Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})