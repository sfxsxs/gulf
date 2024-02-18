gulf.controller('CPRecommendationChartCtrl', function ($scope, $state, $rootScope, HeaderService, $ionicPopup, AppService) {

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
    if ($rootScope.userRole == "22") {
      $scope.nonMlp = true;
    } else {
      $scope.nonMlp = false;
    }
  }

  console.log("CPProductEarningCtrl");
  $scope.productEarningDetail = function (data) {
    console.log(data);
    $rootScope.RecommendationSegment = data;
    $state.go('CPRecomendationDetail');
  }

  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Recommendation Chart Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }
})