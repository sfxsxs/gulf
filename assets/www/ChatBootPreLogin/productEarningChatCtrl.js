gulf.controller('ProductEarningChatCtrl', function ($scope, $state, $rootScope, AppService) {



  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  console.log("ProductEarningDetailChat");
  $scope.productEarningDetail = function (data) {

    $rootScope.ProductEarningDetailChatData = data;

    $state.go('ProductEarningDetailChat');
  }

  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Product Earning Chat Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }
})