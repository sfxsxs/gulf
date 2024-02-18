gulf.controller('GulfCornerCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, AppService, $cordovaInAppBrowser, LoaderService, RecommendationService
) {

  $('body').removeClass('home-bg');
  $('body').addClass('body-bg-1');

  $scope.nonMlp = false;
  $scope.nonMlp = false;
  $scope.isOtherCustomer;
  var userData = JSON.parse(localStorage.getItem("userData"));
  $scope.data = {}
  $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  var role = $rootScope.userData.role_fk_id;
  if (userData && userData.user_category == "Channel Partner") {
    $scope.isOtherCustomer = true;
  } else {
    $scope.isOtherCustomer = false;
    if (userData && userData.user_category == "Loyalty User" || role == '6' || role == "27") {
      $scope.nonMlp = false;
    } else if (userData && userData.user_category == "Regular User") {
      $scope.nonMlp = true;
    }
  }
  LoaderService.showLoading();
  RecommendationService.gulfCornerProgramBrouchure($rootScope.userID).then(function (result) {
    LoaderService.hideLoading();
    console.log("state Data" + result);
    if (result.Status == true) {
      $scope.Availablebrouchure = AppService.url + result.data[0].brouchure_file;
      console.log(AppService.url + $scope.Availablebrouchure);
    }
  });
  console.log("GulfCornerCtrl");
  $scope.recomendationchart = function () {

    $state.go('RecommendationChart');
    //$state.go('RecomendationDetail');
  }

  $scope.tradeScheme = function () {
    $state.go('TradeScheme');
  }
  $scope.programBrochure = function () {
    $cordovaInAppBrowser.open($scope.Availablebrouchure, '_system')
      .then(function (event) {
        // success
      })
      .catch(function (event) {
        // error
      });
  }

  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Gulf Corner Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }
})