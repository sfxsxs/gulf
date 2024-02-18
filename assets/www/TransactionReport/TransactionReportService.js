gulf.factory("TransactionService", function ($http, AppService,$rootScope) {
    
    //var token = JSON.parse(localStorage.getItem("token"));
    //var token= $rootScope.token;

    return {

        getTransactionList: function (userId, fromDate, toDate, mechIdOrMob) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/transactionReport?userId=" + userId + 
                "&fromDate=" + fromDate + "&toDate=" + toDate + 
                "&mechIdOrMob=" + mechIdOrMob+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }

            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });

        },

        detailedTransactionReport: function (mechUserId, soUserId, fromDate, toDate) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + "api_r3/public/detailedTransactionReport?mechUserId=" + mechUserId + "&soUserId=" + soUserId + "&fromDate=" + fromDate + "&toDate=" + toDate+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;

            }, function (data) {
                return "";
            });
        },


        pointSummeryGulf: function (UserId,mode) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + 'api_r3/public/pointSummary?userId=' + UserId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            });

        },

        pointSummerySoil: function (UserId,mode) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + 'api_r3/public/pointSummary?userId=' + UserId+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            });

        },

        getProductPackColor: function (segment) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + 'api_r3/public/getProductPackColor?segment=' + segment+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            });

        },

        getBrandName: function (segment) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url: AppService.url + 'api_r3/public/getBrands?segment=' + segment+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            });

        },
        getProductName: function (segmentName,brandName) {
            var token= $rootScope.token;
            return $http({
                method: 'GET',
                url:  AppService.url + "api_r3/public/getProductList?segmentName="+ segmentName+"&brandName="+brandName+"&token="+token,
                timeout: AppService.timeoutValue,
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"
                }
            }).then(function (result) {
                console.log(result);
                return result.data;
            }, function (data) {
                return "";
            });

        }
    }

});