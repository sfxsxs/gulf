gulf.controller("AddValidateDetailsCtrl", function (
  $scope,
  $state,
  $rootScope,
  $ionicPopup,
  $ionicPlatform,
  $cordovaGeolocation,
  $cordovaCamera,
  $cordovaFileTransfer,
  ConverBase64,
  LoaderService,
  AppService,
  HeaderService,
  AddMechanicService,
  UpdateMechanicProfileService,
  NonMlpServices
) {
  //header
  $scope.mech = false;
  $scope.so = false;
  $scope.userName = $rootScope.userData.usd_firstname;
  var role = $rootScope.userData.role_fk_id;
  $scope.disabledvalue = false;
  var userData = JSON.parse(localStorage.getItem("userData"));
  var mode = localStorage.getItem("mode");
  $scope.modeProject = mode;
  console.log($scope.modeProject);

  if (userData && userData.user_category == "Loyalty User") {

  }

  if (userData && userData.user_category == "Loyalty User") {
    $scope.mech = true;
  } else if (role == "6" || role == "27") {
    $scope.so = true;
  }

  $scope.dashboard = function () {
    if (userData && userData.user_category == "Loyalty User") {
      $state.go("MechDashboard");
    } else if (role == "6" || role == "27") {
      $state.go("Dashboard");
    }
  };

  $scope.addMechanic = function () {
    $state.go("AddMechanic");
  };
  $scope.myProfile = function () {
    $state.go("MyProfile");
  };

  $scope.mechProfile = function () {
    $state.go("UpdateMechanicProfile");
  };

  $scope.couponCode = function () {
    $state.go("CouponCode");
  };
  $scope.transactionSummary = function () {
    $state.go("TransactionReport");
  };
  $scope.referAFriend = function () {
    $state.go("AddReferFriend");
  };
  $scope.gulfCorner = function () {
    $state.go("GulfCorner");
  };
  $scope.productEarning = function () {
    $state.go("ProductEarning");
  };
  $scope.orderStatus = function () {
    $state.go("OrderStatus");
  };
  $scope.myorder = function () {
    $state.go("MyOrder");
  };
  $scope.logout = function () {
    HeaderService.logout($rootScope.userID).then(function (result) {
      console.log(result);
      if (result.Status == true) {
        localStorage.removeItem("userData");
        $state.go("Login");
      } else {
        var alertPopup = $ionicPopup.alert({
          template: result.Message
        });
      }
    });
  };

  //header
  $scope.pathForImage = "";
  $scope.pathForImage1 = "";
  console.log($state.params.obj);

  $scope.uploadPhoto = function (value) {
    var confirmPopup = $ionicPopup.show({
      title: "Click A Picture",

      scope: $scope,
      buttons: [
        {
          text: '<i class="ion-ios-camera-outline thirty-text" ></i>',
          type: "button-positive",
          onTap: function () {
            $scope.takePicture(value);
          }
        },
        {
          text: "Gallery",
          type: "button-positive",
          onTap: function () {
            $scope.galleryPicture(value);
          }
        },
        {
          text: "Close",
          type: "button-negative",
          onTap: function () {
            confirmPopup.close();
          }
        }
      ]
    });
  };

  $scope.takePicture = function (value) {
    console.log("takepic" + value);
    $ionicPlatform.ready(function () {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(
        function (imageURI) {
          console.log(imageURI);
          if (value == 'outer') {
            var image = document.getElementById("blah");
            image.src = imageURI;
            $scope.pathForImage = imageURI;
            console.log("Image Path1 " + $scope.pathForImage);
          } else {
            var image = document.getElementById("blah1");
            image.src = imageURI;
            $scope.pathForImage1 = imageURI;
            console.log("Image Path1 " + $scope.pathForImage1);

          }

          image.className = "img-responsive";
        },
        function (err) {
          console.log("camera error", err);
        }
      );
    });
  };

  $scope.galleryPicture = function (value) {
    console.log("galleryPicture" + value);
    $ionicPlatform.ready(function () {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true
      };

      $cordovaCamera.getPicture(options).then(
        function (imageURI) {
          console.log(imageURI);
          if (value == 'outer') {
            var image = document.getElementById("blah");
            image.src = imageURI;
            $scope.pathForImage = imageURI;
          } else {
            var image = document.getElementById("blah1");
            image.src = imageURI;
            $scope.pathForImage1 = imageURI;
          }

          image.className = "img-responsive";
        },
        function (err) {
          // error
        }
      );

      /*$cordovaCamera.cleanup().then();*/
    });
  };

  $scope.submit = function () {
    LoaderService.showLoading();
    if ($scope.pathForImage != "" && $scope.pathForImage1 == "") {
      LoaderService.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: '<b> Status </b>',
        template: "Please upload both the images"
      });
      // $scope.uploadImageToServer($scope.pathForImage,'Fullview Outer');

    } else if ($scope.pathForImage == "" && $scope.pathForImage1 != "") {
      LoaderService.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: '<b> Status </b>',
        template: "Please upload both the images"
      });
      // $scope.uploadImageToServer($scope.pathForImage1,'Fullview Interior');
    } else if ($scope.pathForImage != "" && $scope.pathForImage1 != "") {
      $scope.uploadImageToServer($scope.pathForImage, 'Fullview Outer');
      // $scope.uploadImageToServer($scope.pathForImage1,'Fullview Interior');
    } else if ($scope.pathForImage == "" && $scope.pathForImage1 == "") {
      LoaderService.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: '<b> Status </b>',
        template: "Please upload both the images"
      });

    }

  }

  $scope.uploadImageToServer = function (targetPath, DocType) {
    var targetPath = targetPath;
    $scope.GOILRetID = $rootScope.GOILRetID;
    $scope.UserCode = $rootScope.UserCode;
    $scope.CustomerType = $rootScope.CustomerType;
    $scope.DocType = DocType;
    console.log($scope.CustomerType);
    console.log($scope.UserCode);
    // $scope.GOILRetID=78; //Testing
    // $scope.UserCode="DSSS681252";
    // $scope.CustomerType="OTHER IWS";


    //dummy code
    var fileURL = targetPath;
    var win = function (r) {
      LoaderService.hideLoading();
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      var parseData = JSON.parse(r.response);
      // var alertPopup = $ionicPopup.alert({
      //       title: '<b> Status </b>',
      //       template: parseData.Message
      //   });

      if (parseData.Status == 1 || parseData.Status == "1") {

        // $state.go("Home");
        $scope.uploadImageToServer1($scope.pathForImage1, 'Fullview Interior');

        console.log("imageUpload_Status is 1");

      }

    }

    var fail = function (error) {

      LoaderService.hideLoading();
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var fName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    if (fName.includes("?")) {
      fName = fName.substr(0, fName.indexOf("?"));
    }
    if (!fName.includes(".")) {
      fName = fName + ".png";
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fName;
    options.mimeType = "text/plain";
    var headers = { 'Authorization': 'Basic R0tfVjIuMDpJbnRlbGxlY3QkMTAwNjIwMTk=' };

    options.headers = headers;

    var params = {};
    params.Model = { "GOILRetID": $scope.GOILRetID, "DocType": $scope.DocType, "UserCode": $scope.UserCode, "CustomerType": $scope.CustomerType };
    //params.Model = {"GOILRetID":78, "DocType":"Fullview Outer", "UserCode":"DSSS681252", "CustomerType":"OTHER IWS"}
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(AppService.thirdparty_ImageUpload), win, fail, options);


    //dummy code
  };



  $scope.uploadImageToServer1 = function (targetPath, DocType) {
    var targetPath = targetPath;
    $scope.GOILRetID = $rootScope.GOILRetID;
    $scope.UserCode = $rootScope.UserCode;
    $scope.CustomerType = $rootScope.CustomerType;
    $scope.DocType = DocType;
    console.log($scope.CustomerType);
    console.log($scope.UserCode);
    // $scope.GOILRetID=78; //Testing
    // $scope.UserCode="DSSS681252";
    // $scope.CustomerType="OTHER IWS";


    //dummy code
    var fileURL = targetPath;
    var win = function (r) {
      LoaderService.hideLoading();
      console.log("Code = " + r.responseCode);
      console.log("Response = " + r.response);
      console.log("Sent = " + r.bytesSent);
      var parseData = JSON.parse(r.response);
      var alertPopup = $ionicPopup.alert({
        title: '<b> Status </b>',
        template: parseData.Message
      });

      if (parseData.Status == 1 || parseData.Status == "1") {

        $state.go("Home");
        console.log("imageUpload_Status is 1");

      }

    }

    var fail = function (error) {

      LoaderService.hideLoading();
      alert("An error has occurred: Code = " + error.code);
      console.log("upload error source " + error.source);
      console.log("upload error target " + error.target);
    }

    var fName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    if (fName.includes("?")) {
      fName = fName.substr(0, fName.indexOf("?"));
    }
    if (!fName.includes(".")) {
      fName = fName + ".png";
    }

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fName;
    options.mimeType = "text/plain";
    var headers = { 'Authorization': 'Basic R0tfVjIuMDpJbnRlbGxlY3QkMTAwNjIwMTk=' };

    options.headers = headers;

    var params = {};
    params.Model = { "GOILRetID": $scope.GOILRetID, "DocType": $scope.DocType, "UserCode": $scope.UserCode, "CustomerType": $scope.CustomerType };
    //params.Model = {"GOILRetID":78, "DocType":"Fullview Outer", "UserCode":"DSSS681252", "CustomerType":"OTHER IWS"}
    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI(AppService.thirdparty_ImageUpload), win, fail, options);


    //dummy code
  };


});
