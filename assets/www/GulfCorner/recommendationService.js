gulf.factory("RecommendationService", function ($http, AppService,$rootScope) {
    //var token = JSON.parse(localStorage.getItem("token"));
    //var token= $rootScope.token;
    return {

        getRecommendationsModel: function (make,segment) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getRecommendationsModel?make="+make+
                "&segment="+segment+"&token="+token,
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
        
        getRecommendationsModelForCustomer: function (make,segment) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getRecommendationsModelForCustomer?make="+make+
                "&segment="+segment+"&token="+token,
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
        getCustomerList: function (userId) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getCustomerList?userId="+userId+"&token="+token,
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
        getRecommendationsMake: function (segment) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getRecommendationsMake?segment="+segment+"&token="+token,
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
        getRecommendationList: function (make, model,segment) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/getRecommendationList?make=" + make + 
                "&model=" + model+"&segment="+segment+"&token="+token,
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
        VedioGallery: function (userId) {
            var token= $rootScope.token;
            return $http({

                method: "GET",
                url: AppService.url + "api_r3/public/gulfCorner?userId="+userId+"&token="+token,
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
        gulfCornerProgramBrouchure: function (userId) {
            var token= $rootScope.token;
            return $http({
 
                method: "GET",
                url: AppService.url + "api_r3/public/gulfCornerProgramBrouchure?userId="+userId+"&token="+token,
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