gulf.controller("AddRetailerDetailsCtrl", function (
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

  $scope.uploadPhoto = function () {
    var confirmPopup = $ionicPopup.show({
      title: "Click A Picture",

      scope: $scope,
      buttons: [
        {
          text: '<i class="ion-ios-camera-outline thirty-text" ></i>',
          type: "button-positive",
          onTap: function () {
            $scope.takePicture();
          }
        },
        {
          text: "Gallery",
          type: "button-positive",
          onTap: function () {
            $scope.galleryPicture();
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


  //
  $scope.takePicture = function () {
    $ionicPlatform.ready(function () {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality: 25,
        destinationType: Camera.DestinationType.DATA_URL,

      });
    });
  }
  function onSuccess(imageURI) {
    var image = document.getElementById('blah');
    image.src = 'data:image/jpeg;base64,' + imageURI;
    $scope.pathForImage = 'data:image/jpeg;base64,' + imageURI;
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

  //   $scope.takePicture = function() {

  //     $ionicPlatform.ready(function() {
  //       navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
  //         destinationType: Camera.DestinationType.FILE_URI
  //      }); 


  //       // var options = {
  //       //   destinationType: Camera.DestinationType.FILE_URI,
  //       //   sourceType: Camera.PictureSourceType.CAMERA,
  //       //   correctOrientation: true
  //       // };

  //       // $cordovaCamera.getPicture(options).then(
  //       //   function(imageURI) {
  //       //     console.log(imageURI);

  //       //       var image = document.getElementById("blah");
  //       //       image.src = imageURI;
  //       //        $scope.pathForImage = imageURI;
  //       //       console.log("Image Path1 " + $scope.pathForImage);


  //       //     image.className = "img-responsive";
  //       //   },
  //       //   function(err) {
  //       //     console.log("camera error", err);
  //       //   }
  //       // );
  //     });
  //   };
  //   function onSuccess(imageURI) {
  //     var image = document.getElementById('blah');
  //     image.src = imageURI
  // }

  // function onFail(message) {
  //     alert('Failed because: ' + message);
  // }

  // $scope.galleryPicture = function() {

  //   $ionicPlatform.ready(function() {
  //     var options = {
  //       destinationType: Camera.DestinationType.FILE_URI,
  //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //       correctOrientation: true
  //     };

  //     $cordovaCamera.getPicture(options).then(
  //       function(imageURI) {
  //         console.log(imageURI);

  //           var image = document.getElementById("blah");
  //           image.src = imageURI;
  //           $scope.pathForImage = imageURI;

  //         image.className = "img-responsive";
  //       },
  //       function(err) {
  //         // error
  //       }
  //     );

  //     /*$cordovaCamera.cleanup().then();*/
  //   });
  // };

  $scope.galleryPicture = function () {
    $ionicPlatform.ready(function () {
      var options = {
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        correctOrientation: true,
      };

      $cordovaCamera.getPicture(options).then(function (imageURI) {
        console.log(imageURI);
        var image = document.getElementById('blah');
        image.src = 'data:image/jpeg;base64,' + imageURI;
        $scope.pathForImage = 'data:image/jpeg;base64,' + imageURI;
        image.className = "img-responsive";
        //$scope.uploadProfilePhotoToServer();
      }, function (err) {
        // error
      });


      /*$cordovaCamera.cleanup().then();*/
    });
  }

  $scope.submit = function () {
    LoaderService.showLoading();
    if ($scope.pathForImage == "") {
      LoaderService.hideLoading();
      var alertPopup = $ionicPopup.alert({
        title: '<b> Status </b>',
        template: "Please upload  the images"
      });
    }
    else {
      $scope.uploadProfilePhotoToServer($scope.pathForImage);
    }
  }
  $scope.uploadProfilePhotoToServer = function (path) {

    var url = AppService.url + "api_r3/public/profilepicupload";

    // File for Upload
    var targetPath = path;

    // File name only
    var filename = "Testing.jpg";
    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'userId': ConverBase64.convertBase64($rootScope.MechImageId),
        'longitude': "",
        'latitude': "",
        'geoAddress': ""
      }
    };

    //exide below test
    // var url =  "http://stage.firsthive.com/exide/apiservice/api/upload/workshoppic";
    // var filename = "MechanicPrfilePtoto.jpg";
    // var options = {
    //     fileKey: "file",
    //     fileName: filename,
    //     chunkedMode: false,
    //     mimeType: "multipart/form-data",
    //     params: {
    //         'userid': '258'
    //     }
    // };



    $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {
      console.log("Profile" + result);
      console.log(result.response);
      LoaderService.hideLoading();
      //Temp codeing
      if (result.response != "") {
        var myPopup = $ionicPopup.show({
          template: "Updated Successfully",
          scope: $scope,

          buttons: [
            {
              text: '<b>Ok</b>',
              type: 'button-positive',
              onTap: function (e) {

                $state.go("Home");
              }
            }
          ]
        });



      } else {

        var alertPopup = $ionicPopup.alert({
          template: "Try Again"
        });
      }

      // var jsonObject = JSON.parse(result.response);



      // if (jsonObject.Status == true) {
      //     var myPopup = $ionicPopup.show({
      //         template: jsonObject.Message,
      //         scope: $scope,

      //         buttons: [
      //             {
      //                 text: '<b>Ok</b>',
      //                 type: 'button-positive',
      //                 onTap: function (e) {

      //                     $state.go("Home");
      //                 }
      //                         }
      //                     ]
      //     });
      // } else {
      //     var alertPopup = $ionicPopup.alert({
      //         template: jsonObject.Message
      //     });

      // }

      // alert('Success', 'Image upload finished.');
    });
  }
  //below old



});
