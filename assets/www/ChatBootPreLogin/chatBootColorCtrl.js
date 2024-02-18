
gulf.controller('ChatBootColorCtrl', function ($scope, $rootScope, ChatBootPreLoginService, AppService, $ionicPopup) {

    console.log("rootScope" + $rootScope.globalSagment);
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    $scope.segmentValue = $rootScope.globalSagment;
    ChatBootPreLoginService.getMCOColor($scope.segmentValue).then(function (result) {
        console.log('Inside chat ctrl');
        //console.log(result);
        $scope.segmentblock = false;
        $scope.colorblock = true;
        $scope.colorArray = result.Data;
        console.log("from color ctrl");
        console.log($scope.colorArray);
    });

    $scope.getSegmentAndColor = function (color) {
        alert("clicked");
        alert(color);
        var token = $rootScope.token;
        $('#productSegment').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "pageLength": 10,
            //"data":result.data,
            "ajax": {
                //url:AppService.url+"api_r3/public/getProductList?segmentName="+$rootScope.globalSagment+"&color=Silver",
                url: AppService.url + "api_r3/public/getProductList?segmentName=" + $rootScope.globalSagment + "&color=" + color + "&token=" + token,
                "type": "GET",
                dataType: "json",
                contentType: "application/json",
                error: function (jqXHR, textStatus, errorThrown) {
                    var alertPopup = $ionicPopup.alert({
                        template: "Server not responding ,Please try after some time"
                    });
                }

            },
            "columns": [
                { "data": "pdct_name" },
                { "data": "pdct_sku" },
                { "data": "pdct_sku" }

            ]

        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Chat Boot Color Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }

})