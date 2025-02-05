gulf.controller("NotificationCtrl", function ($scope, $state, $rootScope, ConverBase64, DashboardService, LoaderService, AppService, TransactionService, HeaderService, $ionicPopup, $rootScope) {
  var role = $rootScope.userData.role_fk_id;
  /* alert(role)*/

  $scope.nonMlp;
  $scope.isOtherCustomer;
  var userData = JSON.parse(localStorage.getItem("userData"));
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);
  
  $scope.data = {}
  $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
  if (userData && userData.user_category == "Channel Partner") {
    $scope.isOtherCustomer = true;
  } else {
    $scope.isOtherCustomer = false;
    if (userData && userData.user_category == "Loyalty User") {
      $scope.nonMlp = false;
    } else {
      $scope.nonMlp = true;
    }
  }

  $scope.AppurlForimage = AppService.url;
  DashboardService.notificationReport($rootScope.userID, role).then(function (result) {
    if (result.Status) {

      $scope.notificationList = result.Data;
      console.log(result.Data);
    } else {

    }


  });


  DashboardService.updateNotification($rootScope.userID).then(function (result) {

  });

  try {
    if (AppService.enableTracking) {
      _paq.push(['setDocumentTitle', "Notification Page"]);
      _paq.push(['trackPageView']);
    }
  } catch (err) {
    console.log(err);
  }




  $scope.URLify = function (string, id) {
    try {

      const urls = string.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)/g);
      if (urls) {
        urls.forEach(function (url) {
          string = string.replace(url, '<u><a target="_blank" href="' + url + '">' + url + "</a></u>");
        });
      }
      console.log("string", string);
      var a = string.replace("(", "<br/>(");
      console.log("a", a);

      const div = document.querySelector("#" + id);

      div.innerHTML = a;

    } catch (ex) { }
  }

});