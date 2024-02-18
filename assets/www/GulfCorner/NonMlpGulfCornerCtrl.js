gulf.controller('NonMlpGulfCornerCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, AppService, $cordovaInAppBrowser, LoaderService, RecommendationService
) {

  $('body').removeClass('home-bg');
  $('body').addClass('body-bg-1');

  $scope.nonMlp;
  $scope.isOtherCustomer;
  var userData = JSON.parse(localStorage.getItem("userData"));
  $scope.data = {}
  $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  if (userData && userData.user_category == "Channel Partner") {
    $scope.isOtherCustomer = true;
  } else {
    $scope.isOtherCustomer = false;
    if (userData.nonmlp == 0) {
      $scope.nonMlp = false;
    } else {
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

  $scope.recomendationchart = function () {
    $state.go('NonMlpRecommendationChart');
  }

  $scope.tradeScheme = function () {
    $state.go('NonMlpTradeScheme');
  }
  $scope.programBrochure = function () {
    $cordovaInAppBrowser.open($scope.Availablebrouchure, '_blank')
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