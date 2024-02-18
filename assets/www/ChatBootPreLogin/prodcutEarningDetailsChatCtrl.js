gulf.controller('ProductEarningDetailChatCtrl', function ($scope, AppService, $state, $rootScope, $ionicPopup, TransactionService) {

    $('body').removeClass('home-bg');
    $('body').addClass('body-bg-1');
    $scope.data = {}
    $scope.data.localAppLanguage = JSON.parse(localStorage.getItem("gulfUserAppLanguage"));
    var mode = localStorage.getItem("mode");
    $scope.modeProject = mode;
    console.log($scope.modeProject);

    if ($rootScope.ProductEarningDetailChatData == "DEO") {
        $scope.prdocutDetailHeaderChat = "Two Wheeler Engine Oil";
    }
    if ($rootScope.ProductEarningDetailChatData == "MCO") {
        $scope.prdocutDetailHeaderChat = "Passengers Car Motor Oil";
    }
    if ($rootScope.ProductEarningDetailChatData == "PCMO") {
        $scope.prdocutDetailHeaderChat = "Commercial Vehicle Oil";
    }

    $(document).ready(function (e) {
        $('#selectBrandChat').select2({
            dropdownParent: $('#selectBrandChatParent')
        });
        $('#colorChat').select2({
            dropdownParent: $('#colorChatParent')
        });
    });
    /*    $('#productEarning').DataTable({
                "processing": true,
                "destroy": true,
                "searching": false,
                "bLengthChange": false,
                "serverSide": false,
                "pageLength": 10,
             "paging":   false,
                "ordering": false,
                "info":     false,
                //"data":result.data,
                "ajax": {
                    url: AppService.url + "api_r3/public/getProductList?segmentName="+$rootScope.ProductEarningDetailChatData,
                    "type": "GET",
                    dataType: "json",
                    contentType: "application/json"
    
                },
                "columns": [
                    {  "data": "pdct_sku",
                            "mRender": function (data, type, full) {
                                //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                               return '<img class="img-responsive" src="img/power-trac.png" alt="Gulf">';
                            }
                    },
                    {
                        "data": "pdct_sku"
                    },
                    {
                        "data": "pdct_mlp_points"
                    }
    
            ]
    
            });*/

    TransactionService.getProductPackColor($rootScope.ProductEarningDetailChatData).then(function (result) {
        console.log(result.Status);
        if (result.Status) {
            //console.log(result.data[0]);
            $scope.AvailabelColor = result.data;
        } else {
        }


    });

    TransactionService.getBrandName($rootScope.ProductEarningDetailChatData).then(function (result) {
        console.log(result.Status);
        if (result.Status) {
            //console.log(result.data[0]);
            $scope.AvailabelBrand = result.Data;
        } else {
        }


    });
    var token = $rootScope.token;

    $('#productEarning').DataTable({
        "processing": true,
        "destroy": true,
        "searching": false,
        "bLengthChange": false,
        "serverSide": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "paging": false,
        "ordering": false,
        "info": false,
        "language": {
            "emptyTable": $scope.data.localAppLanguage.no_result_found
        },
        "ajax": {
            url: AppService.url + "api_r3/public/getProductList?segmentName=" + $rootScope.ProductEarningDetailChatData + "&token=" + token,
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
            {
                "data": "imagePath",
                "mRender": function (data, type, full) {
                    //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                    return '<img class="img-responsive" src="' + AppService.url + data + '" alt="Gulf">';
                }
            },
            {
                "data": "pdct_name"
            },
            {
                "data": "pdct_sku"
            },
            {
                "data": "pdct_mlp_points"
            }

        ]

    });

    $scope.getProductEarningDetails = function () {
        // alert($scope.selectedColor);
        var token = $rootScope.token;
        $('#productEarning').DataTable({
            "processing": true,
            "destroy": true,
            "searching": false,
            "bLengthChange": false,
            "serverSide": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "paging": false,
            "ordering": false,
            "info": false,
            //"data":result.data,
            "ajax": {
                url: AppService.url + "api_r3/public/getProductList?segmentName=" + $rootScope.ProductEarningDetailChatData + "&color=" + $scope.selectedColor + "&brandName=" + $scope.selectedBrand + "&token=" + token,
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
                {
                    "data": "imagePath",
                    "mRender": function (data, type, full) {
                        //return '<a href=#/mechValidation/' + data + '><input type="checkbox"/></a>'
                        return '<img class="img-responsive" src="' + AppService.url + data + '" alt="Gulf">';
                    }
                },
                {
                    "data": "pdct_name"
                },
                {
                    "data": "pdct_sku"
                },
                {
                    "data": "pdct_mlp_points"
                }

            ]

        });
    }

    try {
        if (AppService.enableTracking) {
            _paq.push(['setDocumentTitle', "Product Earning Details Chat Page"]);
            _paq.push(['trackPageView']);
        }
    } catch (err) {
        console.log(err);
    }
})