// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var gulf = angular.module("gulfStarter", ["ionic", "ngCordova"]);
//,'ultimateDataTableServices' module for utimate table

gulf.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
            StatusBar.styleBlackOpaque();
            // fcm_notification()

        }
    });
});

gulf.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("Login", {
            cache: false,
            url: "/MLPLogin",
            templateUrl: "Login/login.html",
            controller: "LoginCtrl"
        })
        .state("NonMLPLogin", {
            cache: false,
            url: "/NonMLPLogin",
            templateUrl: "Login/NonMLPLogin.html",
            controller: "LoginCtrl"
        })
        .state("CPLoginPass", {
            cache: false,
            url: "/CPLoginPass",
            templateUrl: "Login/CPLoginPass.html",
            controller: "CPloginCtrl"
        })
        .state("SetPassword", {
            url: "/setPassword",
            templateUrl: "Login/setPassword.html",
            controller: "LoginCtrl"
        })
        .state("SetPasswordForForgotPasssword", {
            url: "/setPasswordForForgotPasssword",
            templateUrl: "Login/changePassword.html",
            controller: "LoginCtrl"
        })
        .state("ForgetPassword", {
            url: "/forgetPassword",
            templateUrl: "Login/forgotPassword.html",
            controller: "LoginCtrl"
        })
        .state("ForgetPasswordOTP", {
            url: "/forgetPasswordOtp",
            templateUrl: "Login/forgotPasswordOtp.html",
            controller: "LoginCtrl"
        })
        .state("QrCode", {
            cache: false,
            url: "/qrCode",
            templateUrl: "QrCode/gulfQR.html",
            controller: "GulfQrCtrl"
        })
        .state("AddDetails", {
            cache: false,
            url: "/addDetails",
            params: {
                obj: null
            },
            templateUrl: "AddDetails/addDetails.html",
            controller: "AddDetailsCtrl"
        })
        .state("AddValidateDetails", {
            cache: false,
            url: "/AddValidateDetails",
            params: {
                obj: null
            },
            templateUrl: "AddDetails/AddValidateDetails.html",
            controller: "AddValidateDetailsCtrl"
        })
        .state("AddRetailerDetails", {
            cache: false,
            url: "/AddRetailerDetails",
            params: {
                obj: null
            },
            templateUrl: "AddDetails/AddRetailerDetails.html",
            controller: "AddRetailerDetailsCtrl"
        })
        .state("ChangePassword", {
            cache: false,
            url: "/changePassword",
            templateUrl: "ChangePassword/changePassword.html",
            controller: "ChangePasswordCtrl"
        })
        .state("MyProfile", {
            cache: false,
            url: "/myProfile",
            templateUrl: "MyProfile/myProfile.html",
            controller: "MyProfileCtrl"
        })
        .state("AddMechanic", {
            cache: false,
            url: "/addMechanic",
            templateUrl: "AddMechanic/addMechanic.html",
            controller: "AddMechanicNavigationCtrl"
        })
        .state("addMechanicDirect", {
            cache: false,
            url: "/addMechanicDirect",
            templateUrl: "AddMechanic/addMechanicDirect.html",
            controller: "AddMechanicCtrl"
        })
        .state("AddMechanicReferral", {
            cache: false,
            url: "/addMechanicReferral",
            templateUrl: "AddMechanic/addMechanicReferal.html",
            controller: "AddMechanicCtrl"
        })
        .state("ReferrByRetailer", {
            cache: false,
            url: "/referrByRetailer",
            templateUrl: "AddMechanic/referrByRetailer.html",
            controller: "AddMechanicCtrl"
        })
        .state("ReferAmechanic", {
            cache: false,
            url: "/referAmechanic/:id",
            templateUrl: "AddMechanic/referAmechanic.html",
            controller: "AddMechanicCtrl"
        })
        .state("ReferralSuccessful", {
            cache: false,
            url: "/referralSuccessful",
            params: {
                obj: null
            },
            templateUrl: "AddMechanic/referralSuccessful.html",
            controller: "ReferralSuccessCtrl"
        })
        .state("UpdateMechanicProfile", {
            cache: false,
            url: "/updateMechanicProfile",
            templateUrl: "UpdateMechanicProfile/searchMechanic.html",
            controller: "UpdateMechanicProfileCtrl"
        })
        .state("mechProfilebyList", {
            cache: false,
            url: "/mechProfilebyList/:mechid",
            templateUrl: "UpdateMechanicProfile/editMechanicProfile.html",
            controller: "mechProfilebyListCtrl"
        })
        .state("MechanicTransactionReport", {
            cache: false,
            url: "/mechanicTransactionReport/:mechid",
            templateUrl: "TransactionReport/mechanicTransactionReport.html",
            controller: "MechanicTransactionReportCtrl"
        })
        .state("EditMechanicProfile", {
            cache: false,
            url: "/EditMechanicProfile",
            templateUrl: "UpdateMechanicProfile/editMechanicProfile.html",
            controller: "UpdateMechanicProfileCtrl"
        })
        .state("EditMobileNumber", {
            cache: false,
            url: "/editMobileNumber",
            templateUrl: "UpdateMechanicProfile/editMobileNumber.html",
            controller: "UpdateMechanicProfileCtrl"
        })
        .state("Dashboard", {
            cache: false,
            url: "/dashboard",
            templateUrl: "Dashboard/dashboard.html",
            controller: "DashboardCtrl"
        })
        .state("MechDashboard", {
            cache: false,
            url: "/mechDashboard",
            templateUrl: "Dashboard/mechDashBoard.html",
            controller: "MechDashboardCtrl"
        })
        .state("MechValidation", {
            cache: false,
            url: "/mechValidation/:id",
            templateUrl: "MechValidation/mechValidation.html",
            controller: "MechValidationCtrl"
        })
        .state("ValidateProfile", {
            cache: false,
            url: "/ValidateProfile/:id",
            templateUrl: "MechValidation/ValidateProfile.html",
            controller: "ValidateProfileCtrl"
        })
        .state("Rejection", {
            cache: false,
            url: "/Rejection",
            templateUrl: "MechValidation/Rejection.html",
            controller: "RejectionCtrl"
        })
        .state("MechProfileEarning", {
            cache: false,
            url: "/MechProfileEarning/:id",
            templateUrl: "MechValidation/MechProfileEarning.html",
            controller: "MechProfileEarningCtrl"
        })
        .state("MechProfileLink", {
            cache: false,
            url: "/MechProfileLink",
            templateUrl: "MechValidation/MechProfileLink.html",
            controller: "MechProfileLinkCtrl"
        })
        .state("ActiveMechnaicList", {
            cache: false,
            url: "/activeMechnaicList",
            templateUrl: "Dashboard/activeMechnaicList.html",
            controller: "ActiveMechaicCtrl"
        })
        .state("tierMechnicList", {
            cache: false,
            url: "/tierMechnicList",
            params: {
                tierName: null,
            },
            templateUrl: "Dashboard/tierMechnicList.html",
            controller: "tierMechnicListCtrl"
        })
        .state("InactiveMechnaicList", {
            cache: false,
            url: "/inactiveMechnaicList",
            templateUrl: "Dashboard/inactiveMechnicList.html",
            controller: "InactiveMechaicCtrl"
        })
        .state("ValidateMechnaicList", {
            cache: false,
            url: "/validateMechnaicList",
            templateUrl: "Dashboard/validatedMechnaicList.html",
            controller: "ValidateMechnaicListCtrl"
        })
        .state("VolumeAchived", {
            cache: false,
            url: "/volumeAchived",
            templateUrl: "Dashboard/volumeAchived.html",
            controller: "VolumeAchivedCtrl"
        })
        .state("ThingsToDo", {
            cache: false,
            url: "/thingsToDo",
            templateUrl: "BetaPlan/thingToDo.html",
            controller: "ThingsToDoCtrl"
        })
        .state("AddBeatPlan", {
            cache: false,
            url: "/addBeatPlan",
            templateUrl: "BetaPlan/addBeatPlan.html",
            controller: "AddBeatPlanCtrl"
        })

        .state("ThingsToDoBasedOnArea", {
            cache: false,
            url: "/ThingsToDoBasedOnArea",
            templateUrl: "BetaPlan/thingsBasedOnArea.html",
            controller: "ThingsBasesOnAreaCtrl"
        })
        .state("CodeCheckedInDashboard", {
            cache: false,
            url: "/codeCheckedInDashboard",
            templateUrl: "Dashboard/codeCheckedList.html",
            controller: "CodeCheckedInCtrl"
        })

        .state("MechValidationList", {
            cache: false,
            url: "/MechValidationList",
            templateUrl: "MechValidationList/mechValidationList.html",
            controller: "MechValidationListCtrl"
        })
        .state("PendingValidationList", {
            cache: false,
            url: "/PendingValidationList",
            templateUrl: "MechValidationList/pendingValidationList.html",
            controller: "PendingValidationListCtrl"
        })
        .state("MechEarning", {
            cache: false,
            url: "/MechEarning",
            templateUrl: "MechValidationList/mechEarning.html",
            controller: "MechEarningCtrl"
        })

        .state("CouponCode", {
            cache: false,
            url: "/couponCode",
            templateUrl: "CouponCode/couponCode.html",
            controller: "CouponCodeCtrl"
        })
        .state("CodeCheckIn", {
            cache: false,
            url: "/codeCheckIn",
            templateUrl: "CodeCheckIn/codeCheckIn.html",
            controller: "CodeCheckInCtrl"
        })
        .state("CodeCheckInOTP", {
            cache: false,
            url: "/codeCheckInOTP",
            templateUrl: "CodeCheckInOTP/codeCheckInOTP.html",
            controller: "CodeCheckInOTPCtrl"
        })
        .state("CodeCheckInCongratulations", {
            cache: false,
            url: "/codeCheckInCongratulations",
            templateUrl: "QrCode/codeCheckInCongratulations.html",
            controller: "CodeCheckinCongratulationCtrl"
        })
        .state("MutipleCodeCheckInCongratulations", {
            cache: false,
            url: "/multipleCodeCheckInCongratulations",
            templateUrl: "QrCode/multipleCodeChekinCongratulation.html",
            controller: "MultipleCodeCheckinCongratulationCtrl"
        })
        .state("CodeVerification", {
            cache: false,
            url: "/codeVerification",
            templateUrl: "CodeVerification/codeVerification.html",
            controller: "CodeVerificationCtrl"
        })
        .state("CodeDetails", {
            cache: false,
            url: "/codeDetails",
            templateUrl: "CodeVerification/codeDetails.html",
            controller: "CodeDetailsCtrl"
        })
        .state("TransactionReport", {
            cache: false,
            url: "/TransactionReport",
            templateUrl: "TransactionReport/transactionReport.html",
            controller: "TransactionReportCtrl"
        })

        .state("ChatBootPreLogin", {
            cache: false,
            url: "/ChatBootPreLogin",
            templateUrl: "ChatBootPreLogin/chatbootHome.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("ChatBootLogin", {
            cache: false,
            url: "/ChatBootLogin",
            templateUrl: "ChatBootPreLogin/chatbootLogin.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("ChatBootEarnPoint", {
            cache: false,
            url: "/ChatBootEarnPoint",
            templateUrl: "ChatBootPreLogin/earnPoint.html",
            controller: "ChatBootPreLoginCtrl"
        })
        .state("ChatBootReferFriend", {
            cache: false,
            url: "/ChatBootReferFriend",
            templateUrl: "ChatBootPreLogin/referFriend.html",
            controller: "ChatBootPreLoginCtrl"
        })
        .state("ChatBootUpdateContact", {
            cache: false,
            url: "/ChatBootUpdateContact",
            templateUrl: "ChatBootPreLogin/updateContactDetails.html",
            controller: "ChatBootPreLoginCtrl"
        })
        .state("ChatBootMyCustomer", {
            cache: false,
            url: "/ChatBootMyCustomer",
            templateUrl: "ChatBootPreLogin/myCustomer.html",
            controller: "ChatBootPreLoginCtrl"
        })
        .state("ChatBootGulfCorner", {
            cache: false,
            url: "/ChatBootGulfCorner",
            templateUrl: "ChatBootPreLogin/gulfcorner.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("ChatBootTxn", {
            cache: false,
            url: "/ChatBootTxn",
            templateUrl: "ChatBootPreLogin/TxnChatbot.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("OilCanInfo", {
            cache: false,
            url: "/OilCanInfo",
            templateUrl: "ChatBootPreLogin/oilCanTrace.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("codeCheckInHelp", {
            cache: false,
            url: "/codeCheckInHelp",
            templateUrl: "ChatBootPreLogin/codeCheckInHelp.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootReddemPoint", {
            cache: false,
            url: "/chatbootReddemPoint",
            templateUrl: "ChatBootPreLogin/reedeemPoint.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootRewardOption", {
            cache: false,
            url: "/chatbootRewardOption",
            templateUrl: "ChatBootPreLogin/rewardOptions.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootWhatReward", {
            cache: false,
            url: "/chatbootWhatReward",
            templateUrl: "ChatBootPreLogin/whatReward.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootMechanicId", {
            cache: false,
            url: "/chatbootMechanicId",
            templateUrl: "ChatBootPreLogin/machanicId.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootProdectEarning", {
            cache: false,
            url: "/chatbootProdectEarning",
            templateUrl: "ChatBootPreLogin/productEarning.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("chatbootColorSegment", {
            cache: false,
            url: "/chatbootColorSegment",
            templateUrl: "ChatBootPreLogin/chat-bot-colors.html",
            controller: "ChatBootColorCtrl"
        })

        .state("ProductEarningChat", {
            cache: false,
            url: "/productEarningChat",
            templateUrl: "ChatBootPreLogin/productEarningChat.html",
            controller: "ProductEarningChatCtrl"
        })
        .state("ProductEarningDetailChat", {
            cache: false,
            url: "/productEarningDetailChat",
            templateUrl: "ChatBootPreLogin/productEarningDetailChat.html",
            controller: "ProductEarningDetailChatCtrl"
        })
        .state("RecomendationDetail", {
            cache: false,
            url: "/recomendationDetail",
            templateUrl: "GulfCorner/recomendationDetail.html",
            controller: "RecomendationDeatilCtl"
        })
        .state("CPRecomendationDetail", {
            cache: false,
            url: "/CPrecomendationDetail",
            templateUrl: "GulfCorner/CPrecomendationDetail.html",
            controller: "CPRecomendationDeatilCtl"
        })
        .state("NonMlpRecomendationDetail", {
            cache: false,
            url: "/nonMlpRecomendationDetail",
            templateUrl: "GulfCorner/NonMlpRecomendationDetail.html",
            controller: "NonMlpRecomendationDeatilCtl"
        })
        .state("ChatBootPostLogin", {
            cache: false,
            url: "/ChatBootPostLogin",
            templateUrl: "ChatBootPreLogin/chatbootHomeAfterLogin.html",
            controller: "ChatBootPreLoginCtrl"
        })

        .state("UpdateMechanicProfileMenu", {
            cache: false,
            url: "/updateMechanicProfileMenu",
            templateUrl: "UpdateMechanicProfile/updateProfileMenu.html",
            controller: "UpdateMechanicProfileCtrl"
        })

        .state("AddReferFriend", {
            cache: false,
            url: "/AddReferFriend",
            templateUrl: "ReferFriend/referFriend.html",
            controller: "referFriendCtrl"
        })
        .state("AddReferFriendNonMLP", {
            cache: false,
            url: "/AddReferFriendNonMLP",
            templateUrl: "ReferFriend/referFriendNonMLP.html",
            controller: "referFriendNonMLPCtrl"
        })

        .state("CheckReferralStatus", {
            cache: false,
            url: "/CheckReferralStatus",
            templateUrl: "ReferFriend/checkRefferalStatus.html",
            controller: "referFriendCtrl"
        })

        .state("AddPlaneer", {
            cache: false,
            url: "/AddPlaneer",
            templateUrl: "Planner/addPlanner.html",
            controller: "plannerCtrl"
        })
        .state("AddPlannerSucess", {
            cache: false,
            url: "/AddPlannerSucess",
            templateUrl: "Planner/addPlannerSucess.html",
            controller: "plannerCtrl"
        })

        .state("SoAddPlanner", {
            cache: false,
            url: "/soAddPlanner",
            templateUrl: "Planner/soAddPlanner.html",
            controller: "SoAddPlannerCtrl"
        })

        .state("PlaneerReport", {
            cache: false,
            url: "/PlaneerReport",
            templateUrl: "Planner/plannerReport.html",
            controller: "plannerCtrl"
        })

        .state("EditPlanner", {
            cache: false,
            url: "/EditPlanner/:id/:servicedate",
            templateUrl: "Planner/editPlaneer.html",
            controller: "editPlannerCtrl"
        })
        .state("GulfCorner", {
            cache: false,
            url: "/gulfCorner",
            templateUrl: "GulfCorner/gulfCorner.html",
            controller: "GulfCornerCtrl"
        })
        .state("CPGulfCorner", {
            cache: false,
            url: "/cpgulfCorner",
            templateUrl: "GulfCorner/CPgulfCorner.html",
            controller: "CPGulfCornerCtrl"
        })
        .state("NonMlpGulfCorner", {
            cache: false,
            url: "/nonMlpGulfCorner",
            templateUrl: "GulfCorner/NonMlpGulfCorner.html",
            controller: "NonMlpGulfCornerCtrl"
        })
        .state("RecommendationChart", {
            cache: false,
            url: "/recommendationChartCtrl",
            templateUrl: "GulfCorner/RecommendationChart.html",
            controller: "RecommendationChartCtrl"
        })
        .state("CPRecommendationChart", {
            cache: false,
            url: "/cprecommendationChartCtrl",
            templateUrl: "GulfCorner/CPRecommendationChart.html",
            controller: "CPRecommendationChartCtrl"
        })
        .state("NonMlpRecommendationChart", {
            cache: false,
            url: "/nonMlpRecommendationChartCtrl",
            templateUrl: "GulfCorner/NonMlpRecommendationChart.html",
            controller: "NonMlpRecommendationChartCtrl"
        })
        .state("ProductEarning", {
            cache: false,
            url: "/productEarning",
            templateUrl: "GulfCorner/productEarning.html",
            controller: "ProductEarningCtrl"
        })
        .state("ProductEarningDetail", {
            cache: false,
            url: "/productEarningDetail",
            params: {
                obj: null
            },
            templateUrl: "GulfCorner/productEarningDetail.html",
            controller: "ProductEarningDetailCtrl"
        })
        .state("TradeScheme", {
            cache: false,
            url: "/tradeScheme",
            templateUrl: "GulfCorner/tradeScheme.html",
            controller: "TradeSchemeCtrl"
        })
        .state("CPTradeScheme", {
            cache: false,
            url: "/cptradeScheme",
            templateUrl: "GulfCorner/CPtradeScheme.html",
            controller: "CPTradeSchemeCtrl"
        })
        .state("NonMlpTradeScheme", {
            cache: false,
            url: "/nonMlpTradeScheme",
            templateUrl: "GulfCorner/NonMlpTradeScheme.html",
            controller: "NonMlpTradeSchemeCtrl"
        })
        .state("OrderStatus", {
            cache: false,
            url: "/orderStatus",
            templateUrl: "orderStatus/orderStatus.html",
            controller: "OrderStatusCtrl"
        })
        .state("MyOrder", {
            cache: false,
            url: "/myOrder",
            templateUrl: "orderStatus/myOrder.html",
            controller: "MyOrderCtrl"
        })
        .state("OrderHistory", {
            cache: false,
            url: "/orderHistory",
            templateUrl: "orderStatus/orderHistory.html",
            controller: "OrderHistoryCtrl"
        })

        .state("ValidateOTPTochangeMobileNumber", {
            cache: false,
            url: "/ValidateOTPTochangeMobileNumber",
            templateUrl: "UpdateMechanicProfile/otpToValidateMobile.html",
            controller: "ValidateMobileInOTPCtrl"
        })
        .state("redeemMech", {
            cache: false,
            url: "/redeemMech",
            templateUrl: "redeem/redeemMech.html",
            controller: "redeemCtrl"
        })
        .state("redeemMechOTP", {
            cache: false,
            url: "/redeemMechOTP",
            templateUrl: "redeem/redeemOTP.html",
            controller: "redeemOtpCtrl"
        })
        .state("redeemRegularOTP", {
            cache: false,
            url: "/redeemRegularOTP",
            templateUrl: "redeem/redeemRegularOTP.html",
            controller: "redeemOtpCtrl"
        })
        .state("MechanicHome", {
            cache: false,
            url: "/mechanicHome",
            templateUrl: "Home/mechanicHome.html",
            controller: "MechHomePageCtrl"
        })
        .state("RH_AH_TH_home", {
            cache: false,
            url: "/RH_AH_TH_home",
            templateUrl: "Home/RH_AH_TH_home.html",
            controller: "MechHomePageCtrl"
        })
        .state("Notification", {
            cache: false,
            url: "/Notification",
            templateUrl: "Notification/notification.html",
            controller: "NotificationCtrl"
        })
        .state("CPNotification", {
            cache: false,
            url: "/CPNotification",
            templateUrl: "Notification/CPnotification.html",
            controller: "CPNotificationCtrl"
        })
        .state("NonMlpNotification", {
            cache: false,
            url: "/NonMlpNotification",
            templateUrl: "Notification/NonMlpNotification.html",
            controller: "NonMlpNotificationCtrl"
        })
        .state("NewLoginForMLPAndNonMLP", {
            cache: false,
            url: "/",
            templateUrl: "Login/NewLoginForMLPAndNonMLP.html",
            controller: "NewLoginForMLPAndNonMLPCtrl"
        })
        .state("NonMlpOtpValidation", {
            cache: false,
            url: "/NonMlpOtpValidation",
            templateUrl: "NonMLPLoginValidation/NonMlpOtpValidation.html",
            controller: "NonMlpOtpValidationCtrl"
        })
        .state("NonMlpRegistration", {
            cache: false,
            url: "/NonMlpRegistration",
            templateUrl: "NonMLPLoginValidation/NonMlpRegistration.html",
            controller: "NonMlpRegistrationCtrl"
        })
        .state("MlpRegistration", {
            cache: false,
            url: "/MlpRegistration",
            templateUrl: "NonMLPLoginValidation/MlpRegistration.html",
            controller: "NonMlpRegistrationCtrl"
        })
        .state("BankaccountDetails", {
            cache: false,
            url: "/BankaccountDetails",
            templateUrl: "NonMLPLoginValidation/BankaccountDetails.html",
            controller: "BankaccountDetailsCtrl"
        })
        .state("NonMlpHome", {
            cache: false,
            url: "/NonMlpHome",
            templateUrl: "NonMlp/NonMlpHome.html",
            controller: "NonMlpHomeCtrl"
        })
        .state("NonMlpSetPassword", {
            cache: false,
            url: "/NonMlpSetPassword",
            templateUrl: "NonMLPLoginValidation/NonMlpSetPassword.html",
            controller: "NonMlpSetPasswordCtrl"
        })
        .state("LoyalitySetPassword", {
            cache: false,
            url: "/LoyalitySetPassword",
            templateUrl: "NonMLPLoginValidation/LoyalitySetPassword.html",
            controller: "NonMlpSetPasswordCtrl"
        })

        .state("SelectLanguage", {
            cache: false,
            url: "/SelectLanguage",
            templateUrl: "NonMLPLoginValidation/SelectLanguage.html",
            controller: "SelectLanguageCtrl"
        })

        .state("scanQrCodeNonMlp", {
            cache: false,
            url: "/scanQrCodeNonMlp",
            templateUrl: "NonMlp/scanQrCodeNonMlp.html",
            controller: "scanQrCodeNonMlpCtrl"
        })

        .state("singelCodeCheckIn", {
            cache: false,
            url: "/singelCodeCheckIn",
            templateUrl: "NonMlp/singelCodeCheckIn.html",
            controller: "singelCodeCheckInCtrl"
        })
        .state("CPsingelCodeCheckIn", {
            cache: false,
            url: "/CPsingelCodeCheckIn",
            templateUrl: "ChannelPartners/CPsingelCodeCheckIn.html",
            controller: "CPsingelCodeCheckInCtrl"
        })
        .state("CPScanCodeCheckInResult", {
            cache: false,
            url: "/CPScanCodeCheckInResult",
            templateUrl: "ChannelPartners/CPScanCodeCheckInResult.html",
            controller: "CPScanCodeCheckInResultCtrl"
        })
        .state("MultipleCodeChekdin", {
            cache: false,
            url: "/MultipleCodeChekdin",
            templateUrl: "NonMlp/MultipleCodeChekdin.html",
            controller: "MultipleCodeChekdinCtrl"
        })

        .state("Home", {
            cache: false,
            url: "/home",
            templateUrl: "Home/homePage.html",
            controller: "HomePageCtrl"
        })
        .state("NonMyProfile", {
            cache: false,
            url: "/NonMyProfile",
            templateUrl: "NonMlp/MyProfile-NonMLP.html",
            controller: "MyProfileNonMLPCtrl"
        })
        .state("TransferOne", {
            cache: false,
            url: "/TransferOne",
            templateUrl: "NonMLPLoginValidation/TransferOne.html",
            controller: "TransferOneCtrl"
        })
        .state("TransactionReportNonMlp", {
            cache: false,
            url: "/TransactionReportNonMlp",
            templateUrl: "NonMlp/TransactionReportNonMlp.html",
            controller: "TransactionReportNonMlpCtrl"
        })

        .state("OrderReportCtrlNonMLp", {
            cache: false,
            url: "/OrderReportCtrlNonMLp",
            templateUrl: "NonMlp/OrderReportCtrlNonMLp.html",
            controller: "OrderReportCtrlNonMLpCtrl"
        })
        .state("NonMlpUserType", {
            cache: false,
            url: "/NonMlpUserType",
            templateUrl: "NonMLPLoginValidation/NonMlpUserType.html",
            controller: "NonMlpUserTypeCtrl"
        })
        .state("UpdateUserType", {
            cache: false,
            url: "/UpdateUserType",
            templateUrl: "NonMlp/UpdateUserType.html",
            controller: "UpdateUserTypeCtrl"
        })

        .state("EditBankDetails", {
            cache: false,
            url: "/EditBankDetails",
            templateUrl: "NonMlp/EditBankDetails.html",
            controller: "EditBankDetailsCtrl"
        })
        .state("Contest", {
            cache: false,
            url: "/Contest",
            templateUrl: "NonMlp/Contest.html",
            controller: "Contestctrl"
        })
        .state("LoyalityContest", {
            cache: false,
            url: "/LoyalityContest",
            templateUrl: "NonMlp/LoyalityContest.html",
            controller: "Contestctrl"
        })
        .state("loyalityTermcondtion", {
            cache: false,
            url: "/loyalityTermcondtion",
            templateUrl: "TermCondtion/loyalityT&C.html",
            controller: "TermandConditionCtrl"
        })
        .state("othersTermcondtion", {
            cache: false,
            url: "/othersTermcondtion",
            templateUrl: "TermCondtion/othersT&C.html",
            controller: "TermandConditionCtrl"
        })
        .state("NonMlpMechanic", {
            cache: false,
            url: "/NonMlpMechanic",
            templateUrl: "NonMlp/NonMlpMechanic.html",
            controller: "NonMlpMechanicCtrl"
        })
        .state("DreamIncome", {
            cache: false,
            url: "/DreamIncome",
            templateUrl: "DreamIncome/DreamIncome.html",
            controller: "DreamIncomeCtrl"
        })
        .state("purchaseRecommendation", {
            cache: false,
            url: "/purchaseRecommendation",
            templateUrl: "DreamIncome/purchaseRecommendation.html",
            controller: "purchaseRecommendationCtl"
        })
        .state("SetAndEditDreamIncome", {
            cache: false,
            url: "/SetAndEditDreamIncome",
            templateUrl: "DreamIncome/SetAndEditDreamIncome.html",
            controller: "SetAndEditDreamIncomeCtrl"
        })
        .state("EditDreamIncome", {
            cache: false,
            url: "/EditDreamIncome",
            templateUrl: "DreamIncome/EditDreamIncome.html",
            controller: "EditDreamIncomeCtrl"
        })
        .state("DreamIncomeMain", {
            cache: false,
            url: "/DreamIncomeMain",
            templateUrl: "DreamIncome/DreamIncomeMain.html",
            controller: "DreamIncomeMainCtrl"
        })
        .state("MechanicValidetaDreamIncome", {
            cache: false,
            url: "/DreamIncomeMain",
            templateUrl: "DreamIncome/MechanicValidetaDreamIncomel.html",
            controller: "MechanicValidetaDreamIncomeCtrl"
        })

        .state("AmazonPromoCode", {
            cache: false,
            url: "/AmazonPromoCode",
            templateUrl: "Amazon/AmazonPromoCode.html",
            controller: "AmazonPromoCodeCtrl"
        })
        .state("NonMlpAmazonPromoCode", {
            cache: false,
            url: "/NonMlpAmazonPromoCode",
            templateUrl: "Amazon/NonMlpAmazonPromoCode.html",
            controller: "NonMlpAmazonPromoCodeCtrl"
        })
        .state("GkOtp", {
            cache: false,
            url: "/GkOtp",
            templateUrl: "Gk/GkOtp.html",
            controller: "GkOtpCtrl"
        })
        .state("GkLoyalityOtp", {
            cache: false,
            url: "/GkLoyalityOtp",
            templateUrl: "Gk/GkLoyalityOtp.html",
            controller: "GkLoyalityOtpCtrl"
        })
        .state("GkLanguage", {
            cache: false,
            url: "/GkLanguage",
            templateUrl: "Gk/GkLanguage.html",
            controller: "GkLanguageCtrl"
        })
        .state("GkSetPassword", {
            cache: false,
            url: "/GkSetPassword",
            templateUrl: "Gk/GkSetPassword.html",
            controller: "GkSetPasswordCtrl"
        })
        .state("GkRegistration", {
            cache: false,
            url: "/GkRegistration",
            templateUrl: "Gk/GkRegistration.html",
            controller: "GkRegistrationCtrl"
        })
        .state("GkBankDetail", {
            cache: false,
            url: "/GkBankDetail",
            templateUrl: "Gk/GkBankDetail.html",
            controller: "GkBankDetailCtrl"
        })
        .state("GkTransferOne", {
            cache: false,
            url: "/GkBanGkTransferOnekDetail",
            templateUrl: "Gk/GkTransferOne.html",
            controller: "GkTransferOneCtrl"
        })
        .state("RetailCodeInNonMlp", {
            cache: false,
            url: "/RetailCodeInNonMlp",
            templateUrl: "NonMLPLoginValidation/RetailCodeInNonMlp.html",
            controller: "RetailCodeInNonMlpCtrl"
        })
        .state("DreamIncomePerformance", {
            cache: false,
            url: "/DreamIncomePerformance",
            templateUrl: "DreamIncome/DreamIncomePerformance.html",
            controller: "DreamIncomePerformanceCtrl"
        })
        .state("TypeSelcetion", {
            cache: false,
            url: "/TypeSelcetion",
            templateUrl: "DreamIncome/TypeSelcetion.html",
            controller: "TypeSelcetionCtrl"
        })
        .state("BankDetailList", {
            cache: false,
            url: "/BankDetailList",
            templateUrl: "NonMlp/BankDetailList.html",
            controller: "BankDetailListCtrl"
        })
        .state("VerifyCode", {
            cache: false,
            url: "/VerifyCode",
            templateUrl: "VerifyCode/verifycode.html",
            controller: "verifyCodeCtrl"
        })
        .state("NonMlpVerifyCode", {
            cache: false,
            url: "/NonMlpVerifyCode",
            templateUrl: "VerifyCode/NonMlpVerifycode.html",
            controller: "NonMlpVerifyCodeCtrl"
        })
        .state("verifyCodeResult", {
            cache: false,
            url: "/verifyCodeResult",
            templateUrl: "VerifyCode/verifyCodeResult.html",
            controller: "verifyCodeResultCtrl"
        })
        .state("NonMlpVerifyCodeResult", {
            cache: false,
            url: "/NonMlpVerifyCodeResult",
            templateUrl: "VerifyCode/NonMlpVerifyCodeResult.html",
            controller: "NonMlpVerifyCodeResultCtrl"
        })
        .state("CPOTPValidation", {
            cache: false,
            url: "/CPOTPValidation",
            templateUrl: "ChannelPartners/CPOTPValidation.html",
            controller: "CPOTPValidationCtrl"
        })
        .state("CPSetPassword", {
            cache: false,
            url: "/CPSetPassword",
            templateUrl: "ChannelPartners/CPSetPassword.html",
            controller: "CPSetPasswordCtrl"
        })
        .state("CPRegistration", {
            cache: false,
            url: "/CPRegistration",
            templateUrl: "ChannelPartners/CPRegistration.html",
            controller: "CPRegistrationCtrl"
        })
        .state("CPHome", {
            cache: false,
            url: "/CPHome",
            templateUrl: "ChannelPartners/CPHome.html",
            controller: "CPHomeCtrl"
        })
        .state("CPTransactionReport", {
            cache: false,
            url: "/CPTransactionReport",
            templateUrl: "ChannelPartners/CPTransactionReport.html",
            controller: "CPTransactionReportCtrl"
        })
        .state("CPMyRewards", {
            cache: false,
            url: "/CPMyRewards",
            templateUrl: "ChannelPartners/CPMyRewards.html",
            controller: "CPMyRewardsCtrl"
        })
        .state("CPPromoCode", {
            cache: false,
            url: "/CPPromoCode",
            templateUrl: "ChannelPartners/CPPromoCode.html",
            controller: "CPPromoCodeCtrl"
        })
        .state("CPScanQrCode", {
            cache: false,
            url: "/CPScanQrCode",
            templateUrl: "ChannelPartners/CPScanQrCode.html",
            controller: "CPScanQrCodeCtrl"
        })
        .state("CPBankDetailList", {
            cache: false,
            url: "/CPBankDetailList",
            templateUrl: "ChannelPartners/CPBankDetailList.html",
            controller: "CPBankAccountDetailsCtrl"
        })
        .state("CPBankAccountDetails", {
            cache: false,
            url: "/CPBankAccountDetails",
            templateUrl: "ChannelPartners/CPBankAccountDetails.html",
            controller: "CPBankAccountDetailsCtrl"
        })
        .state("CPNearByMechanic", {
            cache: false,
            url: "/CPNearByMechanic",
            templateUrl: "ChannelPartners/CPNearByMechanic.html",
            controller: "CPNearByMechanicCtrl"
        })
        .state("LoginPromoCP", {
            cache: false,
            url: "/LoginPromoCP",
            templateUrl: "ChannelPartners/LoginPromo.html",
            controller: "LoginPromoCPCtrl"
        })
        .state("CPScanCongrats", {
            cache: false,
            url: "/CPScanCongrats",
            templateUrl: "ChannelPartners/CPScanCongrats.html",
            controller: "CPScanCongratsCtrl"
        })
        .state("LogicReport", {
            cache: false,
            url: "/LogicReport",
            templateUrl: "ReferFriend/logicReport.html",
            controller: "referFriendCtrl"
        })
        .state("ReferalReport", {
            cache: false,
            url: "/ReferalReport",
            templateUrl: "ReferFriend/referalReport.html",
            controller: "referralReportCtrl"
        })
        .state("LogicReportNonMLP", {
            cache: false,
            url: "/LogicReportNonMLP",
            templateUrl: "ReferFriend/logicReportNonMLP.html",
            controller: "referFriendNonMLPCtrl"
        })
        .state("ReferalReportNonMLP", {
            cache: false,
            url: "/ReferalReportNonMLP",
            templateUrl: "ReferFriend/referalReportNonMLP.html",
            controller: "referralReportNonMLPCtrl"
        })
        .state("EffortApp", {
            cache: false,
            url: "/EffortApp",
            templateUrl: "EffortApp/effortApp.html",
            controller: "effortAppCtrl"
        })
        .state("PanUpdatePopup", {
            cache: false,
            url: "/PanUpdatePopup",
            templateUrl: "PanUpdate/PanUpdatePopup.html",
            controller: "PanUpdatePopupCtrl"
        })
        .state("PanImageUpload", {
            cache: false,
            url: "/PanImageUpload",
            templateUrl: "PanUpdate/PanImageUpload.html",
            controller: "PanImageUploadCtrl"
        })
        .state("SelfieForPan", {
            cache: false,
            url: "/SelfieForPan",
            templateUrl: "PanUpdate/SelfieForPan.html",
            controller: "SelfieForPanCtrl"
        })
        .state("PanDetailSubmit", {
            cache: false,
            url: "/PanDetailSubmit",
            templateUrl: "PanUpdate/PanDetailSubmit.html",
            controller: "PanDetailSubmitCtrl"
        })
        .state("PanSubmittedMsg", {
            cache: false,
            url: "/PanSubmittedMsg/:status",
            param:['status'],
            templateUrl: "PanUpdate/PanSubmittedMsg.html",
            controller: "PanSubmittedMsgCtrl"
        })
        .state("panAction", {
            cache: false,
            url: "/panAction",
            templateUrl: "PanUpdate/panAction.html",
            controller: "panActionCtrl"
        });
        

    /*console.log(localStorage.getItem("userData"));*/
    var userData = localStorage.getItem("userData");
    if (userData == null) {
        $urlRouterProvider.otherwise("/");
    } else {
        var userData = JSON.parse(localStorage.getItem("userData"));

        if (userData.user_category == "Loyalty User") {
            $urlRouterProvider.otherwise("/mechanicHome");
        } else if (userData.user_category == "Regular User") {
            $urlRouterProvider.otherwise("/NonMlpHome");
        } else if (userData.user_category == "Channel Partner") {
            $urlRouterProvider.otherwise("/CPHome");
        } else if (userData.role_fk_id == "6" || userData.role_fk_id == "27") {
            $urlRouterProvider.otherwise("/home");
        } else if (
            userData.role_fk_id == "12" ||
            userData.role_fk_id == "13" ||
            userData.role_fk_id == "14" ||
            userData.role_fk_id == "28" ||
            userData.role_fk_id == "30" 
        ) {
            $urlRouterProvider.otherwise("/RH_AH_TH_home");
        } else if (userData.role_fk_id == "21") {
            $urlRouterProvider.otherwise("/codeVerification");
        } else if (userData.role_fk_id == 22) {
            localStorage.removeItem("userData");
            $urlRouterProvider.otherwise("/");
        }
    }
});

checkAppVersion = function (LoaderService, LoginService, $ionicPopup) {
    LoaderService.showLoading();
    LoginService.getAppVersion().then(function (result) {
        console.log("getAppVersion", result.Data);
        LoaderService.hideLoading();
        if (window.cordova) {
            cordova.getAppVersion(function (version) {
                console.log("getAppVersion-->" + version + "->");
                
                var appVersion = version;
                console.log("->" + result.Data + "->");

                if(result.Data != appVersion){
                    console.log("alert true----",version);

                    alertPopup = $ionicPopup.alert({
                        template: "Hello, the latest version of app is released. Click OK to update the app"
                    });
                    alertPopup.then(function(){
                        ionic.Platform.exitApp();
                        window.open('https://play.google.com/store/apps/details?id=com.emart.gulf', '_system', 'location=yes');

                    });

                }
            });
        }
    });
};

gulf.run(function (
    $rootScope,
    ConverBase64,
    LoginService,
    LoaderService,
    AppService,
    $cordovaInAppBrowser,
    DashboardService,
    PanUpdateService,
    HeaderService,
    $state,
    $ionicPopup

) {
    checkAppVersion(LoaderService, LoginService, $ionicPopup);

    var userData = localStorage.getItem("userData");
    var userDataJson = JSON.parse(localStorage.getItem("userData"));

    if (userData != null) {
        $rootScope.userData = JSON.parse(userData);
        $rootScope.userID = ConverBase64.convertBase64(
            $rootScope.userData.usr_pk_id
        );
        $rootScope.userRole = $rootScope.userData.role_fk_id;
        var token = JSON.parse(localStorage.getItem("token"));
        $rootScope.token = token;
        $rootScope.viewStatus = true; // add by shikha
        console.log("lunch-token" + $rootScope.token);
        $rootScope.NonMlpUserID = $rootScope.userData.usr_pk_id;

        try {
            LoaderService.showLoading();
            LoginService.userStatus($rootScope.userID).then(function (result) {
                LoaderService.hideLoading();
                console.log("state Data---------------" + result.Data[0].ustatus);
                if (result.Data[0].ustatus == "No") {
                    localStorage.removeItem("userData");
                    $state.go("Login");
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    if (userDataJson != null) {
        if (
            userDataJson.user_category == "Regular User" ||
            userDataJson.user_category == "Channel Partner" ||
            userDataJson.user_category == "Loyalty User"
        ) {
            try {
                DashboardService.usermandatoryDetails($rootScope.userID).then(function (
                    result
                ) {
                    if (result.Status == true) {
                        console.log("Mendatory fields" + result.data);
                        console.log(result.data);
                        if (
                            result.data.usd_longitude == null ||
                            result.data.usd_longitude == "" ||
                            result.data.usd_longitude == undefined ||
                            (result.data.usd_firstname == null ||
                                result.data.usd_firstname == "" ||
                                result.data.usd_firstname == undefined) ||
                            (result.data.usd_pincode == null ||
                                result.data.usd_pincode == "" ||
                                result.data.usd_pincode == undefined) ||
                            (result.data.state_name == null ||
                                result.data.state_name == "" ||
                                result.data.state_name == undefined) ||
                            (result.data.area_name == null ||
                                result.data.area_name == "" ||
                                result.data.area_name == undefined) ||
                            (result.data.usd_latitude == null ||
                                result.data.usd_latitude == "" ||
                                result.data.usd_latitude == undefined) ||
                            (result.data.usd_mobile == null ||
                                result.data.usd_mobile == "" ||
                                result.data.usd_mobile == undefined) ||
                            (result.data.city_name == null ||
                                result.data.city_name == "" ||
                                result.data.city_name == undefined) ||
                            (result.data.usd_address1 == null ||
                                result.data.usd_address1 == "" ||
                                result.data.usd_address1 == undefined)
                        ) {
                            //Do logout
                            localStorage.removeItem("userData");
                            $state.go("NewLoginForMLPAndNonMLP");
                        } else {}
                    }
                });
            } catch (e) {}
        }
    }

    $rootScope.confirmPopup;

    document.addEventListener(
        "resume",
        function () {
            // fcm_notification();
            console.log("page State name=" + $state.current.name);
            if (
                $state.current.name == "NonMlpRegistration" ||
                $state.current.name == "CPRegistration" ||
                $state.current.name == "GkRegistration"
            ) {
                //while resgister no need to launch
            } else {
                if (userDataJson != null) {
                    if (
                        userDataJson.user_category == "Regular User" ||
                        userDataJson.user_category == "Channel Partner" ||
                        userDataJson.user_category == "Loyalty User"
                    ) {
                        try {
                            DashboardService.usermandatoryDetails($rootScope.userID).then(
                                function (result) {
                                    if (result.Status == true) {
                                        console.log("Mendatory fields" + result.data);
                                        console.log(result.data);
                                        if (
                                            result.data.usd_longitude == null ||
                                            result.data.usd_longitude == "" ||
                                            result.data.usd_longitude == undefined ||
                                            (result.data.usd_firstname == null ||
                                                result.data.usd_firstname == "" ||
                                                result.data.usd_firstname == undefined) ||
                                            (result.data.usd_pincode == null ||
                                                result.data.usd_pincode == "" ||
                                                result.data.usd_pincode == undefined) ||
                                            (result.data.state_name == null ||
                                                result.data.state_name == "" ||
                                                result.data.state_name == undefined) ||
                                            (result.data.area_name == null ||
                                                result.data.area_name == "" ||
                                                result.data.area_name == undefined) ||
                                            (result.data.usd_latitude == null ||
                                                result.data.usd_latitude == "" ||
                                                result.data.usd_latitude == undefined) ||
                                            (result.data.usd_mobile == null ||
                                                result.data.usd_mobile == "" ||
                                                result.data.usd_mobile == undefined) ||
                                            (result.data.city_name == null ||
                                                result.data.city_name == "" ||
                                                result.data.city_name == undefined) ||
                                            (result.data.usd_address1 == null ||
                                                result.data.usd_address1 == "" ||
                                                result.data.usd_address1 == undefined)
                                        ) {
                                            //Do logout
                                            localStorage.removeItem("userData");
                                            $state.go("NewLoginForMLPAndNonMLP");
                                        } else {}
                                    }
                                }
                            );
                        } catch (e) {}
                    }
                }
            }
        },
        false
    );

    $rootScope.closePopup = function () {
        $rootScope.confirmPopup.close();
    };

    $rootScope.goToBannerUrl = function () {
        var options = {
            location: "yes"
        };

        document.addEventListener(
            "deviceready",
            function () {
                // fcm_notification();
                $cordovaInAppBrowser
                    .open($rootScope.banner_url, "_blank", options)
                    .then(function (event) {
                        // success
                        console.log('deviceready ------------')
                    })
                    .catch(function (event) {
                        // error
                        console.log('deviceready ------------error')
                    });
            },
            false
        );
    };

    // fcm_notification()

});

function fcm_notification(){
     // Register FCMPlugin.onNotification event listener
  console.log('fcm_notification')   

  try {
    // Testng notification bar
    FCM.onNotification(function(data){
        console.log('Notification received:', data);
    });
  } catch (error) {
    console.log(error)
  }   

}

function fcmplugin_notification(){
    // Register FCMPlugin.onNotification event listener
    console.log('fcmplugin_notification')   
 try {
   FCMPlugin.onNotification(function (data) {
       // Handle notification event
       console.log('Notification received:', data);
       // Process the received notification data as per your app's requirements
     });        
 } catch (error) {
   console.log(error)
 }   

}